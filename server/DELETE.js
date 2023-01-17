import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";
import { 
    STATUS_NAME, STATUS_INDEX, FETCH_CARD_URL,
    FETCH_STATUS_URL, DELETE_METHOD,
    STATUS, CARD_ID
} from "../public/js/common/commonVariable.js";
import { updateColumnLength } from "../public/js/component/column.js";

/** 해당하는 status를 삭제합니다. */
function deleteStatus(statusName) {
    let filterdList = statusListOnLocal.filter((statusJSON) => statusJSON[STATUS_NAME] == statusName)
    let statusIndex = filterdList[0][STATUS_INDEX];

    // 서버에서 status 데이터 삭제
    fetch(FETCH_STATUS_URL + "/" + statusIndex, {
        method: DELETE_METHOD
    }).then((res) => { 
        if(res.status != 200) {
        // 에러 상황 출력을 위해 임시로 해둠
        // 추후에 에러 핸들링해주기
        throw new Error(`error : ${statusIndex}번의 card를 삭제하는데 실패`)
    } })

    // 서버에서 해당하는 status를 가진 카드 삭제
    cardListOnLocal[statusIndex].filter((cardJSON) => cardJSON[STATUS] == statusIndex)
    .forEach((cardJSON) => { deleteJSONData(cardJSON[STATUS], cardJSON[CARD_ID]) })

    // 로컬에서 해당하는 status 정보 모두 삭제
    cardListOnLocal.splice(statusIndex, 1);
    statusListOnLocal.splice(statusIndex, 1);
}

/** 해당하는 JSON 데이터를 삭제합니다. */
function deleteJSONData(status, cardID) {
    let dataList = cardListOnLocal[status];

    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: DELETE_METHOD,
    })
    .then((res) => { if(res.status != 200) {
        // 에러 상황 출력을 위해 임시로 해둠
        // 추후에 에러 핸들링해주기
        throw new Error(`error : ${cardID}번의 card를 삭제하는데 실패`)
    } })

    for(let i=0;i<dataList.length;i++) {
        if(dataList[i].id == cardID) {
            dataList.splice(i, 1);
            break;
        }
    }

    updateColumnLength(status);
}

export {
    deleteStatus, deleteJSONData
}