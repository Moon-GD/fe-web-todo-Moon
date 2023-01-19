import { 
    FETCH_STATUS_URL, FETCH_CARD_URL,
    STATUS_ID, STATUS_NAME,
    PATCH_METHOD, PATCH_HEADER 
} from "../public/js/common/commonVariable.js";
import { getColumnNodeByStatus, updateColumnLength, getCardOrderByColumn } from "../public/js/component/column.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";
    
/** 로컬에서 status의 이름을 바꾸어 줍니다. */
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

/** 서버에서 status의 이름을 바꾸어 줍니다. */
function updateStatusNameOnServer(statusID, nextName) {
    fetch(FETCH_STATUS_URL + "/" + statusID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({statusName: nextName})
    });
}

/** status의 이름을 바꾸어 줍니다. */
function updateStatusName(prevName, nextName) {
    let statusID = updateStatusNameOnLocal(prevName, nextName);
    updateStatusNameOnServer(statusID, nextName)
}

/** 로컬에서 JSON 데이터를 이동합니다. */
function moveJSONDataOnLocal(prevStatus, nextStatus, cardID) {
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

/** 서버에서 JSON 데이터를 이동합니다. */
function moveJSONDataOnServer(cardID, nextStatus) {
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({ status:nextStatus })
    })
}

function changeCardOrderOnServer(statusID, newCardOrder) {
    fetch(FETCH_STATUS_URL + "/" + statusID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({order: newCardOrder})
    })
}

function changeCardOrderOnLocal(statusID, newCardOrder) {
    statusListOnLocal[statusID]["order"] = newCardOrder;
}

/** 해당하는 JSON 데이터를 이동합니다. */
function moveJSONData(prevStatus, nextStatus, cardID) {
    const $prevColumn = getColumnNodeByStatus(prevStatus);
    const $nextColumn = getColumnNodeByStatus(nextStatus);

    const $prevCardOrder = getCardOrderByColumn($prevColumn);
    const $nextCardOrder = getCardOrderByColumn($nextColumn);

    if(prevStatus == nextStatus) {
        changeCardOrderOnServer(prevStatus, $prevCardOrder);
        changeCardOrderOnLocal(prevStatus, $prevCardOrder);
    }
    else {
        changeCardOrderOnServer(prevStatus, $prevCardOrder);
        changeCardOrderOnLocal(prevStatus, $prevCardOrder);
        changeCardOrderOnServer(nextStatus, $nextCardOrder);
        changeCardOrderOnLocal(nextStatus, $nextCardOrder);
    }

    moveJSONDataOnServer(cardID, nextStatus);
    moveJSONDataOnLocal(prevStatus, nextStatus, cardID);

    // 이동 전 후 column의 길이 갱신
    updateColumnLength(prevStatus);
    updateColumnLength(nextStatus);

    console.log(statusListOnLocal)
}

export { updateStatusName, moveJSONData }