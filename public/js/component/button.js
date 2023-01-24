import { addChildAfterParent, addEvent, changeCSS } from "../common/commonFunction.js";
import {
    POSITION, TRANSFORM, FAB_BTN, BTN_MOVDED,
    MENU_POSITION, DISPLAY, STATUS 
} from "../common/commonVariable.js";
import { deleteAllCards, findCardTitle, deleteCard, $chosenCard } from "./card.js";
import { findCardHeaderName, addColumn, findColumnStatusByCard } from "./column.js";
import { $menuBar, menuLogDelete, menuLogTimeUpdate } from "./menu/menu.js";
import { 
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal, 
    turnOffModal, turnOffColumnAddModal, turnOffSearchModal, showWarningModal
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { showSuggestedLog, $searchModal , $searchInput, searchCard } from "../search/search.js";
import { validateStatus } from "../../../server/column/validation.js";
import { menuListOnLocal, statusListOnLocal } from "../store/store.js";
import { cardTemplate } from "../templates/template.js";
import { idGenerator } from "../common/IDGenerator.js";
import { addCardJSON } from "../../../server/card/post.js";

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
    $cardClearCancel: querySelector("#clear-cancel-btn"),
    $cardClearAccept: querySelector("#clear-accept-btn"),

    // fab 버튼
    $fab: querySelector("#fab-btn"),
    $goColumnAddModal: querySelector("#go-column-add-modal-btn"),
    $goSearchModal: querySelector("#go-search-btn"),
    $goClear: querySelector("#go-card-clear-btn"),

    // 메뉴 버튼
    $menuOpen: querySelector("#menu-open-btn"),
    $menuClose: querySelector("#menu-close-btn")
};

/** 카드 모두 지우기 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToCardClearBtns() {
    addEvent($Btns.$goClear, [turnOnCardClearModal]);

    addEvent($Btns.$cardClearCancel, [turnOffCardClearModal]);

    addEvent($Btns.$cardClearAccept, [
        () => deleteAllCards(),
        () => turnOffCardClearModal()
    ]);
}

/** 카드 검색 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToSearchBtn() {
    addEvent($Btns.$goSearchModal, [
        () => changeCSS($searchModal, "display", DISPLAY.FLEX),
        () => showSuggestedLog()
    ]);
    
    addEvent($Btns.$searchCancel, [turnOffSearchModal]);
    addEvent($Btns.$searchAccept, [
        () => turnOffSearchModal(),
        () => searchCard($searchInput.value),
        () => $searchInput.value = ""
    ]);
}

/** column 추가 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToColumnAddBtn() {
    addEvent($Btns.$goColumnAddModal, [turnOnColumnAddModal])
    addEvent($Btns.$columnAddCancel, [turnOffColumnAddModal])
    addEvent($Btns.$columnAddAccept, [
        () => {
            if(validateStatus($columnAddInput.value)) {
                addColumn($columnAddInput.value);
                turnOffColumnAddModal();
            }
            else {
                $columnAddInput.value = "";
                showWarningModal();
            }
        }
    ])
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
        changeCSS($Btns.$goClear, POSITION.BOTTOM, BTN_MOVDED.CARD_CLEAR);
        changeCSS($Btns.$goSearchModal, POSITION.BOTTOM, BTN_MOVDED.SEARCH);
        changeCSS($Btns.$goColumnAddModal, POSITION.BOTTOM, BTN_MOVDED.COLUMN_ADD);
    }
}

/** fab 버튼 및 속해 있는 버튼들에 이벤트를 등록합니다. */
function eventToFabBtn() {
    addEvent($Btns.$fab, [toggleFabBtn]);
    eventToCardClearBtns();
    eventToSearchBtn();
    eventToColumnAddBtn();
}

/** 메뉴 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToMenuBtns() {
    addEvent($Btns.$menuOpen, [
        () => menuLogTimeUpdate(),
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.VISIBLE)
    ])

    addEvent($Btns.$menuClose, [
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.HIDDEN),
    ])
}

/** 카드 삭제 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToModalButtons() {
    addEvent($Btns.$modalDelete, [
        () => turnOffModal(),
        () => menuLogDelete(
                findCardHeaderName($chosenCard), findCardTitle($chosenCard), $chosenCard.querySelector(".card-content").innerHTML
            ),
        () => deleteCard($chosenCard)
    ])

    addEvent($Btns.$modalCancel, [turnOffModal]);
}

function eventToUndoBtn($undoBtn, columnName, cardTitle, cardContent, author) {
    const columnID = statusListOnLocal.filter((column) => column && column.statusName == columnName)[0][STATUS.ID];
    
    if(columnID) {
        const $undoCard = cardTemplate(cardTitle, cardContent, author, idGenerator.createCardID());
        const $undoColumn = querySelector(`.column#${columnID}`);
        const $article = $undoColumn.querySelector("article");
        addEvent($undoBtn, [
            () => $article.prepend($undoCard),
            () => $undoBtn.remove(),
            () => addCardJSON(findColumnStatusByCard($undoCard), cardTitle, cardContent, $undoCard.id),
            () => {
                menuListOnLocal.forEach((menu) => {
                })
            }
        ]);
    }
}

export { $Btns, eventToFabBtn, eventToMenuBtns, eventToModalButtons, eventToUndoBtn }