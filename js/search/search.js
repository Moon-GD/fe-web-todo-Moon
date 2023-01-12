import { goSearchModalBtn } from "../component/column.js";
import { CLICK } from "../common/commonVariable.js";
import { changeCSS } from "../common/commonFunction.js";
import { DISPLAY_FLEX } from "../common/commonVariable.js";
import { querySelector } from "../devUtils/querySelector.js";
import { turnOffSearchModal } from "../component/modal.js";

const searchModal = querySelector("#search-modal-section");
const searchCancelBtn = querySelector("#search-cancel-btn");
const searchAcceptBtn = querySelector("#search-accept-btn");

// 검색 모달을 띄워주는 클릭 이벤트를 추가합니다.
function addEventToSearchBtn() {
    goSearchModalBtn.addEventListener(CLICK, () => {
        changeCSS(searchModal, "display", DISPLAY_FLEX);
    })
}

// 검색 모달의 취소 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchCancelBtn() {
    searchCancelBtn.addEventListener(CLICK, turnOffSearchModal);
}

// 검색 모달의 검색 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchAcceptBtn() {
    searchAcceptBtn.addEventListener(CLICK, () => {
        turnOffSearchModal();
    })
}

export {
    searchModal,
    addEventToSearchBtn, addEventToSearchCancelBtn, addEventToSearchAcceptBtn
}