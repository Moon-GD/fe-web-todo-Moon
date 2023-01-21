import { STATUS_NAME, STATUS_ID, FETCH_URL, METHOD, HEADER } from "../../../public/js/common/commonVariable.js";
import { statusListOnLocal } from "../../../public/js/store/store.js";

/** 로컬에서 status의 이름을 바꾸어 줍니다. 
 * @param {string} prevName 이전 column 이름
 * @param {string} nextName 다음 column 이름
*/
function updateStatusNameOnLocal(prevName, nextName) {
    let statusID = -1;

    for(const statusJSON of statusListOnLocal) {
        if(statusJSON && statusJSON[STATUS_NAME] == prevName) { 
            statusID = statusJSON[STATUS_ID]; 
            statusJSON[STATUS_NAME] = nextName;
            break;
        }
    }

    return statusID;
}

/** 서버에서 status의 이름을 바꾸어 줍니다. 
 * @param {string} statusID column ID
 * @param {string} nextName 변경할 column 이름
*/
function updateStatusNameOnServer(statusID, nextName) {
    fetch(FETCH_URL.STATUS + "/" + statusID, {
        method: METHOD.PATCH,
        headers: HEADER.PATCH,
        body: JSON.stringify({statusName: nextName})
    });
}

/** status의 이름을 바꾸어 줍니다. 
 * @param {string} prevName 이전 column 이름
 * @param {string} nextName 다음 column 이름
*/
function updateStatusName(prevName, nextName) {
    let statusID = updateStatusNameOnLocal(prevName, nextName);
    updateStatusNameOnServer(statusID, nextName)
}

export { updateStatusName }