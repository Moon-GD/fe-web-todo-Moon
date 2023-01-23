import { MENU_ACTION} from "../../../public/js/common/commonVariable.js";
import { pipe } from "../../../public/js/common/commonFunction.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { timeToStringFormat } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 삭제 menu json을 반환합니다.
 * @param {String} columnName 
 * @param {String} cardTitle 
 * @returns 
 */
function returnDeleteMenuJSON([columnName, cardTitle]) {
    return {
        "action": MENU_ACTION.DELETE,
        "actionTime": timeToStringFormat(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle
    }
}

/**
 * card 삭제 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 */
function makeDeleteMenuJSON(columnName, cardTitle) {
    pipe(
        returnDeleteMenuJSON,
        uploadMenuJSON
    )([columnName, cardTitle])
}

export { makeDeleteMenuJSON }