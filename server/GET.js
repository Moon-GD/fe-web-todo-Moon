import { 
    STATUS, STATUS_ID, STATUS_INDEX, STATUS_NAME,
    FETCH_STATUS_URL, FETCH_CARD_URL,
    GET_METHOD, 
    CARD_ID
} from "../public/js/common/commonVariable.js";
import { statusListOnLocal, cardListOnLocal } from "../public/js/store/store.js";

/** status json 데이터를 분류해줍니다. */
function classifyStatusJSONList(statusJSONList) {
    statusJSONList.forEach((statusJSON) => {
        const statusIndex = statusJSON[STATUS_INDEX];
        const statusName = statusJSON[STATUS_NAME];
        const statusID = statusJSON[STATUS_ID];
        const cardOrderList = statusJSON["order"];

        statusListOnLocal[statusIndex] = {
            id:statusID,
            statusIndex,
            statusName,
            "order": cardOrderList
        }
        
        cardListOnLocal[statusIndex] = [];
    })
}

/** 카드 json 데이터를 분류해줍니다. */
function classifyCardJSONList(cardJSONList) {
    cardJSONList.forEach((cardJSON) => {
        const status = cardJSON[STATUS];
        const cardID = cardJSON[CARD_ID]
        const cardOrderList = statusListOnLocal[status]["order"];
        const cardIndex = cardOrderList.indexOf(cardID);
        cardListOnLocal[status][cardIndex] = cardJSON
        // cardListOnLocal[status].push(cardJSON)
    })
}

/** status 관련 모든 JSON 데이터를 불러옵니다. */
async function getAllStatusJSONData() {
    await fetch(FETCH_STATUS_URL, { method: GET_METHOD })
    .then((res) => { return res.json(); })
    .then((data) => { classifyStatusJSONList(data); } )
}

/** 카드 관련 모든 JSON 데이터를 불러옵니다. */
async function getAllCardJSONData() {
    await fetch(FETCH_CARD_URL, { method: GET_METHOD })
    .then((res) => { return res.json(); })
    .then((data) => { classifyCardJSONList(data); })
}

/** 모든 json 데이터를 불러옵니다.*/
async function getAllJSONData() {
    await getAllStatusJSONData();
    await getAllCardJSONData();
}

export {
    classifyStatusJSONList, classifyCardJSONList,
    getAllStatusJSONData, getAllCardJSONData,
    getAllJSONData
}