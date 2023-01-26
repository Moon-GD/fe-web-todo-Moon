import { FETCH_URL, METHOD, CARD_ID } from "../../public/js/common/commonVariable.js"
import { updateColumnLength } from "../../public/js/component/column.js";
import { cardListOnLocal } from "../../public/js/store/store.js";
import { moveJSONDataOnOneColumn } from "./patchOrder.js";

/** 서버에서 카드 JSON 데이터를 삭제합니다.
 * @param {number} cardID card ID
 */
function deleteCardDataOnServer(cardID) {
    fetch(FETCH_URL.CARD + "/" + cardID, {
        method: METHOD.DELETE,
    })
}

/** 카드 JSON 데이터를 삭제합니다.
 * @param {string} status 카드가 속한 column의 status
 * @param {number} cardID card ID
 */
function deleteCardData(status, cardID) {
    let dataList = cardListOnLocal[status];

    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i] && dataList[i][CARD_ID] === cardID) {
            delete dataList[i];
            break;
        }
    }

    deleteCardDataOnServer(cardID);
    moveJSONDataOnOneColumn(status);
    updateColumnLength(status);
}

export { deleteCardData }