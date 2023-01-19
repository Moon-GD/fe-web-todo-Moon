import { MENU_ACTION} from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSONOnServer, uploadMenuJSONOnLocal } from "../common_menu/common.js";
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
 * card 수정 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName 
 * @param {String} cardTitle 
 */
function makeUpdateMenuJSON(columnName, cardTitle) {
    const menuJSON = returnUpdateMenuJSON(columnName, cardTitle);
    uploadMenuJSONOnServer(menuJSON);
    uploadMenuJSONOnLocal(menuJSON);
}

export { makeUpdateMenuJSON }