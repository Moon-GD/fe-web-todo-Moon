import { cardListOnLocal } from "../../../public/js/store/store.js";
import { FETCH_CARD_URL, POST_METHOD, POST_HEADER } from "../../../public/js/common/commonVariable.js";
import { 
    getColumnNodeByStatus, getCardOrderByColumn, 
    updateColumnLength 
} from "../../../public/js/component/column.js";
import { moveJSONDataOnOneColumn } from "../move_card/updateCardOrder.js";

/** 로컬에 카드 JSON을 추가합니다. 
 * @param {number} status column status
 * @param {Object} newJSONData card json
*/
const addCardJSONOnLocal = (status, newJSONData) => cardListOnLocal[status].push(newJSONData);

/** 서버에 카드 JSON을 추가합니다. 
 * @param {Object} newJSONData card json
*/
function addCardJSONOnServer(newJSONData) {
    fetch(FETCH_CARD_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newJSONData)
    })
}

/** 카드 JSON을 추가합니다.
 * @param {number} status column status
 * @param {string} title card title
 * @param {string} content card content
 * @param {number} cardID card ID
 */
function addCardJSON(status, title, content, cardID) {
    let newJSONData = {
        title,
        content,
        author: "author by web",
        status,
        date: new Date(),
        id: cardID
    }

    moveJSONDataOnOneColumn(status);
    addCardJSONOnLocal(status, newJSONData);åß
    addCardJSONOnServer(newJSONData);
    updateColumnLength(status);
}

export { addCardJSON }