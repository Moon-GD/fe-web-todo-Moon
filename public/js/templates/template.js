import { addEvent } from "../common/commonFunction.js";
import { EVENT, STATUS, CARD_ID } from "../common/commonVariable.js";
import { eventToUndoButton } from "../component/button.js";
import {
    eventToNewCardButton, eventToCardDeleteButton,
    eventToMakeCardCancelButton, eventToMakeNewCardButton,
    resizeCardByInputBox, doubleClickEventToCard, parseCardContentByNewLine
} from "../component/card.js";
import { $mainTag, columnDeleteEvent, headerDoubleClickEvent, inputFocusOutEvent } from "../component/column.js";
import {
    recordElapsedTimeOnTarget, eventToTimeNode, getElapsedTimeByTimeArray,
    timeStringToArray, saveTimeStringOnTimeNode
} from "../component/menu/menuLogTime.js";
import { eventToCard } from "../drag/addDragEvent.js";
import { makeShadedNode } from "../drag/dragEffect.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "../search/searchLogManager.js";
import { statusListOnLocal, cardListOnLocal, menuListOnLocal } from "../store/store.js";
import { menuJSONTemplateForMatter } from "../../../server/menu/menuJSONFormatter.js";

/** 초기 데이터를 템플릿으로 구성합니다. */
function initialDataToTemplate() {
    statusListOnLocal.forEach(({id: statusID, statusName}) => {
        const $newColumn = columnTemplate(statusName, statusID, cardListOnLocal[statusID].length);
        const $cardArea = $newColumn.querySelector("article");

        cardListOnLocal[statusID].forEach((cardData) => {
            let $newCard = cardTemplate(cardData.title, cardData.content, cardData.author, cardData[CARD_ID]);
            eventToCard($newCard);
            $cardArea.appendChild($newCard);
        })

        $mainTag.appendChild($newColumn);
    })

    const $menuContent = querySelector("#menu-content");
    menuListOnLocal.forEach((menuJSON) => $menuContent.prepend(menuJSONTemplateForMatter(menuJSON)))
}

/** column 템플릿을 반환합니다. */
function columnTemplate(columnTitle, columnID, cardCount = 0) {
    let $column = document.createElement("section");
    $column.classList.add("column")
    $column.setAttribute(STATUS.ID, `${columnID}`);

    $column.innerHTML = `
            <h3>
                <span>${columnTitle}</span>
                <span class="column-length">${cardCount}</span>
                <div class="column-button-area">
                    <i class="card-add-button fa-solid fa-plus"></i>
                    <i class="column-delete-button fa-solid fa-xmark"></i>
                </div>
            </h3>
            <article>
            </article>
        `;

    const $cardAddButton = $column.querySelector(".card-add-button");
    const $columnDeleteButton = $column.querySelector(".column-delete-button");
    const $header = $column.querySelector("h3");
    const $article = $column.querySelector("article");

    addEvent($header, [
        (event) => event.preventDefault,
        () => $article.prepend(makeShadedNode())
    ], EVENT.DRAG_OVER);

    addEvent($article, [
        (event) => {
            if ($article.children.length) return;

            event.preventDefault();
            $article.appendChild(makeShadedNode());
        }
    ], EVENT.DRAG_OVER);

    columnDeleteEvent($columnDeleteButton, $column);
    eventToNewCardButton($cardAddButton, $column.children[1]);
    headerDoubleClickEvent($header);

    return $column;
}

/** 카드 템플릿을 반환합니다. */
function cardTemplate(cardTitle, cardContent, cardAuthor, cardId) {
    const $card = document.createElement("div");
    $card.classList.add("card-frame");
    $card.setAttribute("draggable", "true");
    $card.setAttribute(CARD_ID, cardId);
    cardContent = parseCardContentByNewLine(cardContent);
    $card.innerHTML = `
        <h3 class="card-title">${cardTitle}
            <i class="fa-solid fa-xmark"></i>
        </h3>
        <h4 class="card-content" style="word-break: break-word;">${cardContent}</h4>
        <h5 class="card-author">${cardAuthor === "" ? "author by web" : cardAuthor}</h5>
    `;

    doubleClickEventToCard($card);

    const $cardDeleteButton = $card.querySelector("i");
    eventToCardDeleteButton($cardDeleteButton, $card);

    return $card;
}

