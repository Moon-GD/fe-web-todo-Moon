import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";
import { 
    STATUS_NAME, STATUS_ID, FETCH_STATUS_URL, PATCH_METHOD, PATCH_HEADER, FETCH_CARD_URL 
} from "../public/js/common/commonVariable.js";
import { updateColumnLength } from "../public/js/component/column.js";

/** status의 이름을 바꾸어 줍니다. */
function updateStatusName(prevName, nextName) {
    let statusID = -1;

    for(const statusJSON of statusListOnLocal) {
        if(statusJSON[STATUS_NAME] == prevName) { 
            statusID = statusJSON[STATUS_ID]; 
            statusJSON[STATUS_NAME] = nextName;
            break;
        }
    }

    fetch(FETCH_STATUS_URL + "/" + statusID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({statusName: nextName})
    });
}

/** 해당하는 JSON 데이터를 이동합니다. */
function moveJSONData(prevStatus, nextStatus, cardID) {
    // 서버 data 반영
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: PATCH_METHOD,
        headers: PATCH_HEADER,
        body: JSON.stringify({ status:nextStatus })
    })

    console.log(FETCH_CARD_URL + "/" + cardID)

    // local data 반영
    let prevCardList = cardListOnLocal[prevStatus];
    let nextCardList = cardListOnLocal[nextStatus];

    for(let i=0;i<prevCardList.length;i++) {
        if(prevCardList[i].id == cardID) {
            nextCardList.push(prevCardList[i]);
            prevCardList.splice(i, 1);
            break;
        }
    }

    // 이동 전 후 column의 길이 갱신
    updateColumnLength(prevStatus);
    updateColumnLength(nextStatus);
}

export { updateStatusName, moveJSONData }