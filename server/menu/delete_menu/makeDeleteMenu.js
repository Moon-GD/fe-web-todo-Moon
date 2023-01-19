import { POST_METHOD, POST_HEADER, MENU_ACTION, FETCH_MENU_URL } from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card 삭제 menu json을 반환합니다.
 * @param {String} columnName 
 * @param {String} cardTitle 
 * @returns 
 */
function returnDeleteMenuJSON(columnName, cardTitle) {
    return {
        "action": MENU_ACTION.DELETE,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 생성 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeDeleteMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * card 생성 menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeDeleteMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 삭제 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 */
function makeDeleteMenuJSON(columnName, cardTitle) {
    const menuJSON = returnDeleteMenuJSON(columnName, cardTitle);
    makeDeleteMenuJSONOnServer(menuJSON);
    makeDeleteMenuJSONOnLocal(menuJSON);
}

export { makeDeleteMenuJSON }