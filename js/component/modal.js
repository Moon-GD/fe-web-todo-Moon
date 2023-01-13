import { DISPLAY_FLEX, DISPLAY_NONE } from "../common/commonVariable.js";
import { changeCSS } from "../common/commonFunction.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchModal } from "../search/search.js";

// card delete modal
const modalSection = querySelector("#modal-section");

// column add modal
const columnAddModal = querySelector("#column-add-modal-section");

// card clear modal
const cardClearModal = querySelector("#clear-modal-section");

// 카드 삭제 관련 모달을 띄워줍니다.
function turnOnModal() { modalSection.style.display = "flex"; }

// 카드 삭제 관련 모달을 숨겨줍니다.
function turnOffModal() { modalSection.style.display = "none"; }

// column 추가 관련 모달을 띄워줍니다.
function turnOnColumnAddModal() { columnAddModal.style.display = "flex"; }

// column 추가 관련 모달을 숨겨줍니다.
function turnOffColumnAddModal() { columnAddModal.style.display = "none"; }

// 검색 modal을 끕니다.
function turnOffSearchModal() {
    changeCSS(searchModal, "display", DISPLAY_NONE);
}

// card clear modal을 숨겨줍니다.
function turnOffCardClearModal() {
    changeCSS(cardClearModal, "display", DISPLAY_NONE);
}

// card clear modal을 보여줍니다.
function turnOnCardClearModal() {
    changeCSS(cardClearModal, "display", DISPLAY_FLEX);
}

export { 
    modalSection, turnOnModal, turnOnColumnAddModal,
    turnOffSearchModal,
    turnOnCardClearModal, turnOffCardClearModal, turnOffModal, turnOffColumnAddModal
 }