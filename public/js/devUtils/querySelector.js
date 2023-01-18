import {
    singleQuerySelector, singleQuerySelectorAll, 
    multipleQueryToList, multipleQuerySelector, multipleQuerySelectorAll
} from "./querySelectorHelper.js"

// HTML collection은 forEach가 안되기 때문에 배열 forEach, filter 등록
HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.filter = Array.prototype.filter;

/** 원하는 노드를 찾아 노드 형태로 반환합니다. */
function querySelector(query) {
    let queryList = multipleQueryToList(query);
    let nodeToBeReturned = '';

    queryList.length == 1 ?
            nodeToBeReturned = singleQuerySelector(query):
            nodeToBeReturned = multipleQuerySelector(query);

    return nodeToBeReturned;
}

/** 원하는 노드를 찾아 배열 형태로 반환합니다. */
function querySelectorAll(query) {
    let queryList = multipleQueryToList(query);
    let listToBeReturned = [];

    queryList.length == 1 ?
            listToBeReturned = singleQuerySelectorAll(query):
            listToBeReturned = multipleQuerySelectorAll(query);

    return listToBeReturned;
}

export {
    querySelector, querySelectorAll
}