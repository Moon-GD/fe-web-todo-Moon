import { pipe } from "../../../public/js/common/commonFunction.js";
import { MENU_ACTION } from "../../../public/js/common/commonVariable.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { timeToStringFormat } from "../../../public/js/component/menu/menuLogTime.js";
import { uploadMenuJSON } from "../post.js";

/**
 * card 검색 menu json을 반환합니다.
 * @param {String} searchInput 검색어
 * @param {Number} searchFrequency 검색 빈도
 * @returns
 */
function returnSearchMenuJSON([searchInput, searchFrequency]) {
    return {
        "action": MENU_ACTION.SEARCH,
        "actionTime": timeToStringFormat(),
        "id": idGenerator.createMenuID(),
        "searchInput": searchInput,
        "searchFrequency": searchFrequency
    };
}

/**
 * card 검색 menu JSON 데이터를 생성합니다. (server, local)
 * @param {String} searchInput 검색어
 * @param {Number} searchFrequency 검색 빈도
 */
const makeSearchMenuJSON = (searchInput, searchFrequency) => pipe(
    returnSearchMenuJSON,
    uploadMenuJSON
)([searchInput, searchFrequency]);

export { makeSearchMenuJSON }