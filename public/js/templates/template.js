import { EVENT, STATUS, CARD_ID } from "../common/commonVariable.js";
import { eventToNewCardBtn, eventToCardDeleteBtn, 
    eventToMakeCardCancelBtn, eventToMakeNewCardBtn,
    resizeCardByInputBox, doubleClickEventToCard, parseCardContentByNewLine
} from "../component/card.js";
import { $mainTag, columnDeleteEvent, headerDoubleClickEvent, inputFocusOutEvent } from "../component/column.js";
import { makeShadedNode } from "../drag/dragEffect.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { searchLogManger } from "../search/searchLogManager.js";
import { 
    timeToStringFormat, timeStringToArray, 
    getElapsedTime, saveTimeInTimeNode, eventToTimeNode
} from "../component/menu/menuLogTime.js";
import { statusListOnLocal, cardListOnLocal } from "../store/store.js";

/** 초기 데이터를 템플릿으로 구성합니다. */
function initialDataToTemplate() {
    statusListOnLocal.forEach(({id: statusID, statusName}) => {
        let $newColumn = columnTemplate(statusName, statusID, cardListOnLocal[statusID].length);
        let $cardArea = $newColumn.querySelector("article");

        cardListOnLocal[statusID].forEach((cardData) => {
            let $newCard = cardTemplate(cardData.title, cardData.content, cardData.author, cardData[CARD_ID]);
            makeCardDragEvent($newCard);
            $cardArea.appendChild($newCard);
        })    

        $mainTag.appendChild($newColumn);
    })
}

/** column 템플릿을 반환합니다. */
function columnTemplate(columnTitle, columnID, cardCount = 0) {
    let $column = document.createElement("section");
    $column.classList.add("column")
    $column.setAttribute("id", `${columnID}`);

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

    let $cardAddBtn = $column.querySelector(".card-add-btn");
    let $columnDeleteBtn = $column.querySelector(".column-delete-btn");
    let $header = $column.querySelector("h3");
    let $article = $column.querySelector("article");

    $header.addEventListener(EVENT.DRAG_OVER, (event) => {
        event.preventDefault();
        $article.prepend(makeShadedNode());
    })

    $article.addEventListener(EVENT.DRAG_OVER, (event) => {
        if($article.children.length) { return; }
        
        event.preventDefault();
        $article.appendChild(makeShadedNode());
    })

    columnDeleteEvent($columnDeleteBtn, $column); // column 제거 이벤트
    eventToNewCardBtn($cardAddBtn, $column.children[1]); // card 추가 이벤트
    headerDoubleClickEvent($header);  // 헤더 더블 클릭 이벤트

    return $column;
}

/** 카드 템플릿을 반환합니다. */
function cardTemplate(cardTitle, cardContent, cardAuthor, cardId) {
    let $card = document.createElement("div");
    $card.classList.add("card-frame");
    $card.setAttribute("draggable", true);
    $card.setAttribute(CARD_ID, cardId);  // drag 이벤트를 위해 카드에 ID 부여
    cardContent = parseCardContentByNewLine(cardContent)
    $card.innerHTML = `
        <h3 class="card-title">${cardTitle}
            <i class="fa-solid fa-xmark"></i>
        </h3>
        <h4 class="card-content" style="word-break: break-word;">${cardContent}</h4>
        <h5 class="card-author">${cardAuthor == "" ? "author by web" : cardAuthor}</h5>
    `;

    // 더블 클릭 이벤트 추가
    doubleClickEventToCard($card);

    let $cardDeleteBtn = $card.querySelector("i");
    eventToCardDeleteBtn($cardDeleteBtn, $card);

    return $card;
}

/** 카드 등록 템플릿을 반환합니다. */
function newCardTemplate(title = "", content = "", prevCard="", isUpdated=false) {
    let $newCard = document.createElement("div");
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

    // 등록 카드 폼의 버튼에 이벤트 추가
    eventToMakeCardCancelBtn($newCancelBtn, $newCard, prevCard, isUpdated);
    eventToMakeNewCardBtn($newRegisterBtn, $newCard, prevCard, isUpdated);
    resizeCardByInputBox($textArea, $newCard);

    return $newCard;
}

/** 메뉴 log 템플릿을 반환합니다. (add) */
function menuLogAddTemplate(content, status, emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime);

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete) */
function menuLogDeleteTemplate(content, status, emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime);

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (delete all) */
function menuLogDeleteAllTemplate(emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime);

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (move) */
function menuLogMoveTemplate(title, prevColumnName, nextColumnName, emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime)

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}
 
/** 메뉴 log 템플릿을 반환합니다. (update) */
function menuLogUpdateTemplate(title, status, emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime);

    // 시간 노드에 event 추가
    eventToTimeNode($timeNode);

    return $menuFrame;
}

/** 메뉴 log 템플릿을 반환합니다. (search) */
function menuSearchTemplate(searchLog, emotion, author) {
    let $menuFrame = document.createElement("div");
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

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = timeToStringFormat(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const $timeNode = $menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    $timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode($timeNode, parsedTime);

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
    
    // setTimeout 주는 이유? 
    // JS 스레드 작업 역량에 따라서 input 생성이 완료되기 이전에 focus가 호출될 수 있음!
    // setTimeout 함수를 호출해주면 setTimeout 함수를 해석하는 동안에 보통 input 생성되는 것 같음! (이게 delay 값을 0 주어도 괜찮은 이유)
    setTimeout(() => {
        $input.focus();
    }, 0)

    inputFocusOutEvent($input, title, $originalHeader);  // input에 포커스 아웃 이벤트 추가

    $header.appendChild($input);

    return $header;
}

export {
    initialDataToTemplate,
    columnTemplate, cardTemplate, newCardTemplate, 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, menuSearchTemplate,
    headerTitleTemplate, menuLogDeleteAllTemplate
}