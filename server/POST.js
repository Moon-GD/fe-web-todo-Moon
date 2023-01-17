import { FETCH_STATUS_URL, FETCH_CARD_URL, POST_METHOD, POST_HEADER } from "../public/js/common/commonVariable.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";
import { idGenerator } from "../public/js/common/IDGenerator.js";
import { updateColumnLength } from "../public/js/component/column.js";

/** 새로운 status를 추가합니다. */
function addStatus(statusName) {
    // local에 데이터 갱신
    let newStatusID = idGenerator.createStatusID();

    let newStatusJSON = {
        id: newStatusID,
        statusIndex: newStatusID,
        statusName
    }

    cardListOnLocal[newStatusID] = [];
    statusListOnLocal[newStatusID] = newStatusJSON;

    fetch(FETCH_STATUS_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newStatusJSON)
    })
}

/** 새로운 JSON 데이터를 추가합니다. */
function addJSONData(status, title, content, cardID) {
    console.log(cardID)
    let newJSONData = {
        title,
        content,
        author: "author by web",
        status,
        date: new Date(),
        id: cardID
    }

    fetch(FETCH_CARD_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newJSONData)
    })
    .catch((error) => { 
        // 추후 오류 제어 (id 중복 등의 이유로 post 되지 않는 경우 )
    })

    cardListOnLocal[status].push(newJSONData);

    updateColumnLength(status);
}

export {
    addStatus, addJSONData
}