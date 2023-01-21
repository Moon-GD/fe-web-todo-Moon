import { FETCH_URL, GET_METHOD } from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js"
import { menuJSONFormatter } from "./menuJSONFormatter.js";

/**
 * menu JSON 데이터를 분류합니다.
 * @param {Array} menuJSONList menu JSON Array
 */
async function classifyMenuJSONList(menuJSONList) {
    menuJSONList.forEach((menuJSON) => menuListOnLocal.push( menuJSONFormatter[menuJSON["action"]](menuJSON)))
}

/**
 * 메뉴 JSON 데이터를 서버에서 불러옵니다.
 */
async function getAllMenuJSON() {
    await fetch(FETCH_URL.MENU, { method: GET_METHOD })
    .then((res) => res.json())
    .then((menuList) => classifyMenuJSONList(menuList))
}

export { getAllMenuJSON }