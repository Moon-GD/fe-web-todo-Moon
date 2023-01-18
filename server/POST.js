import { 
    FETCH_STATUS_URL, FETCH_CARD_URL, 
    POST_METHOD, POST_HEADER 
} from "../public/js/common/commonVariable.js";
import { idGenerator } from "../public/js/common/IDGenerator.js";
import { updateColumnLength } from "../public/js/component/column.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";

/** 로컬에 status를 추가합니다. */
function addStatusOnLocal(newStatusID, newStatusJSON) {
    cardListOnLocal[newStatusID] = [];
    statusListOnLocal[newStatusID] = newStatusJSON;
}

/** 서버에 status를 추가합니다. */
function addStatusOnServer(newStatusJSON) {
    fetch(FETCH_STATUS_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newStatusJSON)
    })
}

/** status를 추가합니다. */
function addStatus(statusName) {
    let newStatusID = idGenerator.createStatusID();
    let newStatusJSON = {
        id: newStatusID,
        statusIndex: newStatusID,
        statusName
    };

    addStatusOnLocal(newStatusID, newStatusJSON);
    addStatusOnServer(newStatusJSON);
}

/** 서버에 카드 JSON을 추가합니다. */
function addCardJSONOnServer(newJSONData) {
    fetch(FETCH_CARD_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(newJSONData)
    })
    .catch((error) => { 
        // 추후 오류 제어 (id 중복 등의 이유로 post 되지 않는 경우 )
    })
}

/** 로컬에 카드 JSON을 추가합니다. */
function addCardJSONOnLocal(status, newJSONData) {
    cardListOnLocal[status].push(newJSONData);
}

/** 카드 JSON을 추가합니다. */
function addCardJSON(status, title, content, cardID) {
    let newJSONData = {
        title,
        content,
        author: "author by web",
        status,
        date: new Date(),
        id: cardID
    }

    addCardJSONOnServer(newJSONData);
    addCardJSONOnLocal(status, newJSONData);
    updateColumnLength(status);
}

export {
    addStatus, addCardJSON
}