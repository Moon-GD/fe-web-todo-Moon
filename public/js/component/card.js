    import { 
    CARD_BTN, CARD, CARD_DELETE_BTN_ORIGINAL,
    DISPLAY, EVENT, CARD_ID, HALF_SECOND, CARD_DARK_MODE
} from "../common/commonVariable.js";
import { idGenerator } from "../common/IDGenerator.js";
import { findColumnStatusByCard, findCardHeaderName } from "./column.js";
import { menuLogAdd, menuLogUpdate, menuLogDeleteAll } from "./menu/menu.js";
import { turnOnModal } from "./modal.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { deleteCardData } from "../../../server/card/delete.js";
import { cardTemplate, newCardTemplate } from "../templates/template.js";
import { addCardJSON } from "../../../server/card/post.js";
import { isDarkMode } from "../common/darkMode.js";

let $chosenCard = "";
let registering = false;

/** 현재 drag 중인 카드 정보를 저장합니다. */
function setCard($card) { $chosenCard = $card; }

/** 카드 제목을 찾아줍니다. */
function findCardTitle($card) {
    const cardTitleText = $card.querySelector("h3").innerHTML;
    const cardTitle = cardTitleText.split('\n')[0];

    return cardTitle;
}

/** 카드 내용을 찾아줍니다. */
const findCardContent = ($card) => $card.querySelector(".card-content").innerHTML;

/** 카드를 삭제합니다. */
function deleteCard($card) {
    const cardID = $card.getAttribute(CARD_ID);
    const status = findColumnStatusByCard($card);
    $card.remove();
    deleteCardData(status, cardID);
}

/** 모든 카드를 삭제합니다. */
function deleteAllCards() {
    const $cards = document.querySelectorAll(".card-frame");

    $cards.forEach(($card) => { deleteCard($card); })

    // 메뉴에 로그를 남깁니다.
    menuLogDeleteAll();
}

/** 카드 생성 폼을 보여주는 버튼에 이벤트를 등록합니다. */
function addEventToShowCardRegisterBtn($cardRegisterBtn, $currentColumn) {
    $cardRegisterBtn.addEventListener(EVENT.CLICK, () => {
        registering ? 
                $currentColumn.children[0].remove() :    
                $currentColumn.prepend(newCardTemplate());

        registering != registering;
    })
}

/** 카드 삭제 버튼에 이벤트를 등록합니다. */
function addEventToCardDeleteBtn($cardDeleteBtn, $deletedCard) {
    $cardDeleteBtn.addEventListener(EVENT.CLICK, () => {
        setCard($deletedCard);
        turnOnModal();
    })

    let $xBtn = $deletedCard.querySelector("i");
    
    $cardDeleteBtn.addEventListener(EVENT.MOUSE_OVER, () => {
        $deletedCard.style.transition = HALF_SECOND;
        $deletedCard.style.marginTop = "-0.5vh";
        $deletedCard.style.marginBottom = "1.5vh";
        $cardDeleteBtn.style.color = CARD_BTN.HOVER;
        
        if(isDarkMode()) {
            $deletedCard.style.outline = CARD_DARK_MODE.OUTLINE_HOVER;
            $deletedCard.style.backgroundColor = CARD_DARK_MODE.BACKGROUND_HOVER;
        }
        else {
            $deletedCard.style.outline = CARD.OUTLINE_HOVER;
            $deletedCard.style.backgroundColor = CARD.BACKGROUND_HOVER;
        }
    })

    $cardDeleteBtn.addEventListener(EVENT.MOUSE_LEAVE, () => {
        $deletedCard.style.marginTop = "0vh";
        $deletedCard.style.marginBottom = "1vh";
        $cardDeleteBtn.style.color = CARD_BTN.ORIGINAL;
        $xBtn.style.color = CARD_DELETE_BTN_ORIGINAL;

        if(isDarkMode() ) {
            $deletedCard.style.outline = CARD_DARK_MODE.OUTLINE_ORIGINAL;
            $deletedCard.style.backgroundColor = CARD_DARK_MODE.BACKGROUND_ORIGINAL;
        }
        else {
            $deletedCard.style.outline = CARD.OUTLINE_ORIGINAL;
            $deletedCard.style.backgroundColor = CARD.BACKGROUND_ORIGINAL;
        }
    })
}

