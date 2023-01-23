import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { pipe } from "../../../public/js/common/commonFunction.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { uploadMenuJSON } from "../post.js";
import { timeToStringFormat } from "../../../public/js/component/menu/menuLogTime.js";

/**
 * card 모두 삭제 menu json을 반환합니다.
 * @returns menu JSON
 */
function returnDeleteAllMenuJSON() {
    return {
        "action": MENU_ACTION.DELETE_ALL,
        "actionTime": timeToStringFormat(),
        "id": idGenerator.createMenuID()
    }
}

/**
 * card 모두 삭제 menu JSON 데이터를 생성합니다. (server, local)
 */
function makeDeleteAllMenuJSON() {
    pipe(
        returnDeleteAllMenuJSON,
        uploadMenuJSON
    )()
}

export { makeDeleteAllMenuJSON }