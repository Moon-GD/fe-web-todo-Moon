import { pipe } from "../../../public/js/common/commonFunction.js";
import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { timeToStringFormat } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 이동 menu json을 반환합니다.
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 * @returns
 */
function returnMoveMenuJSON([prevColumnName, nextColumnName, cardTitle]) {
    return {
        "action": MENU_ACTION.MOVE,
        "actionTime": timeToStringFormat(),
        "id": idGenerator.createMenuID(),
        "prevColumnName": prevColumnName,
        "nextColumnName": nextColumnName,
        "cardTitle": cardTitle
    };
}

/**
 * card 이동 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} prevColumnName 이전 column name
 * @param {String} nextColumnName 다음 column name
 * @param {String} cardTitle card title
 */
const makeMoveMenuJSON = (prevColumnName, nextColumnName, cardTitle) => pipe(
    returnMoveMenuJSON,
    uploadMenuJSON
)([prevColumnName, nextColumnName, cardTitle]);

export { makeMoveMenuJSON }