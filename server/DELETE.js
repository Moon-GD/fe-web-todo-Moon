import { 
    FETCH_STATUS_URL, FETCH_CARD_URL,
    DELETE_METHOD,
    HTTP_SUCCESS,
    STATUS, STATUS_INDEX, STATUS_NAME,
    CARD_ID,
} from "../public/js/common/commonVariable.js";
import { updateColumnLength } from "../public/js/component/column.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";

/** 서버에서 status 삭제 */
function deleteStatusOnServer(statusIndex) {
    // 서버에서 status 데이터 삭제
    fetch(FETCH_STATUS_URL + "/" + statusIndex, {
        method: DELETE_METHOD
    }).then((res) => { 
        if(res.status != HTTP_SUCCESS) {
        // 에러 상황 출력을 위해 임시로 해둠
        // 추후에 에러 핸들링해주기
        throw new Error(`error : ${statusIndex}번의 card를 삭제하는데 실패`)
    } })
}

/** 로컬에서 status 삭제  */
function deleteStatusOnLocal(statusIndex) {
    delete cardListOnLocal[statusIndex];
    delete statusListOnLocal[statusIndex];
}

/** status를 삭제합니다. */
function deleteStatus(statusName) {
    let filteredStatus = statusListOnLocal
                        .filter((statusJSON) => statusJSON[STATUS_NAME] == statusName)[0];

    let statusIndex = filteredStatus[STATUS_INDEX];

    deleteStatusOnServer(statusIndex);

    if(cardListOnLocal[statusIndex].length) {
        cardListOnLocal[statusIndex]
        .filter((cardJSON) => cardJSON[STATUS] == statusIndex)
        .forEach((cardJSON) => { deleteJSONData(cardJSON[STATUS], cardJSON[CARD_ID]); })
    }

    deleteStatusOnLocal(statusIndex);
}

/** 서버에서 카드 JSON 데이터를 삭제합니다. */
function deleteCardDataOnServer(cardID) {
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: DELETE_METHOD,
    })
    .then((res) => { if(res.status != HTTP_SUCCESS) {
        // 에러 상황 출력을 위해 임시로 해둠
        // 추후에 에러 핸들링해주기
        throw new Error(`error : ${cardID}번의 card를 삭제하는데 실패`)
    } })
}

/** 카드 JSON 데이터를 삭제합니다. */
function deleteCardData(status, cardID) {
    let dataList = cardListOnLocal[status];

    deleteCardDataOnServer(cardID);

    for(let i=0;i<dataList.length;i++) {
        if(dataList[i] && dataList[i][CARD_ID] == cardID) {
            delete dataList[i];
            break;
        }
    }

    updateColumnLength(status);
}

export {
    deleteStatus, deleteCardData
}