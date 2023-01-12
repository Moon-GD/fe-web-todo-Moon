import { Queue } from "./queue.js";

// HTML collection은 forEach가 안되기 때문에 배열 forEach 순회 등록
HTMLCollection.prototype.forEach = Array.prototype.forEach

const TAG = "tagName";
const CLASS = "className";
const ID = "id";

const ROOT_DOM = document.documentElement;
const BODY_DOM = ROOT_DOM.children[1];

// 단일 query를 명령어 객체로 반환합니다.
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

// 복합 query를 단일 쿼리의 리스트로 반환합니다.
function multipleQueryToList(multipleQuery) {
    multipleQuery = multipleQuery.replace(/>/g, " > ");
    
    let listToBeReturned = multipleQuery.split(" ").filter((ele) => ele);

    return listToBeReturned;
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

// 시작 지점에서 query에 해당하는 모든 자식 노드를 리스트 형태로 반환합니다.
function findAllChildren(query, startDom=BODY_DOM) {
    let queryObj = singleQueryToObject(query);
    let children = startDom.children;
    let listToBeReturned = [];

    children.forEach((child) => {
        if(valiedateNodeByQuery(child, queryObj)) { listToBeReturned.push(child); }
    })

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

// 복합 쿼리에 해당하는 첫 노드를 돔 형태로 반환합니다.
function multipleQuerySelector(multipleQuery, startDom=BODY_DOM) {
    let multipleQueryList = multipleQueryToList(multipleQuery);
    let queryListIndex = 0;
    let startNodeList = [];
    let endNodeList = [startDom];

    while(queryListIndex < multipleQueryList.length) {
        startNodeList = endNodeList;
        endNodeList = [];

        if(multipleQueryList[queryListIndex] == ">") {
            queryListIndex += 1;

            startNodeList.forEach((node) => {
                let all = findAllChildren(multipleQueryList[queryListIndex], node);
                endNodeList = endNodeList.concat(all);
            })
        }
        else {
            startNodeList.forEach((node) => {
                let all = singleQuerySelectorAll(multipleQueryList[queryListIndex], node);
                endNodeList = endNodeList.concat(all).filter((ele) => ele != node)
            })
        }

        queryListIndex += 1;
    }

    // 중복 제거
    endNodeList = Array.from(new Set(endNodeList));

    return endNodeList[0];
}

// 복합 쿼리에 해당하는 모든 노드를 리스트 형태로 반환합니다.
function multipleQuerySelectorAll(multipleQuery, startDom=BODY_DOM) {
    let multipleQueryList = multipleQueryToList(multipleQuery);
    let queryListIndex = 0;
    let startNodeList = [];
    let endNodeList = [startDom];

    while(queryListIndex < multipleQueryList.length) {
        startNodeList = endNodeList;
        endNodeList = [];

        if(multipleQueryList[queryListIndex] == ">") {
            queryListIndex += 1;

            startNodeList.forEach((node) => {
                let all = findAllChildren(multipleQueryList[queryListIndex], node);
                endNodeList = endNodeList.concat(all);
            })
        }
        else {
            startNodeList.forEach((node) => {
                let all = singleQuerySelectorAll(multipleQueryList[queryListIndex], node);
                endNodeList = endNodeList.concat(all).filter((ele) => ele != node)
            })
        }

        queryListIndex += 1;
    }

    // 중복 제거
    endNodeList = Array.from(new Set(endNodeList));

    return endNodeList;
}

// 원하는 노드를 찾아줍니다.
function querySelector(query) {
    let queryList = multipleQueryToList(query);
    let nodeToBeReturned = '';

    queryList.length == 1 ?
            nodeToBeReturned = singleQuerySelector(query):
            nodeToBeReturned = multipleQuerySelector(query);

    return nodeToBeReturned;
}