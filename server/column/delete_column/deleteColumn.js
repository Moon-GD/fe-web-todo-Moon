import { 
    FETCH_STATUS_URL, DELETE_METHOD, 
    STATUS, STATUS_INDEX, STATUS_NAME, CARD_ID 
} from "../../../public/js/common/commonVariable.js";
import { deleteCardData } from "../../card/delete_card/deleteCard.js";
import { statusListOnLocal, cardListOnLocal } from "../../../public/js/store/store.js";

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
const deleteStatusOnServer = (statusIndex) => fetch(FETCH_STATUS_URL + "/" + statusIndex, { method: DELETE_METHOD });

/** status를 삭제합니다. 
 * @param {string} statusName column 이름
*/
function deleteStatus(statusName) {
    let filteredStatus = statusListOnLocal
    .filter((statusJSON) => statusJSON[STATUS_NAME] == statusName)[0];

    let statusIndex = filteredStatus[STATUS_INDEX];

    deleteStatusOnServer(statusIndex);

    if(cardListOnLocal[statusIndex].length) {
        cardListOnLocal[statusIndex]
        .filter((cardJSON) => cardJSON[STATUS] == statusIndex)
        .forEach((cardJSON) => deleteCardData(cardJSON[STATUS], cardJSON[CARD_ID]))
    }

    deleteStatusOnLocal(statusIndex);
}

export { deleteStatus }