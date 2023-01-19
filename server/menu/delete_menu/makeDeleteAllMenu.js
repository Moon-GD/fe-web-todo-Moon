import { 
    MENU_ACTION, FETCH_MENU_URL, 
    POST_METHOD, POST_HEADER 
} from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card 모두 삭제 menu json을 반환합니다.
 * @returns menu JSON
 */
function returnDeleteAllMenuJSON() {
    return {
        "action": MENU_ACTION.DELETE_ALL,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID()
    }
}

/**
 * card 모두 삭제 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeDeleteAllMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * card 모두 삭제 menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeDeleteAllMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 모두 삭제 menu JSON 데이터를 생성합니다. (server, local)
 */
function makeDeleteAllMenuJSON() {
    const menuJSON = returnDeleteAllMenuJSON();
    makeDeleteAllMenuJSONOnServer(menuJSON);
    makeDeleteAllMenuJSONOnLocal(menuJSON);
}

export { makeDeleteAllMenuJSON }