import { 
    FETCH_STATUS_URL,
    DELETE_METHOD,
    STATUS, STATUS_INDEX, STATUS_NAME,
    CARD_ID,
} from "../public/js/common/commonVariable.js";
import { updateColumnLength } from "../public/js/component/column.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";
import { deleteCardDataOnServer } from "./card/delete_card/deleteCard.js";

/** 로컬에서 status 삭제  */
function deleteStatusOnLocal(statusIndex) {
    delete cardListOnLocal[statusIndex];
    delete statusListOnLocal[statusIndex];
}

/** 서버에서 status 삭제 */
function deleteStatusOnServer(statusIndex) {
    // 서버에서 status 데이터 삭제
    fetch(FETCH_STATUS_URL + "/" + statusIndex, {
        method: DELETE_METHOD
    })
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