/** 카드 생성 취소 버튼에 이벤트를 등록합니다. */
function addEventToMakeCardCancelBtn($registerCancelBtn, $cardRegisterForm, $prevCard, isUpdated) {
    $registerCancelBtn.addEventListener(EVENT.CLICK, () => {
        if(isUpdated) {
            $prevCard.style.display = DISPLAY.BLOCK;

            // json 데이터 복구
            addCardJSON(
                findColumnStatusByCard($prevCard),
                findCardTitle($prevCard),
                findCardContent($prevCard),
                $prevCard.getAttribute(CARD_ID)
            );
        }

        $cardRegisterForm.remove();
    })
}

/** 카드 생성 버튼에 이벤트를 등록합니다. */
function addEventToMakeNewCardBtn($cardMakeBtn, $currentCard, $prevCard, isUpdated) {
    $cardMakeBtn.addEventListener(EVENT.CLICK, () => {
        registering = false;
        let title = $currentCard.querySelector("input").value;
        let prevContent = "";
        let updatedContent = $currentCard.querySelector("textarea").value ;
        let $newCard = cardTemplate(
            title, parseCardContentByNewLine(updatedContent), "", 
            isUpdated ? $prevCard.getAttribute(CARD_ID) : idGenerator.createCardID()
        );
        let updatedStatus = "";

        // drag 이벤트 추가
        makeCardDragEvent($newCard);

        // 카드 배치 후 카드 등록 폼 제거
        $currentCard.after($newCard);
        $currentCard.style.display = DISPLAY.NONE;

        // 데이터 반영
        let currentStatus = findColumnStatusByCard($newCard);
        addCardJSON(currentStatus, title, updatedContent, $newCard.getAttribute(CARD_ID));

        // 메뉴 update
        if(isUpdated) {
            updatedStatus = findColumnStatusByCard($prevCard);
            $prevCard.remove();
            $currentCard.remove();
            prevContent = $prevCard.querySelector(".card-content").innerHTML;
        }
        // 메뉴 add
        else {
            menuLogAdd(title, findCardHeaderName($currentCard));
        }

        // 메뉴 update (update 사항이 있는 경우 메뉴 바에 반영)
        if(isUpdated && prevContent != updatedContent) {
            menuLogUpdate(title, updatedStatus);   
        }
    })
}

/** 카드에 더블 클릭 이벤트를 등록합니다. */
function addDoubleClickEventToCard($card) {
    $card.addEventListener(EVENT.DOUBLE_CLICK, () => changeCardToRegisterForm($card))
}

/** 카드를 등록 폼 형태로 바꾸어줍니다. */
function changeCardToRegisterForm($card) {
    let title = findCardTitle($card);
    let content = findCardContent($card);
    let status = findColumnStatusByCard($card);

    // JSON 반영
    deleteCardData(status, $card.getAttribute(CARD_ID));

    $card.before(newCardTemplate(title, content, $card, true));
    $card.style.display = DISPLAY.NONE;
}

/** 사용자 입력에 따라 카드 등록 폼 형태의 크기를 조절해줍니다. */
function resizeCardByInputBox($cardRegisterInput, $cardRegisterForm) {
    let scrollHeight = 0;
    let cardHeight = 18;
    let $registerAcceptBtn = $cardRegisterForm.querySelector("#new-card-register-btn");

    $cardRegisterInput.value ?
            $registerAcceptBtn.disabled = false  :
            $registerAcceptBtn.disabled = true;

    $cardRegisterInput.addEventListener(EVENT.INPUT, () => {
        if($cardRegisterInput.scrollHeight != scrollHeight) {
            cardHeight += CARD.TEXT_HEIGTH;
            $cardRegisterForm.style.height = cardHeight + "vh";
            scrollHeight = $cardRegisterInput.scrollHeight;
        }

        $cardRegisterInput.value ?
                $registerAcceptBtn.disabled = false  :
                $registerAcceptBtn.disabled = true;
    })
}

/** 카드 등록 폼 내용의 개행을 구분해줍니다. */
function parseCardContentByNewLine(cardContent) {
    let cardContents = cardContent.split("\n");
    return cardContents.join("<br>");
}

export { 
    addEventToShowCardRegisterBtn, addEventToCardDeleteBtn, 
    addEventToMakeCardCancelBtn, addEventToMakeNewCardBtn, resizeCardByInputBox,
    addDoubleClickEventToCard, deleteCard, findCardTitle, findCardContent, deleteAllCards, setCard, $chosenCard, parseCardContentByNewLine
 }