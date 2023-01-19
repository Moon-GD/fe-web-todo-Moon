import { 
    FETCH_MENU_URL, MENU_ACTION, 
    POST_METHOD, POST_HEADER 
} from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";

/**
 * card 검색 menu json을 반환합니다.
 * @param {String} searchInput 검색어
 * @param {Number} searchFrequency 검색 빈도
 * @returns 
 */
function returnSearchMenuJSON(searchInput, searchFrequency) {
    return {
        "action": MENU_ACTION.SEARCH,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "searchInput": searchInput,
        "searchFrequency": searchFrequency
    }
}

/**
 * card 검색 menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeSearchMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * card 검색 menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function makeSearchMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * card 검색 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} searchInput 검색어
 * @param {Number} searchFrequency 검색 빈도
 */
function makeSearchMenuJSON(searchInput, searchFrequency) {
    const menuJSON = returnSearchMenuJSON(searchInput, searchFrequency);
    makeSearchMenuJSONOnServer(menuJSON);
    makeSearchMenuJSONOnLocal(menuJSON);
}

export { makeSearchMenuJSON }