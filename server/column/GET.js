import { FETCH_URL, METHOD, STATUS, CARD_ORDER } from "../../public/js/common/commonVariable.js";
import { statusListOnLocal, cardListOnLocal } from "../../public/js/store/store.js";

/**
 * 서버의 menu JSON을 분류하여 local에 저장합니다.
 * @param {Array} statusJSONList
 */
function classifyStatusJSONList(statusJSONList) {
    statusJSONList.forEach((statusJSON) => {
        const statusIndex = statusJSON[STATUS.INDEX];
        const statusName = statusJSON[STATUS.NAME];
        const statusID = statusJSON[STATUS.ID];
        const cardOrderList = statusJSON[CARD_ORDER];
        statusListOnLocal[statusIndex] = {
            id: statusID,
            statusIndex,
            statusName,
            order: cardOrderList
        }

        cardListOnLocal[statusIndex] = [];
    })
}

/**
 * column JSON 데이터를 서버에서 불러옵니다.
 */
async function getAllStatusJSONData() {
    await fetch(FETCH_URL.STATUS, {method: METHOD.GET})
        .then((res) => res.json())
        .then((data) => {
            classifyStatusJSONList(data);
        })
}

export { classifyStatusJSONList, getAllStatusJSONData }