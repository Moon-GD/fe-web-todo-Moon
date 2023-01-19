import { pipe } from "../common/commonFunction.js";
import { Queue } from "./queue.js";

const TAG = "tagName";
const CLASS = "className";
const ID = "id";

const $BODY_NODE = document.body;

/** 단일 query를 명령어 객체로 반환합니다. */
function singleQueryToObject(query) {
    let queryObj = {
        [TAG]: [],
        [CLASS]: [],
        [ID]: [],
    };

    query = query.replace(/\./g, " .")
    query = query.replace(/#/g, " #")
    query = query.split(" ").sort((a, b) => { return a - b });

    for(let i=0;i<query.length;i++) {
        if(query[i] == "") { continue; } // 사용자가 임의로 넣은 공백은 무시합니다.
        else if(query[i][0] == ".") { queryObj[CLASS].push(query[i].slice(1, )); }
        else if(query[i][0] == "#") { queryObj[ID].push(query[i].slice(1, )); }
        else { queryObj[TAG].push(query[i].toUpperCase()); }
    }

    return queryObj;
}

/** 복합 query를 단일 쿼리의 리스트로 반환합니다. */
function multipleQueryToList(multipleQuery) {
    return pipe(
            (multipleQuery) => multipleQuery.replace(/>/g, " > "),
            (multipleQuery) => multipleQuery.split(" ").filter((ele) => ele)
        )(multipleQuery)
}

/** query에 해당 노드 여부를 boolean으로 반환합니다. */
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

/** $startNode에서 query에 해당하는 모든 자식 노드를 리스트 형태로 반환합니다. */
function findAllChildren(query, $startNode=$BODY_NODE) {
    const queryObj = singleQueryToObject(query);

    return pipe(
        ($targetNode) => $targetNode.children,
        ($childList) => $childList.filter(($child) => valiedateNodeByQuery($child, queryObj))
    )($startNode)
}

/** 단일 쿼리에 해당하는 첫 노드를 돔 형태로 반환합니다. */
function singleQuerySelector(query, $startNode=$BODY_NODE) {
    const queryObj = singleQueryToObject(query);
    const queue = new Queue();
    queue.enque($startNode);

    // BFS 순회
    while(queue.getLength()) {
        const $currentDom = queue.deque();
        
        // return : 원하는 ID를 찾은 경우
        if(valiedateNodeByQuery($currentDom, queryObj)) { return $currentDom; }
        $currentDom.children.forEach(($childNode) => { queue.enque($childNode); })
    }

    return null;
}

/** 단일 쿼리에 해당하는 모든 노드를 리스트 형태로 반환합니다. */
function singleQuerySelectorAll(query, $startNode=$BODY_NODE) {
    let listToBeReturned = [];
    const queryObj = singleQueryToObject(query);
    const queue = new Queue();
    queue.enque($startNode);

    // BFS 순회
    while(queue.getLength()) {
        const $currentDom = queue.deque();

        // return : 원하는 ID를 찾은 경우
        if(valiedateNodeByQuery($currentDom, queryObj)) { listToBeReturned.push($currentDom); }
        $currentDom.children.forEach(($childNode) => { queue.enque($childNode); })
    }

    return listToBeReturned;
}

/** 복합 쿼리에 해당하는 첫 노드를 돔 형태로 반환합니다. */
function multipleQuerySelector(multipleQuery, $startNode=$BODY_NODE) {
    const multipleQueryList = multipleQueryToList(multipleQuery);
    let queryListIndex = 0;
    let $startNodeList = [];
    let $endNodeList = [$startNode];

    while(queryListIndex < multipleQueryList.length) {
        $startNodeList = $endNodeList;
        $endNodeList = [];

        if(multipleQueryList[queryListIndex] == ">") {
            queryListIndex += 1;

            $startNodeList.forEach(($node) => {
                let $childNodeList = findAllChildren(multipleQueryList[queryListIndex], $node);
                $endNodeList = $endNodeList.concat($childNodeList);
            })
        }
        else {
            $startNodeList.forEach(($node) => {
                let $validateNodeList = singleQuerySelectorAll(multipleQueryList[queryListIndex], $node);
                $endNodeList = $endNodeList.concat($validateNodeList).filter((ele) => ele != $node);
            })
        }

        queryListIndex += 1;
    }

    // 중복 제거
    $endNodeList = Array.from(new Set($endNodeList));

    return $endNodeList[0];
}

/** 복합 쿼리에 해당하는 모든 노드를 리스트 형태로 반환합니다. */
function multipleQuerySelectorAll(multipleQuery, $startNode=$BODY_NODE) {
    const multipleQueryList = multipleQueryToList(multipleQuery);
    let queryListIndex = 0;
    let $startNodeList = [];
    let $endNodeList = [$startNode];

    while(queryListIndex < multipleQueryList.length) {
        $startNodeList = $endNodeList;
        $endNodeList = [];

        if(multipleQueryList[queryListIndex] == ">") {
            queryListIndex += 1;

            $startNodeList.forEach(($node) => {
                let $childList = findAllChildren(multipleQueryList[queryListIndex], $node);
                $endNodeList = $endNodeList.concat($childList);
            })
        }
        else {
            $startNodeList.forEach(($node) => {
                let validateNodeList = singleQuerySelectorAll(multipleQueryList[queryListIndex], $node);
                $endNodeList = $endNodeList.concat(validateNodeList).filter((ele) => ele != $node);
            })
        }

        queryListIndex += 1;
    }

    $endNodeList = Array.from(new Set($endNodeList)); // 중복 제거

    return $endNodeList;
}

export {
    singleQuerySelector, singleQuerySelectorAll, 
    multipleQueryToList, multipleQuerySelector, multipleQuerySelectorAll
}