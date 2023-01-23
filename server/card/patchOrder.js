import { CARD_ORDER, FETCH_URL, METHOD, HEADER } from "../../public/js/common/commonVariable.js";
import { pipe } from "../../public/js/common/commonFunction.js";
import { getColumnNodeByStatus, getCardOrderByColumn, updateColumnLength } from "../../public/js/component/column.js";
import { statusListOnLocal } from "../../public/js/store/store.js";

/**
 * local에서 카드 순서 정보를 갱신합니다.
 * @param {number} statusID column ID
 * @param {Array} newCardOrder card order Array
 */
function changeCardOrderOnLocal(statusID, newCardOrder) { statusListOnLocal[statusID][CARD_ORDER] = newCardOrder; }

/**
 * server에서 카드 순서 정보를 갱신합니다.
 * @param {number} statusID column ID
 * @param {Array} newCardOrder card order Array
 */
function changeCardOrderOnServer(statusID, newCardOrder) {
    fetch(FETCH_URL.STATUS + "/" + statusID, {
        method: METHOD.PATCH,
        headers: HEADER.PATCH,
        body: JSON.stringify({order: newCardOrder})
    })
}

/**
 * 카드 순서 정보를 갱신합니다.
 * @param {number} statusID 
 * @param {Array} newCardOrder 
 */
function changeCardOrder(statusID, newCardOrder) {
    changeCardOrderOnServer(statusID, newCardOrder);
    changeCardOrderOnLocal(statusID, newCardOrder);
}

/**
 * column 내부 카드 순서를 갱신합니다.
 * @param {number} status column status
 */
function moveJSONDataOnOneColumn(status) {
    const $cardOrder = pipe(
        getColumnNodeByStatus,
        getCardOrderByColumn
    )(status);

    changeCardOrder(status, $cardOrder);
    updateColumnLength(status);
}

/**
 * column 2개 내부의 카드 순서를 갱신합니다.
 * @param {number} prevStatus 이전 column status
 * @param {number} nextStatus 다음 column status
 */
function moveJSONDataOnTwoColumn(prevStatus, nextStatus) {
    moveJSONDataOnOneColumn(prevStatus);
    moveJSONDataOnOneColumn(nextStatus);
}

export { moveJSONDataOnOneColumn, moveJSONDataOnTwoColumn }