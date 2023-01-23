import { FETCH_URL, METHOD, HEADER } from "../../../public/js/common/commonVariable.js";
import { cardListOnLocal } from "../../../public/js/store/store.js";
import { moveJSONDataOnOneColumn, moveJSONDataOnTwoColumn } from "./cardOrder.js";

/** 로컬에서 card JSON 데이터를 이동합니다.
 * @param {number} prevStatus 이전 column status
 * @param {number} nextStatus 다음 column status
 * @param {string} cardID card ID
 */
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

/** 서버에서 card JSON 데이터를 이동합니다.
 * @param {number} nextStatus 다음 column status
 * @param {string} cardID card ID
 */
function moveCardJSONDataOnServer(nextStatus, cardID) {
    fetch(FETCH_URL.CARD + "/" + cardID, {
        method: METHOD.PATCH,
        headers: HEADER.PATCH,
        body: JSON.stringify({ status:nextStatus })
    })
}

/** card JSON 데이터를 이동합니다.
 * @param {number} prevStatus 이전 column status
 * @param {number} nextStatus 다음 column status
 * @param {string} cardID card ID
 */
function moveCardJsonData(prevStatus, nextStatus, cardID) {
    moveCardJSONDataOnLocal(prevStatus, nextStatus, cardID);
    moveCardJSONDataOnServer(nextStatus, cardID)
}

/** 카드 이동이 발생하면 카드, 카드 순서, column에 관련 정보를 갱신합니다.
 * @param {number} prevStatus 이전 column status
 * @param {number} nextStatus 다음 column status
 * @param {string} cardID card ID
*/
function moveJSONData(prevStatus, nextStatus, cardID) {
    moveCardJsonData(prevStatus, nextStatus, cardID);

    prevStatus == nextStatus ?
            moveJSONDataOnOneColumn(prevStatus) :
            moveJSONDataOnTwoColumn(prevStatus, nextStatus);
}

export { moveJSONData }