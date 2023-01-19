import { FETCH_MENU_URL, POST_HEADER, POST_METHOD } from "../../../public/js/common/commonVariable.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * menu json을 반환합니다. (create card)
 * @param {string} columnName 
 * @param {string} cardTitle
 * @returns {Object} menu JSON (create)
 */
function makeCreatMenuJSON(columnName, cardTitle) {
    return {
        "action": "CREATE",
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON create menu JSON 
 */
function createMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    })
}

/**
 * menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON 
 */
function createMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 */
function createMenuJSON(columnName, cardTitle) {
    const menuJSON = makeCreatMenuJSON(columnName, cardTitle);
    createMenuJSONOnServer(menuJSON);
    createMenuJSONOnLocal(menuJSON);
}

export { createMenuJSON }