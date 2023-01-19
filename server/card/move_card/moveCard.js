import { cardListOnLocal } from "../../../public/js/store/store.js";
import { moveJSONDataOnOneColumn, moveJSONDataOnTwoColumn } from "./updateCardOrder.js";
import { FETCH_CARD_URL, PATCH_METHOD, PATCH_HEADER } from "../../../public/js/common/commonVariable.js";

/** 로컬에서 card JSON 데이터를 이동합니다. */
function moveCardJSONDataOnLocal(prevStatus, nextStatus, cardID) {
    let prevCardList = cardListOnLocal[prevStatus];
    let nextCardList = cardListOnLocal[nextStatus];

    for(let i=0;i<prevCardList.length;i++) {
        if(prevCardList[i] && prevCardList[i].id == cardID) {
            nextCardList.push(prevCardList[i]);
            prevCardList.splice(i, 1);
            break;
        }
    }
}

/** 서버에서 card JSON 데이터를 이동합니다. */
function moveCardJSONDataOnServer(nextStatus, cardID) {
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({ status:nextStatus })
    })
}

function moveCardJsonData(prevStatus, nextStatus, cardID) {
    moveCardJSONDataOnLocal(prevStatus, nextStatus, cardID);
    moveCardJSONDataOnServer(nextStatus, cardID)
}

/** 해당하는 JSON 데이터를 이동합니다. */
function moveJSONData(prevStatus, nextStatus, cardID) {
    moveCardJsonData(prevStatus, nextStatus, cardID);

    prevStatus == nextStatus ?
            moveJSONDataOnOneColumn(prevStatus) :
            moveJSONDataOnTwoColumn(prevStatus, nextStatus);
}

export { moveJSONData }