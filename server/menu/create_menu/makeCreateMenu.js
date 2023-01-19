import { FETCH_MENU_URL, POST_HEADER, POST_METHOD, MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card 생성 menu json을 반환합니다.
 * @param {string} columnName 
 * @param {string} cardTitle
 * @returns {Object} menu JSON (create)
 */
function returnCreateMenuJSON(columnName, cardTitle) {
    return {
        "action": MENU_ACTION.CREATE,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 생성 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON create menu JSON 
 */
function makeCreateMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    })
}

/**
 * card 생성 menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON 
 */
function makeCreateMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 생성 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 */
function makeCreateMenuJSON(columnName, cardTitle) {
    const menuJSON = returnCreateMenuJSON(columnName, cardTitle);
    makeCreateMenuJSONOnServer(menuJSON);
    makeCreateMenuJSONOnLocal(menuJSON);
}

export { makeCreateMenuJSON }