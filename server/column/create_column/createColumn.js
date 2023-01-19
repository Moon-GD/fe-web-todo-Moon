import { cardListOnLocal, statusListOnLocal } from "../../../public/js/store/store.js";
import { FETCH_STATUS_URL, POST_METHOD, POST_HEADER } from "../../../public/js/common/commonVariable.js";

/** 로컬에 status를 추가합니다. 
 * @param {string} newColumnID column ID
 * @param {Object} newStatusJSON column json
*/
function addStatusOnLocal(newStatusID, newStatusJSON) {
    cardListOnLocal[newStatusID] = [];
    statusListOnLocal[newStatusID] = newStatusJSON;
}

/** 서버에 status를 추가합니다. 
 * @param {Object} newStatusJSON column json
*/
function addStatusOnServer(newStatusJSON) {
    fetch(FETCH_STATUS_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newStatusJSON)
    })
}

/** status를 추가합니다.
 * @param {string} statusName column name
 * @param {string} newStatusID colum ID
 */
function addStatus(statusName, newStatusID) {
    let newStatusJSON = {
        id: newStatusID,
        statusIndex: newStatusID,
        statusName,
        order:[]
    };

    addStatusOnLocal(newStatusID, newStatusJSON);
    addStatusOnServer(newStatusJSON);
}

export { addStatus }