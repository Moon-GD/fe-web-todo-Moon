import { changeCSS } from "../common/commonFunction.js";
import {
    POSITION, TRANSFORM,
    FAB_BTN, 
    BTN_MOVDED,
    CLICK, MENU_MOVE_DISTANCE, DISPLAY 
} from "../common/commonVariable.js";
import { deleteAllCards, findCardTitle, deleteCard, $chosenCard } from "./card.js";
import { findCardHeaderName, addColumn } from "./column.js";
import { $menuBar, menuLogDelete, menuLogTimeUpdate } from "./menu/menu.js";
import { 
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal, 
    turnOffModal, turnOffColumnAddModal, turnOffSearchModal
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { 
    showSuggestedLog, $searchModal , $searchInput, searchCard
} from "../search/search.js";
import { validateStatus } from "../../../server/column/validate_column/validateColumn.js";

const $Btns = {
    // 검색 관련 버튼
    $searchCancelBtn: querySelector("#search-cancel-btn"), 
    $searchAcceptBtn: querySelector("#search-accept-btn"),

    // column 생성 관련 버튼
    $columnAddModalCancelBtn: querySelector("#column-add-cancel-btn"),
    $columnAddModalAcceptBtn: querySelector("#column-add-accept-btn"),

    // 카드 삭제 모달 관련 버튼
    $modalDeleteBtn: querySelector("#card-delete-btn"),
    $modalCancelBtn: querySelector("#card-cancel-btn"),

    // 모든 카드 삭제 관련 버튼
    $goCardClearModalBtn: querySelector("#go-card-clear-btn"),
    $cardClearModalCancelBtn: querySelector("#clear-cancel-btn"),
    $cardClearModalAcceptBtn: querySelector("#clear-accept-btn"),

    // fab 버튼
    $fabBtn: querySelector("#fab-btn"),
    $goColumnAddModalBtn: querySelector("#go-column-add-modal-btn"),
    $goSearchModalBtn: querySelector("#go-search-btn"),
    $goClearBtn: querySelector("#go-card-clear-btn"),

    // 메뉴 버튼
    $menuOpenBtn: querySelector("#menu-open-btn"),
    $menuCloseBtn: querySelector("#menu-close-btn")
};

/** card clear 버튼들에 이벤트를 추가합니다.  */
function eventToCardClearBtns() {
    const eventToCardClearModalBtn = () => $Btns.$goCardClearModalBtn.addEventListener(CLICK, turnOnCardClearModal);    
    const eventToCardClearCancelBtn = () => { $Btns.$cardClearModalCancelBtn.addEventListener(CLICK, turnOffCardClearModal); }
    const eventToCardClearAcceptBtn = () => { 
        $Btns.$cardClearModalAcceptBtn.addEventListener(CLICK, () => {
            deleteAllCards();
            turnOffCardClearModal();
        }) 
    }

    eventToCardClearModalBtn();
    eventToCardClearCancelBtn();
    eventToCardClearAcceptBtn();
}

/** 검색 취소 버튼에 클릭 이벤트를 추가합니다. */
function addEventToSearchCancelBtn() { $Btns.$searchCancelBtn.addEventListener(CLICK, turnOffSearchModal); }

/** 검색 수락 버튼에 클릭 이벤트를 추가합니다. */
function addEventToSearchAcceptBtn() {
    $Btns.$searchAcceptBtn.addEventListener(CLICK, () => {
        turnOffSearchModal();
        searchCard($searchInput.value);
        $searchInput.value = "";
    })
}

/** fab 버튼을 toggle 합니다. */
function toggleFabBtn() {
    if($Btns.$goColumnAddModalBtn.style.bottom == "21%") {
        changeCSS($Btns.$fabBtn, TRANSFORM, FAB_BTN.DEGREE_ORIGINAL);
        changeCSS($Btns.$goClearBtn, POSITION.BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
        changeCSS($Btns.$goColumnAddModalBtn, POSITION.BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
        changeCSS($Btns.$goSearchModalBtn, POSITION.BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
    }
    else {
        changeCSS($Btns.$fabBtn, TRANSFORM, FAB_BTN.DEGREE_MOVED);
        changeCSS($Btns.$goSearchModalBtn, POSITION.BOTTOM, BTN_MOVDED.SEARCH);
        changeCSS($Btns.$goColumnAddModalBtn, POSITION.BOTTOM, BTN_MOVDED.COLUMN_ADD);
        changeCSS($Btns.$goClearBtn, POSITION.BOTTOM, BTN_MOVDED.CARD_CLEAR);
    }
}

/** fab 버튼에 클릭 이벤트를 추가합니다. */
function addEventToFabBtn() {
    $Btns.$fabBtn.addEventListener(CLICK, toggleFabBtn);

    // Fab에 숨겨진 버튼들에 event를 추가합니다.
    addEventToSearchBtn();
    addEventToSearchCancelBtn();
    addEventToSearchAcceptBtn();
    eventToCardClearBtns();
}

/** 검색 모달을 띄워주는 버튼에 클릭 이벤트를 추가합니다. */
function addEventToSearchBtn() {
    $Btns.$goSearchModalBtn.addEventListener(CLICK, () => {
        changeCSS($searchModal, "display", DISPLAY.FLEX);
        showSuggestedLog();
    })
}

/** 사이드바에 toggle 이벤트를 추가합니다. */
function addEventToMenuBtns() {
    $Btns.$menuOpenBtn.addEventListener(CLICK, () => { 
        changeCSS($menuBar, POSITION.RIGHT, 0);
        menuLogTimeUpdate();
    })

    $Btns.$menuCloseBtn.addEventListener(CLICK, () => changeCSS($menuBar, POSITION.RIGHT, MENU_MOVE_DISTANCE))
}

/** 카드 삭제 관련 modal 버튼들에 이벤트를 추가합니다. */
function addEventToModalButtons() {
    // card modal 버튼들 이벤트 추가
    $Btns.$modalDeleteBtn.addEventListener(CLICK, () => {
        menuLogDelete(
            findCardTitle($chosenCard),
            findCardHeaderName($chosenCard)
        );
        deleteCard($chosenCard);
        turnOffModal();
    })

    $Btns.$modalCancelBtn.addEventListener(CLICK, turnOffModal);
}

/** column 추가 관련 버튼들에 클릭 이벤트를 추가합니다. */
function addEventToColumnAddButton() {
    $Btns.$goColumnAddModalBtn.addEventListener(CLICK, turnOnColumnAddModal);
    $Btns.$columnAddModalCancelBtn.addEventListener(CLICK, turnOffColumnAddModal);
    $Btns.$columnAddModalAcceptBtn.addEventListener(CLICK, () => {
        let $columnAddInput = querySelector("#column-add-input");
        
        if(validateStatus($columnAddInput.value)) {
            addColumn($columnAddInput.value);
            turnOffColumnAddModal();
        }
        else {
            $columnAddInput.value = "";
            alert("이미 존재하는 column 입니다.");
        }
    })
}

export {
    $Btns,
    addEventToSearchBtn,
    addEventToFabBtn, addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton
}