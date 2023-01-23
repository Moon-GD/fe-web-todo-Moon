import { pipe } from "../common/commonFunction.js";
import { Queue } from "./queue.js";

const $BODY_NODE = document.body;
const TAG = "tagName";
const CLASS = "className";
const ID = "id";

const queryClassifyMap = (query) => {
    if(query[0] == ".") return [CLASS, query.slice(1, )];
    else if(query[0] == "#") return [ID, query.slice(1, )];
    else return [TAG, query.toUpperCase()];
}

/**
 * 단일 query를 명령어 객체로 반환합니다.
 * @param {String} query 노드 탐색 query
 * @returns {Object} 명령어 객체
 */
function singleQueryToObject(query) {
    let queryObj = {
        [TAG]: [],
        [CLASS]: [],
        [ID]: [],
    };

    query = pipe(
        () => query.replace(/\./g, " ."),
        (query) => query.replace(/#/g, " #"),
        (query) => query.split(" ").sort((a, b) => a - b)
    )()

    for(let i=0;i<query.length;i++) {
        if(query[i] === "") continue; // split 하면서 생긴 빈 문자열은 무시합니다.
        const [index, parsedQuery] = queryClassifyMap(query[i]);
        queryObj[index].push(parsedQuery);
    }

    return queryObj;
}

/**
 * 복합 query를 단일 쿼리 배열로 반환합니다.
 * @param {String} multipleQuery 복합 query
 * @returns {Array} 단일 쿼리 배열
 */
const multipleQueryToList = (multipleQuery) => pipe(
    () => multipleQuery.replace(/>/g, " > "),
    (multipleQuery) => multipleQuery.split(" ").filter((ele) => ele)
)()

/**
 * 노드의 query 해당 여부를 반환합니다.
 * @param {Node} node 기준 노드
 * @param {Object} queryObj 비교할 명령어 객체
 * @returns {Boolean} true / false
 */
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

/**
 * 기준 노드의 자식 중 query에 해당하는 노드를 모두 반환합니다.
 * @param {String} query 노드 탐색 query
 * @param {Node} $startNode 탐색 시작 노드
 * @returns {Array} 노드 객체 배열
 */
const findAllChildren = (query, $startNode=$BODY_NODE) => pipe(
    () => [singleQueryToObject(query), $startNode.children],
    ([queryObj, $childArray]) => $childArray.filter(($child) => valiedateNodeByQuery($child, queryObj))
)()

/**
 * 단일 쿼리에 해당하는 첫 노드를 반환합니다.
 * @param {String} query 노드 탐색 query
 * @param {Node} $startNode 탐색 시작 노드
 * @returns {Node} 노드 객체
 */
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

/**
 * 단일 쿼리에 해당하는 모든 노드를 배열 형태로 반환합니다.
 * @param {String} query 노드 탐색 query
 * @param {Node} $startNode 탐색 시작 노드
 * @returns 
 */
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

/**
 * 복합 쿼리에 해당하는 첫 노드를 반환합니다
 * @param {Object} multipleQuery 복합 명령어 객체
 * @param {Node} $startNode 탐색 시작 노드
 * @returns 
 */
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

/**
 * 복합 쿼리에 해당하는 모든 노드를 배열 형태로 반환합니다.
 * @param {Object} multipleQuery 복합 명령어 객체
 * @param {Node} $startNode 탐색 시작 노드
 * @returns 
 */
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