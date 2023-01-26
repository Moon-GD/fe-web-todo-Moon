import { addEvent, changeCSS } from "../common/commonFunction.js";
import {
    POSITION, TRANSFORM, FAB_BUTTON, BUTTON_MOVED_POSITION,
    MENU_POSITION, DISPLAY, STATUS, MENU_ACTION
} from "../common/commonVariable.js";
import { idGenerator } from "../common/IDGenerator.js";
import { $menuBar, menuLogDelete, menuLogTimeUpdate } from "./menu/menu.js";
import { deleteAllCards, findCardTitle, deleteCard, $chosenCard } from "./card.js";
import { findCardHeaderName, addColumn, findColumnStatusByCard } from "./column.js";
import {
    turnOnCardClearModal, turnOffCardClearModal, turnOnColumnAddModal,
    turnOffModal, turnOffColumnAddModal, turnOffSearchModal, showWarningModal
} from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { showSuggestedLog, $searchModal, $searchInput, searchCard } from "../search/search.js";
import { menuListOnLocal, statusListOnLocal } from "../store/store.js";
import { cardTemplate } from "../templates/template.js";
import { addCardJSON } from "../../../server/card/post.js";
import { validateStatus } from "../../../server/column/validation.js";
import { uploadRecoverInfoOnServer } from "../../../server/menu/patch.js";

const $columnAddInput = querySelector("#column-add-input");
const $Buttons = {
    // 검색 관련 버튼
    $searchCancel: querySelector("#search-cancel-button"),
    $searchAccept: querySelector("#search-accept-button"),

    // column 생성 관련 버튼
    $columnAddCancel: querySelector("#column-add-cancel-button"),
    $columnAddAccept: querySelector("#column-add-accept-button"),

    // 카드 삭제 모달 관련 버튼
    $modalDelete: querySelector("#card-delete-button"),
    $modalCancel: querySelector("#card-cancel-button"),

    // 모든 카드 삭제 관련 버튼
    $cardClearCancel: querySelector("#clear-cancel-button"),
    $cardClearAccept: querySelector("#clear-accept-button"),

    // fab 버튼
    $fab: querySelector("#fab-button"),
    $goColumnAddModal: querySelector("#go-column-add-modal-button"),
    $goSearchModal: querySelector("#go-search-button"),
    $goClear: querySelector("#go-card-clear-button"),

    // 메뉴 버튼
    $menuOpen: querySelector("#menu-open-button"),
    $menuClose: querySelector("#menu-close-button")
};

/** 카드 모두 지우기 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToCardClearButtons() {
    addEvent($Buttons.$goClear, [turnOnCardClearModal]);
    addEvent($Buttons.$cardClearCancel, [turnOffCardClearModal]);
    addEvent($Buttons.$cardClearAccept, [
        () => deleteAllCards(),
        () => turnOffCardClearModal()
    ]);
}

/** 카드 검색 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToSearchButton() {
    addEvent($Buttons.$goSearchModal, [
        () => changeCSS($searchModal, "display", DISPLAY.FLEX),
        () => showSuggestedLog()
    ]);

    addEvent($Buttons.$searchCancel, [turnOffSearchModal]);
    addEvent($Buttons.$searchAccept, [
        () => turnOffSearchModal(),
        () => searchCard($searchInput.value),
        () => $searchInput.value = ""
    ]);
}

/** column 추가 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToColumnAddButton() {
    addEvent($Buttons.$goColumnAddModal, [turnOnColumnAddModal])
    addEvent($Buttons.$columnAddCancel, [turnOffColumnAddModal])
    addEvent($Buttons.$columnAddAccept, [
        () => {
            if (validateStatus($columnAddInput.value)) {
                addColumn($columnAddInput.value);
                turnOffColumnAddModal();
            } else {
                $columnAddInput.value = "";
                showWarningModal();
            }
        }
    ])
}

function toggleFabButton() {
    if ($Buttons.$goColumnAddModal.style.bottom === BUTTON_MOVED_POSITION.COLUMN_ADD) {
        changeCSS($Buttons.$fab, TRANSFORM, FAB_BUTTON.DEGREE_ORIGINAL);
        changeCSS($Buttons.$goClear, POSITION.BOTTOM, FAB_BUTTON.BOTTOM_ORIGINAL);
        changeCSS($Buttons.$goColumnAddModal, POSITION.BOTTOM, FAB_BUTTON.BOTTOM_ORIGINAL);
        changeCSS($Buttons.$goSearchModal, POSITION.BOTTOM, FAB_BUTTON.BOTTOM_ORIGINAL);
    } else {
        changeCSS($Buttons.$fab, TRANSFORM, FAB_BUTTON.DEGREE_MOVED);
        changeCSS($Buttons.$goClear, POSITION.BOTTOM, BUTTON_MOVED_POSITION.CARD_CLEAR);
        changeCSS($Buttons.$goSearchModal, POSITION.BOTTOM, BUTTON_MOVED_POSITION.SEARCH);
        changeCSS($Buttons.$goColumnAddModal, POSITION.BOTTOM, BUTTON_MOVED_POSITION.COLUMN_ADD);
    }
}

/** fab 버튼 및 속해 있는 버튼들에 이벤트를 등록합니다. */
function eventToFabButton() {
    addEvent($Buttons.$fab, [toggleFabButton]);
    eventToCardClearButtons();
    eventToSearchButton();
    eventToColumnAddButton();
}

/** 메뉴 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToMenuButtons() {
    addEvent($Buttons.$menuOpen, [
        () => menuLogTimeUpdate(),
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.VISIBLE)
    ])
    addEvent($Buttons.$menuClose, [
        () => changeCSS($menuBar, POSITION.RIGHT, MENU_POSITION.HIDDEN),
    ])
}

/** 카드 삭제 관련 모든 버튼에 이벤트를 등록합니다. */
function eventToModalButtons() {
    addEvent($Buttons.$modalDelete, [
        () => turnOffModal(),
        () => menuLogDelete(
            findCardHeaderName($chosenCard), findCardTitle($chosenCard), $chosenCard.querySelector(".card-content").innerHTML
        ),
        () => deleteCard($chosenCard)
    ])
    addEvent($Buttons.$modalCancel, [turnOffModal]);
}

function eventToUndoButton($undoButton, columnName, cardTitle, cardContent, author) {
    const columnID = statusListOnLocal.filter((column) => column && column.statusName === columnName)[0][STATUS.ID];

    if (columnID) {
        const $undoCard = cardTemplate(cardTitle, cardContent, author, idGenerator.createCardID());
        const $undoColumn = querySelector(`.column#${columnID}`);
        const $article = $undoColumn.querySelector("article");
        addEvent($undoButton, [
            () => $article.prepend($undoCard),
            () => $undoButton.remove(),
            () => addCardJSON(findColumnStatusByCard($undoCard), cardTitle, cardContent, $undoCard.id),
            () => {
                for (let menuJSON of menuListOnLocal) {
                    if (menuJSON["action"] !== MENU_ACTION.DELETE) continue;
                    if (menuJSON["cardTitle"] === cardTitle && menuJSON["cardContent"] === cardContent) {
                        const menuID = menuJSON["id"];
                        uploadRecoverInfoOnServer(menuID);
                    }
                }
            }
        ]);
    }
}

export { $Buttons, eventToFabButton, eventToMenuButtons, eventToModalButtons, eventToUndoButton }