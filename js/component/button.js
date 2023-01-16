import { changeCSS } from "../common/commonFunction.js";
import {
    POSITION_BOTTOM, TRANSFORM,
    FAB_BTN_DEGREE_ORIGINAL, FAB_BTNS_BOTTOM_ORIGINAL, 
    FAB_BTN_DEGREE_MOVED, GO_SEARCH_BTN_MOVED, GO_COLUMN_ADD_BTN_MOVED, GO_CLEAR_BTN_MOVED,
    CLICK, RIGHT, MENU_MOVE_DISTANCE, DISPLAY_FLEX 
} from "../common/commonVariable.js";
import { deleteAllCards, findCardTitle, deleteCard, chosenCard } from "./card.js";
import { findCardHeaderName, addColumn } from "./column.js";
import { menuBar, menuLogDelete, menuLogTimeUpdate } from "./menu.js";
import { 
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal, turnOffModal, turnOffColumnAddModal, turnOffSearchModal
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { validateStatus } from "../json_data/json_data.js";
import { 
    showSuggestedLog, searchModal , searchInput, searchCard
} from "../search/search.js";

// 검색 관련 버튼
const searchCancelBtn = querySelector("#search-cancel-btn");
const searchAcceptBtn = querySelector("#search-accept-btn");

// column 생성 관련 버튼
const columnAddModalCancelBtn = querySelector("#column-add-cancel-btn");
const columnAddModalAcceptBtn = querySelector("#column-add-accept-btn");

// 카드 삭제 모달 관련 버튼
const modalDeleteBtn = querySelector("#card-delete-btn");
const modalCancelBtn = querySelector("#card-cancel-btn");

// 모든 카드 삭제 관련 버튼
const goCardClearModalBtn = querySelector("#go-card-clear-btn");
const cardClearModalCancelBtn = querySelector("#clear-cancel-btn");
const cardClearModalAcceptBtn = querySelector("#clear-accept-btn");

// fab 버튼
const fabBtn = querySelector("#fab-btn");
const goColumnAddModalBtn = querySelector("#go-column-add-modal-btn");
const goSearchModalBtn = querySelector("#go-search-btn");
const goClearBtn = querySelector("#go-card-clear-btn");

// 메뉴 버튼
const menuOpenBtn = querySelector("#menu-open-btn");
const menuCloseBtn = querySelector("#menu-close-btn");

// card clear 버튼들에 이벤트를 추가합니다.
function addEventToCardClearBtns() {
    goCardClearModalBtn.addEventListener(CLICK, turnOnCardClearModal)
    cardClearModalCancelBtn.addEventListener(CLICK, turnOffCardClearModal)
    cardClearModalAcceptBtn.addEventListener(CLICK, () => {
        deleteAllCards();
        turnOffCardClearModal();
    })
}

// 검색 모달의 검색 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchAcceptBtn() {
    searchAcceptBtn.addEventListener(CLICK, () => {
        turnOffSearchModal();
        searchCard(searchInput.value)
        searchInput.value = "";
    })
}

// fab 버튼을 토글합니다.
function toggleFabBtn() {
    if(goColumnAddModalBtn.style.bottom == "21%") {
        changeCSS(fabBtn, TRANSFORM, FAB_BTN_DEGREE_ORIGINAL)
        changeCSS(goClearBtn, POSITION_BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
        changeCSS(goColumnAddModalBtn, POSITION_BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
        changeCSS(goSearchModalBtn, POSITION_BOTTOM, FAB_BTNS_BOTTOM_ORIGINAL);
    }
    else {
        changeCSS(fabBtn, TRANSFORM, FAB_BTN_DEGREE_MOVED)
        changeCSS(goSearchModalBtn, POSITION_BOTTOM, GO_SEARCH_BTN_MOVED);
        changeCSS(goColumnAddModalBtn, POSITION_BOTTOM, GO_COLUMN_ADD_BTN_MOVED);
        changeCSS(goClearBtn, POSITION_BOTTOM, GO_CLEAR_BTN_MOVED);
    }
}

// fab 버튼에 클릭 이벤트를 추가합니다.
function addEventToFabBtn() {
    fabBtn.addEventListener(CLICK, toggleFabBtn);

    // Fab에 숨겨진 버튼들에 event를 추가합니다.
    addEventToSearchBtn();
    addEventToSearchCancelBtn();
    addEventToSearchAcceptBtn();
    addEventToCardClearBtns();
}

// 검색 모달의 취소 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchCancelBtn() {
    searchCancelBtn.addEventListener(CLICK, turnOffSearchModal);
}

// 검색 모달을 띄워주는 클릭 이벤트를 추가합니다.
function addEventToSearchBtn() {
    goSearchModalBtn.addEventListener(CLICK, () => {
        changeCSS(searchModal, "display", DISPLAY_FLEX);
        showSuggestedLog();
    })
}

// menu toggle 이벤트 추가
function addEventToMenuBtns() {
    menuOpenBtn.addEventListener(CLICK, () => { 
        changeCSS(menuBar, RIGHT, 0);
        menuLogTimeUpdate();
    })
    menuCloseBtn.addEventListener(CLICK, () => { changeCSS(menuBar, RIGHT, MENU_MOVE_DISTANCE) })
}

// modal 버튼에 이벤트를 추가합니다.
function addEventToModalButtons() {
    // card modal 버튼들 이벤트 추가
    modalDeleteBtn.addEventListener(CLICK, () => {
        const headerTitle = findCardTitle(chosenCard);
        const content = findCardHeaderName(chosenCard);
        menuLogDelete(headerTitle, content);
        deleteCard(chosenCard);
        turnOffModal();
    })

    modalCancelBtn.addEventListener(CLICK, turnOffModal);
}

// column 추가 관련 버튼들에 이벤트를 추가합니다.
function addEventToColumnAddButton() {
    // columnnn
    goColumnAddModalBtn.addEventListener(CLICK, turnOnColumnAddModal)

    // column add modal 버튼들 이벤트 추가
    columnAddModalCancelBtn.addEventListener(CLICK, turnOffColumnAddModal);
    columnAddModalAcceptBtn.addEventListener(CLICK, () => {
        let columnAddInput = querySelector("#column-add-input");
        
        // 중복되는 status가 없을 경우에만 column 추가
        if(validateStatus(columnAddInput.value)) {
            addColumn(columnAddInput.value);
            turnOffColumnAddModal();
        }
        else {
            columnAddInput.value = "";
            alert("이미 존재하는 column 입니다.")
        }
    })
}

export {
    fabBtn,
    goColumnAddModalBtn, goSearchModalBtn, goClearBtn,
    columnAddModalCancelBtn, columnAddModalAcceptBtn,
    modalDeleteBtn, modalCancelBtn,
    addEventToCardClearBtns, addEventToSearchBtn,
    addEventToFabBtn, addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton
}