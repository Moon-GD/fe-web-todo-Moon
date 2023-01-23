import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { pipe } from "../../../public/js/common/commonFunction.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 이동 menu json을 반환합니다.
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 * @returns 
 */
function retureMoveMenuJSON([prevColumnName, nextColumnName, cardTitle]) {
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
 * card 이동 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 */
function makeMoveMenuJSON(prevColumnName, nextColumnName, cardTitle) {
    pipe(
        retureMoveMenuJSON,
        uploadMenuJSON
    )([prevColumnName, nextColumnName, cardTitle])
}

export { makeMoveMenuJSON }