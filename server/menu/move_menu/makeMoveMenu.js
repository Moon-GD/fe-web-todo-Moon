import { 
    MENU_ACTION, FETCH_MENU_URL, 
    POST_METHOD, POST_HEADER 
} from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card 이동 menu json을 반환합니다.
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 * @returns 
 */
function retureMoveMenuJSON(prevColumnName, nextColumnName, cardTitle) {
    return {
        "action": MENU_ACTION.MOVE,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "prevColumnName": prevColumnName,
        "nextColumnName": nextColumnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 이동 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeMoveMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * card 이동 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeMoveMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 이동 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 */
function makeMoveMenuJSON(prevColumnName, nextColumnName, cardTitle) {
    const menuJSON = retureMoveMenuJSON(prevColumnName, nextColumnName, cardTitle);
    makeMoveMenuJSONOnServer(menuJSON);
    makeMoveMenuJSONOnLocal(menuJSON);
}

export { makeMoveMenuJSON }