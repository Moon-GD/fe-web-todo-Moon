import { DISPLAY_FLEX, DISPLAY_NONE } from "../common/commonVariable.js";
import { changeCSS } from "../common/commonFunction.js";
import { querySelector } from "../devUtils/querySelector.js";
import { $searchModal } from "../search/search.js";

const $modalSection = querySelector("#modal-section");
const $columnAddModal = querySelector("#column-add-modal-section");
const $cardClearModal = querySelector("#clear-modal-section");

/** 카드 삭제 관련 모달을 띄워줍니다. */
function turnOnModal() { $modalSection.style.display = DISPLAY_FLEX; }

/** 카드 삭제 관련 모달을 숨겨줍니다. */
function turnOffModal() { $modalSection.style.display = DISPLAY_NONE; }

/** column 추가 관련 모달을 띄워줍니다. */
function turnOnColumnAddModal() { $columnAddModal.style.display = DISPLAY_FLEX; }

/** column 추가 관련 모달을 숨겨줍니다. */
function turnOffColumnAddModal() { $columnAddModal.style.display = DISPLAY_NONE; }

/** 검색 modal을 숨겨줍니다. */
function turnOffSearchModal() { changeCSS($searchModal, "display", DISPLAY_NONE); }

/** card clear modal을 숨겨줍니다. */
function turnOffCardClearModal() { changeCSS($cardClearModal, "display", DISPLAY_NONE); }

/** card clear modal을 보여줍니다. */
function turnOnCardClearModal() { changeCSS($cardClearModal, "display", DISPLAY_FLEX); }

export { 
    $modalSection, turnOnModal, turnOnColumnAddModal,
    turnOffSearchModal,
    turnOnCardClearModal, turnOffCardClearModal, turnOffModal, turnOffColumnAddModal
 }