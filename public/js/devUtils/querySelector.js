import { pipe } from "../common/commonFunction.js";
import {
    singleQuerySelector, singleQuerySelectorAll,
    multipleQueryToList, multipleQuerySelector, multipleQuerySelectorAll
} from "./querySelectorHelper.js"

HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.map = Array.prototype.map;
NodeList.prototype.find = Array.prototype.find

/**
 * 원하는 노드를 찾아 반환합니다.
 * @param {String} query 찾고자 하는 노드 선택자
 * @returns {Node} 노드 객체
 */
const querySelector = (query) => pipe(
    () => multipleQueryToList(query),
    (queryList) => queryList.length === 1 ?
        singleQuerySelector(query) : multipleQuerySelector(query)
)()

const multiQuerySelector = (queryArray) => queryArray.map((query) => querySelector(query));

/** 원하는 노드를 찾아 배열 형태로 반환합니다. */
/**
 * 원하는 노드를 찾아 반환합니다.
 * @param {String} query 찾고자 하는 노드 선택자
 * @returns {Array} 노드 배열
 */
const querySelectorAll = (query) => pipe(
    () => multipleQueryToList(query),
    (queryList) => queryList.length === 1 ?
        singleQuerySelectorAll(query) : multipleQuerySelectorAll(query)
)()

export { querySelector, multiQuerySelector, querySelectorAll }