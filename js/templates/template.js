import { getCurrentTimeInString, saveTimeInTimeNode, addEventToTimeNode, timeStringToArray, getElapsedTime } from "../common/commonFunction.js";
import { DRAG_OVER } from "../common/commonVariable.js";
import { addEventToShowCardRegisterBtn, addEventToCardDeleteBtn, 
    addEventToMakeCardCancelBtn, addEventToMakeNewCardBtn,
    resizeCardByInputBox, addDoubleClickEventToCard
} from "../component/card.js";
import { columnDeleteEvent, headerDoubleClickEvent, inputFocusOutEvent } from "../component/column.js";
import { makeShadedNode } from "../drag/dragEffect.js";
import { dragIDManager } from "../drag/dragIDManager.js";
import { statusNameList } from "../json_data/json_data.js";
import { searchLogManger } from "../search/searchLogManager.js";

// column 템플릿을 반환합니다.
function columnTemplate(columnTitle, cardCount = 0) {
    let columnNode = document.createElement("section");

    columnNode.innerHTML = `
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
        `

    let cardAddBtn = columnNode.querySelector(".card-add-btn")
    let columnDeleteBtn = columnNode.querySelector(".column-delete-btn")
    let header = columnNode.querySelector("h3")
    let article = columnNode.querySelector("article")

    header.addEventListener(DRAG_OVER, (event) => {
        event.preventDefault();
        article.prepend(makeShadedNode());
    })

    article.addEventListener(DRAG_OVER, (event) => {
        if(article.children.length) { return; }
        
        event.preventDefault();
        article.appendChild(makeShadedNode());
    })

    columnDeleteEvent(columnDeleteBtn, columnNode); // column 제거 이벤트
    addEventToShowCardRegisterBtn(cardAddBtn, columnNode.children[1]); // card 추가 이벤트
    headerDoubleClickEvent(header);  // 헤더 더블 클릭 이벤트

    return columnNode;
}

// 카드 템플릿을 반환합니다.
function cardTemplate(cardTitle, cardContent, cardAuthor="author by web") {
    let cardDom = document.createElement("div");
    cardDom.classList.add("card-frame")
    cardDom.setAttribute("draggable", true)
    cardDom.setAttribute("id", dragIDManager.getNewID())  // drag 이벤트를 위해 카드에 ID 부여

    cardDom.innerHTML = `
        <h3 class="card-title">${cardTitle}
            <i class="fa-solid fa-xmark"></i>
        </h3>
        <h4 class="card-content">${cardContent}</h4>
        <h5 class="card-author">${cardAuthor}</h5>
    `;

    // 더블 클릭 이벤트 추가
    addDoubleClickEventToCard(cardDom)

    let cardDeleteBtn = cardDom.querySelector("i");
    addEventToCardDeleteBtn(cardDeleteBtn, cardDom)

    return cardDom;
}

// 카드 등록 폼의 템플릿을 반환합니다.
function newCardTemplate(title = "", content = "", prevCard="", isUpdated=false) {
    let newCardDom = document.createElement("div");
    newCardDom.classList.add("new-card-frame");

    newCardDom.innerHTML = `
        <input type="text" placeholder="제목을 입력하세요" value='${title}'>
        <textarea cols="30" rows="20" maxlength="500" placeholder="내용을 입력하세요">${content}</textarea>
        <div class="new-card-button-area">
            <button id="new-card-cancel-btn">취소</button>
            <button id="new-card-register-btn" disabled>등록</button>
        </div>
    `

    const newCancelBtn = newCardDom.querySelector("#new-card-cancel-btn");
    const newRegisterBtn = newCardDom.querySelector("#new-card-register-btn");
    const textArea = newCardDom.querySelector("textarea");

    // 등록 카드 폼의 버튼에 이벤트 추가
    addEventToMakeCardCancelBtn(newCancelBtn, newCardDom, prevCard, isUpdated);
    addEventToMakeNewCardBtn(newRegisterBtn, newCardDom, prevCard, isUpdated);
    resizeCardByInputBox(textArea, newCardDom);

    return newCardDom;
}

// 메뉴 로그 템플릿을 반환합니다. (add)
function menuLogAddTemplate(content, status, emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
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
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}

// 메뉴 로그 템플릿을 반환합니다. (delete)
function menuLogDeleteTemplate(content, status, emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
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
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}

// 메뉴 로그 템플릿을 반환합니다. (delete all)
function menuLogDeleteAllTemplate(emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>모든 카드를 삭제하였습니다.</strong>
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}

// 메뉴 로그 템플릿을 반환합니다. (move)
function menuLogMoveTemplate(title, prevStatus, nextStatus, emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${title}</strong>을/를
                <strong>${statusNameList[prevStatus]}</strong>에서
                <strong>${statusNameList[nextStatus]}</strong>
                로 이동하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div>
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}
 
// 메뉴 로그 템플릿을 반환합니다. (update)
function menuLogUpdateTemplate(title, status, emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
        <div class="log-emotion-area">${emotion}</div>
        <div class="log-content-area">
            <h4 class="log-author">${author}</h4>
            <h4 class="log-content">
                <strong>${statusNameList[status]}</strong>의
                <strong>${title}</strong>
                을/를 수정하였습니다.
            </h4>
            <h5 class="log-time" data-time></h5>
        </div class="log-time">
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}

// 메뉴 로그 템플릿을 반환합니다. (search)
function menuSearchTemplate(searchLog, emotion, author) {
    let menuFrame = document.createElement("div");
    menuFrame.classList.add("log-frame");

    menuFrame.innerHTML = `
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
    `

    // 시간 계산 및 시간 노드 불러오기
    const parsedTime = getCurrentTimeInString(new Date());
    const timeArray = timeStringToArray(parsedTime);
    const timeNode = menuFrame.querySelector(".log-time");

    // 시간 차이 계산하여 저장
    timeNode.textContent = getElapsedTime(timeArray);

    // 시간 노드에 등록 시간 저장
    saveTimeInTimeNode(timeNode, parsedTime)

    // 시간 노드에 event 추가
    addEventToTimeNode(timeNode);

    return menuFrame;
}

// 헤더 템플릿을 반환합니다.
function headerTitleTemplate(title, originalHeaderDom) {
    const headerDom = document.createElement("h3");
    const inputDom = document.createElement("input")
    
    inputDom.setAttribute("type", "text");
    inputDom.setAttribute("placeholder", "제목을 입력해주세요.");
    inputDom.setAttribute("maxlength", "10");
    inputDom.value = title;
    
    // setTimeout 주는 이유? 
    // JS 스레드 작업 역량에 따라서 inputDom 생성이 완료되기 이전에 focus가 호출될 수 있음!
    // setTimeout 함수를 호출해주면 setTimeout 함수를 해석하는 동안에 보통 inputDom이 생성되는 것 같음! (이게 delay 값을 0 주어도 괜찮은 이유)
    setTimeout(() => {
        inputDom.focus();
    }, 0)

    inputFocusOutEvent(inputDom, title, originalHeaderDom);  // input에 포커스 아웃 이벤트 추가

    headerDom.appendChild(inputDom);

    return headerDom;
}

export {
    columnTemplate, cardTemplate, newCardTemplate, 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, menuSearchTemplate,
    headerTitleTemplate, menuLogDeleteAllTemplate
}