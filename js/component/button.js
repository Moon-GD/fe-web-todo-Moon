import { turnOnCardClearModal, turnOffCardClearModal } from "./modal.js";
import { deleteAllCards } from "./card.js";
import { CLICK } from "../common/commonVariable.js";
import { querySelector } from "../devUtils/querySelector.js";

const goCardClearModalBtn = querySelector("#go-card-clear-btn");
const cardClearModalCancelBtn = querySelector("#clear-cancel-btn");
const cardClearModalAcceptBtn = querySelector("#clear-accept-btn");

// card clear 버튼들에 이벤트를 추가합니다.
function addEventToCardClearBtns() {
    goCardClearModalBtn.addEventListener(CLICK, turnOnCardClearModal)
    cardClearModalCancelBtn.addEventListener(CLICK, turnOffCardClearModal)
    cardClearModalAcceptBtn.addEventListener(CLICK, () => {
        deleteAllCards();
        turnOffCardClearModal();
    })
}

export { addEventToCardClearBtns }