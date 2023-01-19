import { MENU_ACTION} from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSONOnServer, uploadMenuJSONOnLocal } from "../common_menu/common.js";

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
 * card 검색 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} searchInput 검색어
 * @param {Number} searchFrequency 검색 빈도
 */
function makeSearchMenuJSON(searchInput, searchFrequency) {
    const menuJSON = returnSearchMenuJSON(searchInput, searchFrequency);
    uploadMenuJSONOnServer(menuJSON);
    uploadMenuJSONOnLocal(menuJSON);
}

export { makeSearchMenuJSON }