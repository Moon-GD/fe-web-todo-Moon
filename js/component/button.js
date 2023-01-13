import { changeCSS } from "../common/commonFunction.js";
import { CLICK, RIGHT, MENU_MOVE_DISTANCE } from "../common/commonVariable.js";
import { deleteAllCards, findCardTitle, deleteCard, chosenCard } from "./card.js";
import { findCardHeaderName, addColumn } from "./column.js";
import { menuBar, menuLogDelete } from "./menu.js";
import { 
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal, turnOffModal, turnOffColumnAddModal 
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { validateStatus } from "../json_data/json_data.js";
import { addEventToSearchBtn, addEventToSearchCancelBtn, addEventToSearchAcceptBtn } from "../search/search.js";

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

// fab 버튼을 토글합니다.
function toggleFabBtn() {
    if(goColumnAddModalBtn.style.bottom == "21%") {
        changeCSS(fabBtn, "transform", "rotate(0deg)")
        changeCSS(goClearBtn, "bottom", "5%");
        changeCSS(goColumnAddModalBtn, "bottom", "5%");
        changeCSS(goSearchModalBtn, "bottom", "5%");
    }
    else {
        changeCSS(fabBtn, "transform", "rotate(-45deg)")
        changeCSS(goClearBtn, "bottom", "29%");
        changeCSS(goColumnAddModalBtn, "bottom", "21%");
        changeCSS(goSearchModalBtn, "bottom", "13%");
    }
}

// fab 버튼에 클릭 이벤트를 추가합니다.
function addEventToFabBtn() {
    fabBtn.addEventListener(CLICK, () => {
        toggleFabBtn();
    })

    // Fab에 숨겨진 버튼들에 event를 추가합니다.
    addEventToSearchBtn();
    addEventToSearchCancelBtn();
    addEventToSearchAcceptBtn();
    addEventToCardClearBtns();

    // fab 버튼의 column add event를 추가합니다.
    goColumnAddModalBtn.addEventListener(CLICK, () => { turnOnColumnAddModal(); })

    // fab 버튼의 휴지통 버튼에 event를 추가합니다.
    goClearBtn.addEventListener(CLICK, () => {})
}

// menu toggle 이벤트 추가
function addEventToMenuBtns() {
    menuOpenBtn.addEventListener(CLICK, () => { changeCSS(menuBar, RIGHT, 0) })
    menuCloseBtn.addEventListener(CLICK, () => { changeCSS(menuBar, RIGHT, MENU_MOVE_DISTANCE) })
}

// modal 버튼에 이벤트를 추가합니다.
function addEventToModalButtons() {
    // card modal 버튼들 이벤트 추가
    modalDeleteBtn.addEventListener(CLICK, () => {
        const headerTitle = findCardTitle(chosenCard);
        const content = findCardHeaderName(chosenCard);
        menuLogDelete(headerTitle, content)
        deleteCard(chosenCard);
        turnOffModal();
    })

    modalCancelBtn.addEventListener(CLICK, () => { turnOffModal(); })
}

// column 추가 이벤트를 추가합니다.
function addEventToColumnAddButton() {
    // column add modal 버튼들 이벤트 추가
    columnAddModalCancelBtn.addEventListener(CLICK, () => { turnOffColumnAddModal(); })
    columnAddModalAcceptBtn.addEventListener(CLICK, () => {
        let columnAddInput = querySelector("#column-add-input");
        
        // 중복되는 status가 없을 경우에만 column 추가
        if(validateStatus(columnAddInput.value)) {
            addColumn(columnAddInput.value);
            turnOffColumnAddModal();
        }
        else {
            columnAddInput.value = "";
            alert("이미 존재하는 status 입니다.")
        }
    })
}

export {
    fabBtn,
    goColumnAddModalBtn, goSearchModalBtn, goClearBtn,
    columnAddModalCancelBtn, columnAddModalAcceptBtn,
    modalDeleteBtn, modalCancelBtn,
    addEventToCardClearBtns,
    addEventToFabBtn, addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton
}