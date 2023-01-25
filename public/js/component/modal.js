import { DISPLAY, ONE_SECOND } from "../common/commonVariable.js";
import { changeCSS } from "../common/commonFunction.js";
import { multiQuerySelector } from "../devUtils/querySelector.js";
import { $searchModal } from "../search/search.js";

const [$modalSection, $columnAddModal, $cardClearModal, $warningModal]
    = multiQuerySelector(["#modal-section", "#column-add-modal-section", "#clear-modal-section", "#warning-modal"]);

/** 카드 삭제 관련 모달을 띄워줍니다. */
const turnOnModal = () => $modalSection.style.display = DISPLAY.FLEX;

/** 카드 삭제 관련 모달을 숨겨줍니다. */
const turnOffModal = () => $modalSection.style.display = DISPLAY.NONE; 

/** column 추가 관련 모달을 띄워줍니다. */
const turnOnColumnAddModal = () => $columnAddModal.style.display = DISPLAY.FLEX;

/** column 추가 관련 모달을 숨겨줍니다. */
const turnOffColumnAddModal = () => $columnAddModal.style.display = DISPLAY.NONE;

/** 검색 modal을 숨겨줍니다. */
const turnOffSearchModal = () => changeCSS($searchModal, "display", DISPLAY.NONE);

/** card clear modal을 숨겨줍니다. */
const turnOffCardClearModal = () => changeCSS($cardClearModal, "display", DISPLAY.NONE);

/** card clear modal을 보여줍니다. */
const turnOnCardClearModal = () => changeCSS($cardClearModal, "display", DISPLAY.FLEX);

/** 경고 modal을 1초간 보여줍니다. */
function showWarningModal() {
    $warningModal.style.display = DISPLAY.FLEX;
    setTimeout(() => $warningModal.style.display = DISPLAY.NONE, ONE_SECOND)
}

export { 
    turnOnModal, turnOnColumnAddModal, turnOffSearchModal,
    turnOnCardClearModal, turnOffCardClearModal, turnOffModal, turnOffColumnAddModal, showWarningModal
 }