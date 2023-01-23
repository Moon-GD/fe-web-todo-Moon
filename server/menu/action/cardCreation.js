import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { pipe } from "../../../public/js/common/commonFunction.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 생성 menu json을 반환합니다.
 * @param {string} columnName 
 * @param {string} cardTitle
 * @returns {Object} menu JSON (create)
 */
function returnCreateMenuJSON([columnName, cardTitle]) {
    return {
        "action": MENU_ACTION.CREATE,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 생성 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 */
function makeCreateMenuJSON(columnName, cardTitle) {
    pipe(
        returnCreateMenuJSON,
        uploadMenuJSON
    )([columnName, cardTitle])
}

export { makeCreateMenuJSON }