/** 카드 등록 템플릿을 반환합니다. */
function newCardTemplate(title = "", content = "", prevCard = "", isUpdated = false) {
    const $newCard = document.createElement("div");
    $newCard.classList.add("new-card-frame");

    $newCard.innerHTML = `
        <input type="text" placeholder="제목을 입력하세요" value='${title}'>
        <textarea cols="30" rows="20" maxlength="500" placeholder="내용을 입력하세요">${content}</textarea>
        <div class="new-card-button-area">
            <button id="new-card-cancel-button">취소</button>
            <button id="new-card-register-button">등록</button>
        </div>
    `;

    const $newCancelButton = $newCard.querySelector("#new-card-cancel-button");
    const $newRegisterButton = $newCard.querySelector("#new-card-register-button");
    const $textArea = $newCard.querySelector("textarea");

    eventToMakeCardCancelButton($newCancelButton, $newCard, prevCard, isUpdated);
    eventToMakeNewCardButton($newRegisterButton, $newCard, prevCard, isUpdated);
    resizeCardByInputBox($textArea, $newCard);

    return $newCard;
}

/** 메뉴 log 템플릿을 반환합니다. (add) */
function menuLogAddTemplate(columnName, cardTitle, actionTimeString = "", emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${columnName}</strong>에 
                <strong>${cardTitle}</strong>
                을/를 등록하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete) */
function menuLogDeleteTemplate(columnName, cardTitle, cardContent, actionTimeString = "", isRecovered = false, emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");
    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
            <div class="log-content-area">
            <h4 class="log-author">
                <span>${author}</span>
                <i class="fa-solid fa-arrow-rotate-left undo-button"></i>
            </h4>
            <h4 class="log-content">
                <strong>${columnName}</strong>에서
                <strong>${cardTitle}</strong>
                을/를 삭제하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    const $undoButton = $menuFrame.querySelector(".undo-button");

    if (isRecovered) $undoButton.remove();
    else eventToUndoButton($undoButton, columnName, cardTitle, cardContent, author);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete all) */
function menuLogDeleteAllTemplate(actionTimeString = "", emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>모든 카드를 삭제하였습니다.</strong>
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (move) */
function menuLogMoveTemplate(prevColumnName, nextColumnName, cardTitle, actionTimeString = "", emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${cardTitle}</strong>을/를
                <strong>${prevColumnName}</strong>에서
                <strong>${nextColumnName}</strong>
                로 이동하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");
    eventToTimeNode($timeNode);

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (update) */
function menuLogUpdateTemplate(columnName, cardTitle, actionTimeString = "", emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${columnName}</strong>의
                <strong>${cardTitle}</strong>
                을/를 수정하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div class="log-time">
    `

    const $timeNode = $menuFrame.querySelector(".log-time");

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (search) */
function menuSearchTemplate(searchLog, searchCount = 0, actionTimeString = "", emotion = "🥳", author = "@sam") {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                최근 검색어 : <strong>${searchLog}</strong>
            </h4>
            <h4 class="log-content">검색 횟수 : 
                <strong>${searchCount ? searchCount : searchLogManger.getSearchCount(searchLog)} </strong>
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    if (actionTimeString) {
        saveTimeStringOnTimeNode($timeNode, actionTimeString);
        const timeArray = timeStringToArray(actionTimeString);
        $timeNode.innerHTML = getElapsedTimeByTimeArray(timeArray);
    } else recordElapsedTimeOnTarget($timeNode);

    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** column header 템플릿을 반환합니다. */
function headerTitleTemplate(title, $originalHeader) {
    const $header = document.createElement("h3");
    const $input = document.createElement("input");

    $input.setAttribute("type", "text");
    $input.setAttribute("placeholder", "제목을 입력해주세요.");
    $input.setAttribute("maxlength", "10");
    $input.value = title;

    setTimeout(() => {
        $input.focus();
    }, 0)

    inputFocusOutEvent($input, title, $originalHeader);

    $header.appendChild($input);

    return $header;
}

export {
    initialDataToTemplate,
    columnTemplate, cardTemplate, newCardTemplate,
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, menuSearchTemplate,
    headerTitleTemplate, menuLogDeleteAllTemplate
}