import { pipe } from "../../../public/js/common/commonFunction.js";
import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { timeToStringFormat } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 삭제 menu json을 반환합니다.
 * @param {String} columnName
 * @param {String} cardTitle
 * @param {String} cardContent 카드 내용
 * @returns
 */
function returnDeleteMenuJSON([columnName, cardTitle, cardContent]) {
    return {
        "action": MENU_ACTION.DELETE,
        "actionTime": timeToStringFormat(),
        "id": idGenerator.createMenuID(),
        "columnName": columnName,
        "cardTitle": cardTitle,
        "cardContent": cardContent,
        "isRecovered": false
    };
}

/**
 * card 삭제 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} columnName column name
 * @param {String} cardTitle card title
 * @param {String} cardContent 카드 내용
 */
const makeDeleteMenuJSON = (columnName, cardTitle, cardContent) => pipe(
    returnDeleteMenuJSON,
    uploadMenuJSON
)([columnName, cardTitle, cardContent]);

export { makeDeleteMenuJSON }