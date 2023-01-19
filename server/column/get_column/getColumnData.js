import { 
    FETCH_STATUS_URL, GET_METHOD,
    STATUS_INDEX, STATUS_NAME, STATUS_ID, CARD_ORDER 
} from "../../../public/js/common/commonVariable.js";
import { statusListOnLocal, cardListOnLocal } from "../../../public/js/store/store.js";

function classifyStatusJSONList(statusJSONList) {
    statusJSONList.forEach((statusJSON) => {
        const statusIndex = statusJSON[STATUS_INDEX];
        const statusName = statusJSON[STATUS_NAME];
        const statusID = statusJSON[STATUS_ID];
        const cardOrderList = statusJSON[CARD_ORDER];

        statusListOnLocal[statusIndex] = {
            id:statusID,
            statusIndex,
            statusName,
            order: cardOrderList
        }
        
        cardListOnLocal[statusIndex] = [];
    })
}

/** status 관련 모든 JSON 데이터를 불러옵니다. */
async function getAllStatusJSONData() {
    await fetch(FETCH_STATUS_URL, { method: GET_METHOD })
    .then((res) => { return res.json(); })
    .then((data) => { classifyStatusJSONList(data); } )
}

export { classifyStatusJSONList, getAllStatusJSONData }