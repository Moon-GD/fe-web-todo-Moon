import { pipe } from "../common/commonFunction.js";
import {
    singleQuerySelector, singleQuerySelectorAll, 
    multipleQueryToList, multipleQuerySelector, multipleQuerySelectorAll
} from "./querySelectorHelper.js"

HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.filter = Array.prototype.filter;

/** 원하는 노드를 찾아 노드 형태로 반환합니다. */
function querySelector(query) {
    return pipe(
        (inputQuery) => multipleQueryToList(inputQuery),
        (queryList) => queryList.length == 1 ? singleQuerySelector(query) : multipleQuerySelector(query)       
    )(query)
}

/** 원하는 노드를 찾아 배열 형태로 반환합니다. */
function querySelectorAll(query) {
    return pipe(
        (inputQuery) => multipleQueryToList(inputQuery),
        (queryList) => queryList.length == 1 ? singleQuerySelectorAll(query) : multipleQuerySelectorAll(query)
    )(query)
}

export { querySelector, querySelectorAll }