import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSONOnServer, uploadMenuJSONOnLocal } from "../common_menu/common.js";

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
 * card 모두 삭제 menu JSON 데이터를 생성합니다. (server, local)
 */
function makeDeleteAllMenuJSON() {
    const menuJSON = returnDeleteAllMenuJSON();
    uploadMenuJSONOnServer(menuJSON);
    uploadMenuJSONOnLocal(menuJSON);
}

export { makeDeleteAllMenuJSON }