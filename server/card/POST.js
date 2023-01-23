import { FETCH_URL, METHOD, HEADER } from "../../public/js/common/commonVariable.js";
import { updateColumnLength } from "../../public/js/component/column.js";
import { cardListOnLocal } from "../../public/js/store/store.js";
import { moveJSONDataOnOneColumn } from "./PATCH/cardOrder.js";

/** 로컬에 카드 JSON을 추가합니다. 
 * @param {number} status column status
 * @param {Object} newJSONData card json
*/
const addCardJSONOnLocal = (status, newJSONData) => cardListOnLocal[status].push(newJSONData);

/** 서버에 카드 JSON을 추가합니다. 
 * @param {Object} newJSONData card json
*/
function addCardJSONOnServer(newJSONData) {
    fetch(FETCH_URL.CARD, {
        method: METHOD.POST,
        headers: HEADER.POST,
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
    addCardJSONOnLocal(status, newJSONData);
    addCardJSONOnServer(newJSONData);
    updateColumnLength(status);
}

export { addCardJSON }