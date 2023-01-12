import { Queue } from "./queue.js";

// HTML collection은 forEach가 안되기 때문에 배열 forEach 순회 등록
HTMLCollection.prototype.forEach = Array.prototype.forEach

const TAG = "tagName";
const CLASS = "className";
const ID = "id";

const ROOT_DOM = document.documentElement;
const BODY_DOM = ROOT_DOM.children[1];

// 단일 query를 객체로 반환합니다.
function singleQueryToObject(query) {
    let objectQuery = {
        [TAG]: [],
        [CLASS]: [],
        [ID]: [],
    };

    query = query.replace(/\./g, " .")
    query = query.replace(/#/g, " #")
    
    query = query.split(" ").sort((a, b) => { return a - b });

    for(let i=0;i<query.length;i++) {
        if(query[i] == "") {
            continue;
        }
        else if(query[i][0] == ".") {
            objectQuery[CLASS].push(query[i].slice(1, ));
        }
        else if(query[i][0] == "#") {
            objectQuery[ID].push(query[i].slice(1, ));
        }
        else {
            objectQuery[TAG].push(query[i].toUpperCase());
        }
    }

    return objectQuery;
}

// 복합 query를 리스트로 반환합니다.
function multipleQueryToList(multipleQuery) {
    multipleQuery = multipleQuery.replace(/>/g, " > ");
    
    let listToBeReturned = multipleQuery.split(" ").filter((ele) => ele);

    return listToBeReturned;
}

// 복합 query를 객체로 반환합니다.
function multipleQueryToObject(multipleQuery) {
    // main section : 하위 요소
    // main>section : 자식 요소
    // main > section : 자식 요소

    let objectQuery = []

    multipleQuery = multipleQuery.split(" ")

    for(let i=0;i<multipleQuery.length;i++) {
        if(multipleQuery[i] == ">") {
            objectQuery.push(">");
        }
        else {
            objectQuery.push(singleQueryToObject(multipleQuery[i]))
        }
    }

    return objectQuery;
}

// query에 해당하는 노드인지를 boolean으로 반환합니다.
function valiedateNodeByQuery(node, queryObj) {
    const tags = queryObj[TAG];
    const classes = queryObj[CLASS];
    const ids = queryObj[ID];
    
    
    for(let i=0;i<tags.length;i++) {
        if(node.tagName != tags[i]) { return false; }
    }
    
    
    for(let i=0;i<classes.length;i++) {
        if(classes[i] in node.classList) { return false; }
    }

    for(let i=0;i<ids.length;i++) {
        if(node.id != ids[i]) { return false; }
    }

    return true;
}

// 단일 쿼리에 해당하는 모든 노드를 리스트 형태로 반환합니다.
function singleQuerySelectorAll(query, startDom=BODY_DOM) {
    let listToBeReturned = []
    let queue = new Queue();
    queue.enque(startDom);

    let queryObj = singleQueryToObject(query);

    // BFS 방식으로 순회
    while(queue.getLength()) {
        let currentDom = queue.deque();
        // return : 원하는 ID를 찾은 경우
        if(valiedateNodeByQuery(currentDom, queryObj)) { listToBeReturned.push(currentDom); }
        currentDom.children.forEach((child) => { queue.enque(child); })
    }

    return listToBeReturned;
}

// 단일 쿼리에 해당하는 첫 노드를 돔 형태로 반환합니다.
function singleQuerySelector(query, startDom=BODY_DOM) {
    let queue = new Queue();
    queue.enque(startDom);

    let queryObj = singleQueryToObject(query);

    // BFS 방식으로 순회
    while(queue.getLength()) {
        let currentDom = queue.deque();
        // return : 원하는 ID를 찾은 경우
        if(valiedateNodeByQuery(currentDom, queryObj)) { return currentDom; }
        currentDom.children.forEach((child) => { queue.enque(child); })
    }

    return null;
}

// 복합 쿼리에 해당하는 첫 노드를 돔 형태로 반환합니다.
function multipleQuerySelector(multipleQuery, startDom=BODY_DOM) {
    let multipleQueryList = multipleQueryToList(multipleQuery);

    console.log(multipleQueryList)
}

setTimeout(() => {
    multipleQuerySelector("aside section")
})