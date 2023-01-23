import { 
    FETCH_URL, METHOD, 
    COLUMN_STATUS, CARD_ID, CARD_ORDER 
} from "../../public/js/common/commonVariable.js";
import { cardListOnLocal, statusListOnLocal } from "../../public/js/store/store.js";

/**
 * @param {Array} cardJSONList
 * @returns {none}
 */
function classifyCardJSONList(cardJSONList) {
    cardJSONList.forEach((cardJSON) => {
        const status = cardJSON[COLUMN_STATUS];
        const cardID = cardJSON[CARD_ID]
        const cardOrderList = statusListOnLocal[status][CARD_ORDER];
        const cardIndex = cardOrderList.indexOf(cardID);
        cardListOnLocal[status][cardIndex] = cardJSON;
    })
}

/** 카드 JSON 데이터를 서버에서 불러옵니다.
 * @returns {none} 
 */
async function getAllCardJSONData() {
    await fetch(FETCH_URL.CARD, { method: METHOD.GET })
    .then((res) => { return res.json(); })
    .then((data) => classifyCardJSONList(data))
}

export { getAllCardJSONData }