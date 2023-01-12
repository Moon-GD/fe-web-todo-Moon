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
    let queryListIndex = 0;
    let startNodeList = [];
    let endNodeList = [startDom];

    while(queryListIndex < multipleQueryList.length) {
        startNodeList = endNodeList;
        endNodeList = [];

        startNodeList.forEach((node) => {
            let all = singleQuerySelectorAll(multipleQueryList[queryListIndex], node);
            endNodeList = endNodeList.concat(all);
        })

        queryListIndex += 1;
    }

    return endNodeList[0];
}

// 복합 쿼리에 해당하는 모든 노드를 리스트 형태로 반환합니다.
function multipleQuerySelectorAll(multipleQuery, startDom=BODY_DOM) {
    let multipleQueryList = multipleQueryToList(multipleQuery);  // query문 파싱
    let queryListIndex = 0;  // query 선택을 위한 인덱스
    let startNodeList = [];  // 탐색 시작 지점
    let endNodeList = [startDom];  // 탐색 결과를 저장할 리스트

    while(queryListIndex < multipleQueryList.length) {
        // 탐색 시작 지점과 결과 리스트 초기화
        startNodeList = endNodeList;
        endNodeList = [];

        // 탐색 시작 지점을 순회하며 query에 해당하는 모든 노드를 endNodeList에 저장
        startNodeList.forEach((node) => {
            let all = singleQuerySelectorAll(multipleQueryList[queryListIndex], node);
            endNodeList = endNodeList.concat(all);
        })

        // query 선택 인덱스 1 증가
        queryListIndex += 1;
    }

    // 최종 결과 반환
    return endNodeList;
}

setTimeout(() => {
    multipleQuerySelector("aside section")
})