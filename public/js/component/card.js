import { 
    CARD_BTN_ORIGINAL, CARD_OUTLINE_ORIGINAL, CARD_BACKGROUND_ORIGINAL, CARD_BTN_HOVER, 
    CARD_OUTLINE_HOVER, CARD_BACKGROUND_HOVER, CARD_DELETE_BTN_ORIGINAL, CARD_TEXT_HEIGHT,
    DISPLAY_BLOCK, DISPLAY_NONE,
    CLICK, MOUSE_OVER, MOUSE_LEAVE, INPUT, DOUBLE_CLICK
} from "../common/commonVariable.js";
import { findColumnStatusByCard, findCardHeaderName } from "./column.js";
import { menuLogAdd, menuLogUpdate, menuLogDeleteAll } from "./menu.js";
import { turnOnModal } from "./modal.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { addJSONData, deleteJSONData } from "../store/store.js"; 
import { cardTemplate, newCardTemplate } from "../templates/template.js";
import { idGenerator } from "../common/IDGenerator.js";

let $chosenCard = "";
let registering = false;

// 현재 drag 중인 카드 정보를 저장합니다.
function setCard($cardNode) { $chosenCard = $cardNode; }

// 카드의 제목을 찾아줍니다.
function findCardTitle($cardNode) {
    const cardTitleText = $cardNode.querySelector("h3").innerHTML;
    const cardTitle = cardTitleText.split('\n')[0];

    return cardTitle;
}

// 카드의 내용을 찾아줍니다.
function findCardContent($cardNode) {
    const cardContent = $cardNode.querySelector(".card-content").innerHTML;

    return cardContent;
}

// 카드를 삭제합니다.
function deleteCard($cardNode) {
    const status = findColumnStatusByCard($cardNode);
        
    // 로컬 data 반영
    deleteJSONData(status, $cardNode.getAttribute("id"));

    $cardNode.remove();
}

// 모든 카드를 삭제합니다.
function deleteAllCards() {
    const $cards = document.querySelectorAll(".card-frame");

    $cards.forEach(($card) => { deleteCard($card); })

    // 메뉴에 로그를 남깁니다.
    menuLogDeleteAll();
}

// 카드 생성 폼을 보여주는 버튼에 event를 등록합니다.
function addEventToShowCardRegisterBtn($cardRegisterBtn, $currentColumn) {
    $cardRegisterBtn.addEventListener(CLICK, () => {
        registering ? 
                $currentColumn.children[0].remove() :    
                $currentColumn.prepend(newCardTemplate());

        registering = !registering;
    })
}

// 카드 삭제 버튼에 event를 등록합니다.
function addEventToCardDeleteBtn($cardDeleteBtn, $deletedCard) {
    $cardDeleteBtn.addEventListener(CLICK, () => {
        setCard($deletedCard);
        turnOnModal();
    })

    let $xBtn = $deletedCard.querySelector("i");
    
    $cardDeleteBtn.addEventListener(MOUSE_OVER, () => {
        $deletedCard.style.transition = "0.5s"
        $deletedCard.style.marginTop = "-0.5vh";
        $deletedCard.style.marginBottom = "1.5vh";
        $deletedCard.style.outline = CARD_OUTLINE_HOVER;
        $deletedCard.style.backgroundColor = CARD_BACKGROUND_HOVER;
        $cardDeleteBtn.style.color = CARD_BTN_HOVER;
    })

    $cardDeleteBtn.addEventListener(MOUSE_LEAVE, () => {
        $deletedCard.style.marginTop = "0vh";
        $deletedCard.style.marginBottom = "1vh";
        $deletedCard.style.outline = CARD_OUTLINE_ORIGINAL;
        $deletedCard.style.backgroundColor = CARD_BACKGROUND_ORIGINAL;
        $cardDeleteBtn.style.color = CARD_BTN_ORIGINAL;
        $xBtn.style.color = CARD_DELETE_BTN_ORIGINAL;
    })
}

