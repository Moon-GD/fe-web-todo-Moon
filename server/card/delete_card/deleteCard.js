import { FETCH_CARD_URL, DELETE_METHOD } from "../../../public/js/common/commonVariable.js"

/** 서버에서 카드 JSON 데이터를 삭제합니다. */
function deleteCardDataOnServer(cardID) {
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: DELETE_METHOD,
    })
}

export { deleteCardDataOnServer }