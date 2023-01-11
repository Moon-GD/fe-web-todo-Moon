import { CARD_BTN_ORIGINAL, CARD_OUTLINE_ORIGINAL, CARD_BACKGROUND_ORIGINAL,
    CARD_BTN_HOVER, CARD_OUTLINE_HOVER, CARD_BACKGROUND_HOVER, CARD_DELETE_BTN_ORIGINAL, findCardTitle, findCardContent } from "../common.js";
import { setCard, turnOnModal } from "./modal.js";
import { cardTemplate, newCardTemplate } from "../templates/template.js";
import { findColumnStatusByCard } from "./column.js"
import { addJSONData, deleteJSONData } from "../json_data/json_data.js"; 
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { menuLogAdd, menuLogUpdate } from "./menu.js";
import { findCardHeaderName } from "../component/column.js"

let registering = false;

// 버튼이 클릭되면 카드 등록 폼이 보여지도록 이벤트를 등록합니다.
function cardAddEvent(cardRegisterBtn, currentColumn) {
    cardRegisterBtn.addEventListener("click", () => {
        registering ? 
                currentColumn.children[0].remove() :    
                currentColumn.prepend(newCardTemplate());

        registering = !registering;
    })
}

// 버튼에 카드 삭제 이벤트를 등록합니다.
function cardDeleteEvent(cardDeleteBtn, deletedCard) {
    cardDeleteBtn.addEventListener("click", () => {
        setCard(deletedCard)
        turnOnModal();
    })

    let xBtn = deletedCard.children[0].children[0]
    
    cardDeleteBtn.addEventListener("mouseover", () => {
        deletedCard.style.transition = "0.5s"
        deletedCard.style.marginTop = "-0.5vh";
        deletedCard.style.marginBottom = "1.5vh";
        cardDeleteBtn.style.color = CARD_BTN_HOVER;
        deletedCard.style.outline = CARD_OUTLINE_HOVER;
        deletedCard.style.backgroundColor = CARD_BACKGROUND_HOVER;
    })

    cardDeleteBtn.addEventListener("mouseleave", () => {
        deletedCard.style.marginTop = "0vh";
        deletedCard.style.marginBottom = "1vh";
        cardDeleteBtn.style.color = CARD_BTN_ORIGINAL;
        xBtn.style.color = CARD_DELETE_BTN_ORIGINAL;
        deletedCard.style.outline = CARD_OUTLINE_ORIGINAL;
        deletedCard.style.backgroundColor = CARD_BACKGROUND_ORIGINAL;
    })
}

// 새로운 카드 등록을 취소하는 이벤트를 등록합니다.
function newCardCancelEvent(registerCancelBtn, cardRegisterForm, prevCard, isUpdated) {
    registerCancelBtn.addEventListener("click", () => {
        if(isUpdated) {
            prevCard.style.display = "block";

            // json 데이터 복구
            addJSONData(
                findColumnStatusByCard(prevCard),
                findCardTitle(prevCard),
                findCardContent(prevCard)
            )
        }

        cardRegisterForm.remove()
    })
}

// 새로운 카드를 생성하는 이벤트를 등록합니다.
function newCardRegisterEvent(cardMakeBtn, currentCard, prevCard, isUpdated) {
    cardMakeBtn.addEventListener("click", () => {
        registering = false;

        let title = currentCard.children[0].value;
        let prevContent = "";
        let updatedContent = currentCard.children[1].value ;
        let newCard = cardTemplate(title, parseContent(updatedContent));
        let updatedStatus = "";

        // drag 이벤트 추가
        makeCardDragEvent(newCard);

        // 카드 배치 후 카드 등록 폼 제거
        currentCard.after(newCard);
        currentCard.style.display = "none";

        // 데이터 반영
        let currentStatus = findColumnStatusByCard(newCard)

        addJSONData(currentStatus, title, updatedContent)

        // 메뉴 update
        if(isUpdated) {
            updatedStatus = findColumnStatusByCard(prevCard)
            prevCard.remove();
            currentCard.remove();
            prevContent = prevCard.children[1].innerHTML
        } 
        // 메뉴 add
        else {
            menuLogAdd(title, findCardHeaderName(currentCard));
        }

        // 메뉴 update (update 사항이 있는 경우 메뉴 바에 반영)
        if(isUpdated && prevContent != updatedContent) {
            menuLogUpdate(title, updatedStatus);   
        }
    })
}

// 새로운 카드를 생성할 때, 사용자의 입력에 따라 카드의 크기를 조절해줍니다.
function resizeCardByInputBox(cardRegisterInput, cardRegisterForm) {
    let scrollHeight = 0
    let cardHeight = 18
    let registerAcceptBtn = cardRegisterForm.children[2].children[1];

    cardRegisterInput.value ?
            registerAcceptBtn.disabled = false  :
            registerAcceptBtn.disabled = true;

    cardRegisterInput.addEventListener("input", () => {
        if(cardRegisterInput.scrollHeight != scrollHeight) {
            cardHeight += 2.5
            cardRegisterForm.style.height = cardHeight + "vh";
            scrollHeight = cardRegisterInput.scrollHeight
        }

        cardRegisterInput.value ?
                registerAcceptBtn.disabled = false  :
                registerAcceptBtn.disabled = true;
    })
}

// 새로운 카드를 등록할 때, 개행을 기준으로 문자열을 나누어줍니다.
function parseContent(cardContent) {
    let cardContents = cardContent.split("\n");
    return cardContents.join("<br>");
}

function cardToRegisterForm(cardNode) {
    let title = findCardTitle(cardNode);
    let content = findCardContent(cardNode);
    let status = findColumnStatusByCard(cardNode);

    // JSON 반영
    deleteJSONData(status, title);

    cardNode.before(newCardTemplate(title, content, cardNode, true));
    cardNode.style.display = "none";
}

// 카드에 더블 클릭 이벤트를 추가해줍니다.
function addDoubleClickEventToCard(cardNode) {
    cardNode.addEventListener("dblclick", () => {
        cardToRegisterForm(cardNode);
    })
}

export { 
    cardAddEvent, cardDeleteEvent, 
    newCardCancelEvent, newCardRegisterEvent, resizeCardByInputBox,
    addDoubleClickEventToCard
 }