// 카드 생성 취소 버튼에 event를 등록합니다.
function addEventToMakeCardCancelBtn($registerCancelBtn, $cardRegisterForm, $prevCard, isUpdated) {
    $registerCancelBtn.addEventListener(CLICK, () => {
        if(isUpdated) {
            $prevCard.style.display = DISPLAY_BLOCK;

            // json 데이터 복구
            addJSONData(
                findColumnStatusByCard($prevCard),
                findCardTitle($prevCard),
                findCardContent($prevCard),
                $prevCard.getAttribute("id")
            );
        }

        $cardRegisterForm.remove();
    })
}

// 카드를 생성 버튼에 event를 등록합니다.
function addEventToMakeNewCardBtn($cardMakeBtn, $currentCard, $prevCard, isUpdated) {
    $cardMakeBtn.addEventListener(CLICK, () => {
        registering = false;
        let title = $currentCard.querySelector("input").value;
        let prevContent = "";
        let updatedContent = $currentCard.querySelector("textarea").value ;
        let $newCard = cardTemplate(title, parseCardContentByNewLine(updatedContent), "", $prevCard.getAttribute("id"));
        let updatedStatus = "";

        // drag 이벤트 추가
        makeCardDragEvent($newCard);

        // 카드 배치 후 카드 등록 폼 제거
        $currentCard.after($newCard);
        $currentCard.style.display = DISPLAY_NONE;

        // 데이터 반영
        let currentStatus = findColumnStatusByCard($newCard);
        addJSONData(currentStatus, title, updatedContent, $newCard.getAttribute("id"));

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

// 카드에 더블 클릭 이벤트를 추가해줍니다.
function addDoubleClickEventToCard($cardNode) {
    $cardNode.addEventListener(DOUBLE_CLICK, () => {
        changeCardToRegisterForm($cardNode);
    })
}

// 카드 더블 클릭이 되면 카드 등록 폼으로 형태를 바꾸어줍니다.
function changeCardToRegisterForm($cardNode) {
    let title = findCardTitle($cardNode);
    let content = findCardContent($cardNode);
    let status = findColumnStatusByCard($cardNode);

    // JSON 반영
    deleteJSONData(status, $cardNode.getAttribute("id"));

    $cardNode.before(newCardTemplate(title, content, $cardNode, true));
    $cardNode.style.display = DISPLAY_NONE;
}

// 카드 등록 폼에서 사용자의 입력에 따라 카드의 크기를 조절해줍니다.
function resizeCardByInputBox($cardRegisterInput, $cardRegisterForm) {
    let scrollHeight = 0;
    let cardHeight = 18;
    let $registerAcceptBtn = $cardRegisterForm.querySelector("#new-card-register-btn");

    $cardRegisterInput.value ?
            $registerAcceptBtn.disabled = false  :
            $registerAcceptBtn.disabled = true;

    $cardRegisterInput.addEventListener(INPUT, () => {
        if($cardRegisterInput.scrollHeight != scrollHeight) {
            cardHeight += CARD_TEXT_HEIGHT;
            $cardRegisterForm.style.height = cardHeight + "vh";
            scrollHeight = $cardRegisterInput.scrollHeight;
        }

        $cardRegisterInput.value ?
                $registerAcceptBtn.disabled = false  :
                $registerAcceptBtn.disabled = true;
    })
}

// 카드를 생성할 때, 카드 등록 폼의 content 내용의 개행을 구분해줍니다.
function parseCardContentByNewLine(cardContent) {
    let cardContents = cardContent.split("\n");
    
    return cardContents.join("<br>");
}

export { 
    addEventToShowCardRegisterBtn, addEventToCardDeleteBtn, 
    addEventToMakeCardCancelBtn, addEventToMakeNewCardBtn, resizeCardByInputBox,
    addDoubleClickEventToCard, deleteCard, findCardTitle, findCardContent, deleteAllCards, setCard, $chosenCard
 }