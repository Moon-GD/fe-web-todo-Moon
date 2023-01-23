import { FETCH_URL, METHOD, COLUMN_STATUS, STATUS, CARD_ID } from "../../public/js/common/commonVariable.js";
import { deleteCardData } from "../card/delete.js";
import { statusListOnLocal, cardListOnLocal } from "../../public/js/store/store.js";

/** 로컬에서 status 삭제 
 * @param {number} statusIndex column status
*/
function deleteStatusOnLocal(statusIndex) {
    delete cardListOnLocal[statusIndex];
    delete statusListOnLocal[statusIndex];
}

/** 서버에서 status 삭제
 * @param {number} statusIndex column status
 */
function deleteStatusOnServer(statusIndex) {
    fetch(FETCH_URL.STATUS + "/" + statusIndex, { 
        method: METHOD.DELETE 
    });
}

/** status를 삭제합니다. 
 * @param {string} statusName column 이름
*/
function deleteStatus(statusName) {
    let filteredStatus = statusListOnLocal
    .filter((statusJSON) => statusJSON[STATUS.NAME] == statusName)[0];

    const statusIndex = filteredStatus[STATUS.INDEX];

    deleteStatusOnServer(statusIndex);

    if(cardListOnLocal[statusIndex].length) {
        cardListOnLocal[statusIndex]
        .filter((cardJSON) => cardJSON[COLUMN_STATUS] == statusIndex)
        .forEach((cardJSON) => deleteCardData(cardJSON[COLUMN_STATUS], cardJSON[CARD_ID]))
    }

    deleteStatusOnLocal(statusIndex);
}

export { deleteStatus }