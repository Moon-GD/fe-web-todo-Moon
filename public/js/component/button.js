import { addEvent, changeCSS } from "../common/commonFunction.js";
import {
    POSITION, TRANSFORM, FAB_BTN, BTN_MOVDED,
    EVENT, MENU_POSITION, DISPLAY 
} from "../common/commonVariable.js";
import { deleteAllCards, findCardTitle, deleteCard, $chosenCard } from "./card.js";
import { findCardHeaderName, addColumn } from "./column.js";
import { $menuBar, menuLogDelete, menuLogTimeUpdate } from "./menu/menu.js";
import { 
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal, 
    turnOffModal, turnOffColumnAddModal, turnOffSearchModal, showWarningModal
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { showSuggestedLog, $searchModal , $searchInput, searchCard } from "../search/search.js";
import { validateStatus } from "../../../server/column/validation.js";

const $columnAddInput = querySelector("#column-add-input");
const $Btns = {
    // 검색 관련 버튼
    $searchCancel: querySelector("#search-cancel-btn"), 
    $searchAccept: querySelector("#search-accept-btn"),

    // column 생성 관련 버튼
    $columnAddCancel: querySelector("#column-add-cancel-btn"),
    $columnAddAccept: querySelector("#column-add-accept-btn"),

    // 카드 삭제 모달 관련 버튼
    $modalDelete: querySelector("#card-delete-btn"),
    $modalCancel: querySelector("#card-cancel-btn"),

    // 모든 카드 삭제 관련 버튼
    $goCardClearModal: querySelector("#go-card-clear-btn"),
    $cardClearCancel: querySelector("#clear-cancel-btn"),
    $cardClearAccept: querySelector("#clear-accept-btn"),

    // fab 버튼
    $fab: querySelector("#fab-btn"),
    $goColumnAddModal: querySelector("#go-column-add-modal-btn"),
    $goSearchModal: querySelector("#go-search-btn"),
    $goClear: querySelector("#go-card-clear-btn"),

    // 메뉴 버튼
    $goClear: querySelector("#menu-open-btn"),
    $menuClose: querySelector("#menu-close-btn")
};

function eventToCardClearBtns() {
    addEvent($Btns.$goCardClearModal, [
        () => turnOnCardClearModal
    ]);

    addEvent($Btns.$cardClearCancel, [
        () => turnOffCardClearModal
    ])

    addEvent($Btns.$cardClearAccept, [
        () => deleteAllCards(),
        () => turnOffCardClearModal()
    ])
}

function eventToSearchBtn() {
    $Btns.$goSearchModal.addEventListener(EVENT.CLICK, () => {
        changeCSS($searchModal, "display", DISPLAY.FLEX);
        showSuggestedLog();
    });
    $Btns.$searchCancel.addEventListener(EVENT.CLICK, turnOffSearchModal);
    $Btns.$searchAccept.addEventListener(EVENT.CLICK, () => {
        turnOffSearchModal();
        searchCard($searchInput.value);
        $searchInput.value = "";
    })
}

function eventToColumnAddBtn() {
    $Btns.$goColumnAddModal.addEventListener(EVENT.CLICK, turnOnColumnAddModal);
    $Btns.$columnAddCancel.addEventListener(EVENT.CLICK, turnOffColumnAddModal);
    $Btns.$columnAddAccept.addEventListener(EVENT.CLICK, () => {
        if(validateStatus($columnAddInput.value)) {
            addColumn($columnAddInput.value);
            turnOffColumnAddModal();
        }
        else {
            $columnAddInput.value = "";
            showWarningModal();
        }
    })
}

function toggleFabBtn() {
    if($Btns.$goColumnAddModal.style.bottom == "21%") {
        changeCSS($Btns.$fab, TRANSFORM, FAB_BTN.DEGREE_ORIGINAL);
        changeCSS($Btns.$goClear, POSITION.BOTTOM, FAB_BTN.BOTTOM_ORIGINAL);
        changeCSS($Btns.$goColumnAddModal, POSITION.BOTTOM, FAB_BTN.BOTTOM_ORIGINAL);
        changeCSS($Btns.$goSearchModal, POSITION.BOTTOM, FAB_BTN.BOTTOM_ORIGINAL );
    }
    else {
        changeCSS($Btns.$fab, TRANSFORM, FAB_BTN.DEGREE_MOVED);
        changeCSS($Btns.$goSearchModal, POSITION.BOTTOM, BTN_MOVDED.SEARCH);
        changeCSS($Btns.$goColumnAddModal, POSITION.BOTTOM, BTN_MOVDED.COLUMN_ADD);
        changeCSS($Btns.$goClear, POSITION.BOTTOM, BTN_MOVDED.CARD_CLEAR);
    }
}

function eventToFabBtn() {
    $Btns.$fab.addEventListener(EVENT.CLICK, toggleFabBtn);
    eventToCardClearBtns();
    eventToSearchBtn();
    eventToColumnAddBtn();
}

function eventToMenuBtns() {
    addEvent($Btns.$goClear, [
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.VISIBLE),
        () => menuLogTimeUpdate()
    ])

    addEvent($Btns.$menuClose, [
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.HIDDEN),
    ])
}

/** 카드 삭제 관련 modal 버튼들에 이벤트를 추가합니다. */
function eventToModalButtons() {
    addEvent($Btns.$modalDelete, [
        () => menuLogDelete(findCardTitle($chosenCard), findCardHeaderName($chosenCard)),
        () => deleteCard($chosenCard),
        () => turnOffModal
    ])

    addEvent($Btns.$modalCancel, [
        () => turnOffModal
    ]);
}

export {
    $Btns,
    eventToSearchBtn, eventToFabBtn, eventToMenuBtns, eventToModalButtons
}