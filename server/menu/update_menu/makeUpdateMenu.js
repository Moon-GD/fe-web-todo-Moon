import { 
    MENU_ACTION, FETCH_MENU_URL, 
    POST_METHOD, POST_HEADER 
} from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card 수정 menu json을 반환합니다.
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 * @returns 
 */
function returnUpdateMenuJSON(columnName, cardTitle) {
    return {
        "action": MENU_ACTION.UPDATE,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 수정 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeUpdateMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * card 수정 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeUpdateMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 수정 menu JSON을 server에 생성합니다.
 * @param {String} columnName 
 * @param {String} cardTitle 
 */
function makeUpdateMenuJSON(columnName, cardTitle) {
    const menuJSON = returnUpdateMenuJSON(columnName, cardTitle);
    makeUpdateMenuJSONOnServer(menuJSON);
    makeUpdateMenuJSONOnLocal(menuJSON);
}

export { makeUpdateMenuJSON }