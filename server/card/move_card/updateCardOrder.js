import { statusListOnLocal } from "../../../public/js/store/store.js";
import { CARD_ORDER, FETCH_STATUS_URL, PATCH_METHOD, PATCH_HEADER } from "../../../public/js/common/commonVariable.js";
import { getColumnNodeByStatus, getCardOrderByColumn } from "../../../public/js/component/column.js";

function changeCardOrderOnLocal(statusID, newCardOrder) {
    statusListOnLocal[statusID][CARD_ORDER] = newCardOrder;
}

function changeCardOrderOnServer(statusID, newCardOrder) {
    fetch(FETCH_STATUS_URL + "/" + statusID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({order: newCardOrder})
    })
}

function changeCardOrder(statusID, newCardOrder) {
    changeCardOrderOnServer(statusID, newCardOrder);
    changeCardOrderOnLocal(statusID, newCardOrder);
}

function moveJSONDataOnOneColumn(status) {
    const $cardOrder = pipe(
        getColumnNodeByStatus,
        getCardOrderByColumn
    )(status);

    changeCardOrder(status, $cardOrder);
    updateColumnLength(status);
}

function moveJSONDataOnTwoColumn(prevStatus, nextStatus) {
    moveJSONDataOnOneColumn(prevStatus);
    moveJSONDataOnOneColumn(nextStatus);
}

export { moveJSONDataOnOneColumn, moveJSONDataOnTwoColumn }