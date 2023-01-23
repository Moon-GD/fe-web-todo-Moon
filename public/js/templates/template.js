import { EVENT, STATUS, CARD_ID } from "../common/commonVariable.js";
import { eventToNewCardBtn, eventToCardDeleteBtn, 
    eventToMakeCardCancelBtn, eventToMakeNewCardBtn,
    resizeCardByInputBox, doubleClickEventToCard, parseCardContentByNewLine
} from "../component/card.js";
import { $mainTag, columnDeleteEvent, headerDoubleClickEvent, inputFocusOutEvent } from "../component/column.js";
import { makeShadedNode } from "../drag/dragEffect.js";
import { eventToCard } from "../drag/addDragEvent.js";
import { searchLogManger } from "../search/searchLogManager.js";
import { 
    timeToStringFormat, timeStringToArray, 
    getElapsedTime, saveTimeStringOnTimeNode, eventToTimeNode
} from "../component/menu/menuLogTime.js";
import { statusListOnLocal, cardListOnLocal } from "../store/store.js";
import { addEvent, pipe } from "../common/commonFunction.js";

/** 초기 데이터를 템플릿으로 구성합니다. */
function initialDataToTemplate() {
    statusListOnLocal.forEach(({id: statusID, statusName}) => {
        let $newColumn = columnTemplate(statusName, statusID, cardListOnLocal[statusID].length);
        let $cardArea = $newColumn.querySelector("article");

        cardListOnLocal[statusID].forEach((cardData) => {
            let $newCard = cardTemplate(cardData.title, cardData.content, cardData.author, cardData[CARD_ID]);
            eventToCard($newCard);
            $cardArea.appendChild($newCard);
        })    

        $mainTag.appendChild($newColumn);
    })
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
                <div class="column-btn-area">
                    <i class="card-add-btn fa-solid fa-plus"></i>
                    <i class="column-delete-btn fa-solid fa-xmark"></i>
                </div>
            </h3>
            <article>
            </article>
        `;

    const $cardAddBtn = $column.querySelector(".card-add-btn");
    const $columnDeleteBtn = $column.querySelector(".column-delete-btn");
    const $header = $column.querySelector("h3");
    const $article = $column.querySelector("article");

    addEvent($header, [
        (event) => event.preventDefault,
        () => $article.prepend(makeShadedNode())
    ], EVENT.DRAG_OVER);

    addEvent($article, [
        (event) => {
            if($article.children.length) return;
        
            event.preventDefault();
            $article.appendChild(makeShadedNode());
        }
    ], EVENT.DRAG_OVER);

    columnDeleteEvent($columnDeleteBtn, $column);
    eventToNewCardBtn($cardAddBtn, $column.children[1]);
    headerDoubleClickEvent($header);

    return $column;
}

/** 카드 템플릿을 반환합니다. */
function cardTemplate(cardTitle, cardContent, cardAuthor, cardId) {
    const $card = document.createElement("div");
    $card.classList.add("card-frame");
    $card.setAttribute("draggable", true);
    $card.setAttribute(CARD_ID, cardId);
    cardContent = parseCardContentByNewLine(cardContent); 
    $card.innerHTML = `
        <h3 class="card-title">${cardTitle}
            <i class="fa-solid fa-xmark"></i>
        </h3>
        <h4 class="card-content" style="word-break: break-word;">${cardContent}</h4>
        <h5 class="card-author">${cardAuthor == "" ? "author by web" : cardAuthor}</h5>
    `;

    doubleClickEventToCard($card);

    const $cardDeleteBtn = $card.querySelector("i");
    eventToCardDeleteBtn($cardDeleteBtn, $card);

    return $card;
}

/** 카드 등록 템플릿을 반환합니다. */
function newCardTemplate(title = "", content = "", prevCard="", isUpdated=false) {
    const $newCard = document.createElement("div");
    $newCard.classList.add("new-card-frame");

    $newCard.innerHTML = `
        <input type="text" placeholder="제목을 입력하세요" value='${title}'>
        <textarea cols="30" rows="20" maxlength="500" placeholder="내용을 입력하세요">${content}</textarea>
        <div class="new-card-button-area">
            <button id="new-card-cancel-btn">취소</button>
            <button id="new-card-register-btn">등록</button>
        </div>
    `;

    const $newCancelBtn = $newCard.querySelector("#new-card-cancel-btn");
    const $newRegisterBtn = $newCard.querySelector("#new-card-register-btn");
    const $textArea = $newCard.querySelector("textarea");

    eventToMakeCardCancelBtn($newCancelBtn, $newCard, prevCard, isUpdated);
    eventToMakeNewCardBtn($newRegisterBtn, $newCard, prevCard, isUpdated);
    resizeCardByInputBox($textArea, $newCard);

    return $newCard;
}

/** 메뉴 log 템플릿을 반환합니다. (add) */
function menuLogAddTemplate(content, status, emotion, author) {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${status}</strong>에 
                <strong>${content}</strong>
                을/를 등록하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete) */
function menuLogDeleteTemplate(content, status, emotion, author) {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${status}</strong>에서
                <strong>${content}</strong>
                을/를 삭제하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete all) */
function menuLogDeleteAllTemplate(emotion, author) {
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

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (move) */
function menuLogMoveTemplate(title, prevColumnName, nextColumnName, emotion, author) {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${title}</strong>을/를
                <strong>${prevColumnName}</strong>에서
                <strong>${nextColumnName}</strong>
                로 이동하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}
 
/** 메뉴 log 템플릿을 반환합니다. (update) */
function menuLogUpdateTemplate(title, status, emotion, author) {
    const $menuFrame = document.createElement("div");
    $menuFrame.classList.add("log-frame");

    $menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${ statusListOnLocal[status][STATUS.NAME] }</strong>의
                <strong>${title}</strong>
                을/를 수정하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div class="log-time">
    `

    const $timeNode = $menuFrame.querySelector(".log-time");

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (search) */
function menuSearchTemplate(searchLog, emotion, author) {
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
                <strong>${searchLogManger.getSearchCount(searchLog)} </strong>
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `;

    const $timeNode = $menuFrame.querySelector(".log-time");

    pipe(
        (currnetTime) => timeToStringFormat(currnetTime),
        (timeString) => {
            saveTimeStringOnTimeNode($timeNode, timeString);
            return timeStringToArray(timeString);
        },
        (timeArray) => getElapsedTime(timeArray),
        (timeDiff) => $timeNode.textContent = timeDiff
    )(new Date())

    // 시간 노드에 event 추가
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