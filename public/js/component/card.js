import {
    CARD_BTN, CARD, CARD_DELETE_BTN_ORIGINAL,
    DISPLAY, EVENT, CARD_ID, HALF_SECOND, CARD_DARK_MODE, STATUS, FETCH_URL, METHOD, HEADER
} from "../common/commonVariable.js";
import {addEvent, pipe} from "../common/commonFunction.js";
import {isDarkMode} from "../common/darkMode.js";
import {idGenerator} from "../common/IDGenerator.js";
import {menuLogAdd, menuLogUpdate, menuLogDeleteAll} from "./menu/menu.js";
import {findColumnStatusByCard, findCardHeaderName} from "./column.js";
import {turnOnModal} from "./modal.js";
import {eventToCard} from "../drag/addDragEvent.js";
import {statusListOnLocal} from "../store/store.js";
import {cardTemplate, newCardTemplate} from "../templates/template.js";
import {deleteCardData} from "../../../server/card/delete.js";
import {addCardJSON} from "../../../server/card/post.js";

let [$chosenCard, registering] = ["", false];

/**
 * 삭제될 카드를 지정합니다.
 * @param {Node} $card 카드 객체
 */
const setCardToBeDeleted = ($card) => $chosenCard = $card;

/**
 * 카드 객체의 제목을 반환합니다.
 * @param {Node} $card 카드 객체
 * @returns {String} 카드 제목
 */
const findCardTitle = ($card) => pipe(
    ($card) => $card.querySelector("h3").innerHTML,
    (cardHTML) => cardHTML.split('\n')[0]
)($card)

/**
 * 카드 내용을 반환합니다.
 * @param {Node} $card 카드 객체
 * @returns {String} 카드 내용
 */
const findCardContent = ($card) => $card.querySelector(".card-content").innerHTML;

/**
 * 카드 제목을 기반으로 카드 객체를 반환합니다.
 * @param {String} title 카드 제목
 * @returns 카드 객체 / null
 */
function findCardByTitle(title) {
    const cardArray = document.querySelectorAll(".card-frame");

    for (let $card of cardArray) {
        if (findCardTitle($card) == title) return $card;
    }

    return null;
}

/**
 * 카드를 삭제합니다.
 * @param {Node} $card 카드 객체
 */
async function deleteCard($card) {
    const cardID = $card.getAttribute(CARD_ID);
    const status = findColumnStatusByCard($card);
    $card.remove();
    deleteCardData(status, cardID);
}

/** 모든 카드를 삭제합니다. */
function deleteAllCards() {
    pipe(
        () => document.querySelectorAll(".card-frame"),
        ($cardArray) => $cardArray.forEach(($card) => deleteCard($card)),
        menuLogDeleteAll
    )()
}

/**
 * 카드 생성 폼을 보여주는 버튼에 이벤트를 등록합니다.
 * @param {Node} $cardRegisterBtn 카드 생성 버튼
 * @param {Node} $currentColumn 카드 생성 버튼의 column
 */
function eventToNewCardBtn($cardRegisterBtn, $currentColumn) {
    addEvent($cardRegisterBtn, [
        () => {
            registering ?
                $currentColumn.children[0].remove() :
                $currentColumn.prepend(newCardTemplate());

            registering != registering;
        }
    ])
}

/**
 * 카드에 끌어올리는 css 효과를 줍니다.
 * @param {Node} $card 카드 객체
 */
function pullUpCard($card) {
    $card.style.transition = HALF_SECOND;
    $card.style.marginTop = "-0.5vh";
    $card.style.marginBottom = "1.5vh";

    if (isDarkMode()) {
        $card.style.outline = CARD_DARK_MODE.OUTLINE_HOVER;
        $card.style.backgroundColor = CARD_DARK_MODE.BACKGROUND_HOVER;
    } else {
        $card.style.outline = CARD.OUTLINE_HOVER;
        $card.style.backgroundColor = CARD.BACKGROUND_HOVER;
    }
}

/**
 * 카드를 끌어내리는 css 효과를 줍니다.
 * @param {Node} $card 카드 객체
 * @param {Node} $cardDeleteBtn 카드 삭제 버튼 객체
 */
function pullDownCard($card, $cardDeleteBtn) {
    $card.style.marginTop = "0vh";
    $card.style.marginBottom = "1vh";
    $cardDeleteBtn.style.color = CARD_BTN.ORIGINAL;
    $cardDeleteBtn.style.color = CARD_DELETE_BTN_ORIGINAL;

    if (isDarkMode()) {
        $card.style.outline = CARD_DARK_MODE.OUTLINE_ORIGINAL;
        $card.style.backgroundColor = CARD_DARK_MODE.BACKGROUND_ORIGINAL;
    } else {
        $card.style.outline = CARD.OUTLINE_ORIGINAL;
        $card.style.backgroundColor = CARD.BACKGROUND_ORIGINAL;
    }
}

/**
 * 카드 삭제 버튼에 이벤트를 등록합니다.
 * @param {Node} $cardDeleteBtn 카드 삭제 버튼
 * @param {Node} $deletedCard 삭제할 카드 객체
 */
function eventToCardDeleteBtn($cardDeleteBtn, $deletedCard) {
    addEvent($cardDeleteBtn, [
        () => setCardToBeDeleted($deletedCard),
        () => turnOnModal()
    ]);

    addEvent($cardDeleteBtn, [
        () => pullUpCard($deletedCard)
    ], EVENT.MOUSE_OVER);

    addEvent($cardDeleteBtn, [
        () => pullDownCard($deletedCard, $cardDeleteBtn)
    ], EVENT.MOUSE_LEAVE);
}

/** 카드 생성 취소 버튼에 이벤트를 등록합니다. */
/**
 *
 * @param {Node} $registerCancelBtn 카드 등록 취소 버튼 객체
 * @param {Node} $cardRegisterForm 카드 등록 폼 객체
 * @param {Node} $prevCard update 이전의 원본 카드 객체
 * @param {Boolean} isUpdated 카드 등록 폼이 나온 이유 -> update(true) / create card (false)
 */
function eventToMakeCardCancelBtn($registerCancelBtn, $cardRegisterForm, $prevCard, isUpdated) {
    addEvent($registerCancelBtn, [
        () => {
            if (!isUpdated) return;
            $prevCard.style.display = DISPLAY.BLOCK;

            addCardJSON(
                findColumnStatusByCard($prevCard),
                findCardTitle($prevCard),
                findCardContent($prevCard),
                $prevCard.getAttribute(CARD_ID)
            );
        },
        () => $cardRegisterForm.remove()
    ])
}

/** 카드 생성 버튼에 이벤트를 등록합니다. */
// 으어... 넘나 지저분
function eventToMakeNewCardBtn($cardMakeBtn, $currentCard, $prevCard, isUpdated) {
    addEvent($cardMakeBtn, [
        () => {
            registering = false;
            let cardTitle = $currentCard.querySelector("input").value;
            let prevContent = "";
            let updatedContent = $currentCard.querySelector("textarea").value;
            let $newCard = cardTemplate(
                cardTitle, parseCardContentByNewLine(updatedContent), "",
                isUpdated ? $prevCard.getAttribute(CARD_ID) : idGenerator.createCardID()
            );
            let updatedStatus = "";

            // drag 이벤트 추가
            eventToCard($newCard);

            // 카드 배치 후 카드 등록 폼 제거
            $currentCard.after($newCard);
            $currentCard.style.display = DISPLAY.NONE;

            // 데이터 반영
            let currentStatus = findColumnStatusByCard($newCard);
            addCardJSON(currentStatus, cardTitle, updatedContent, $newCard.getAttribute(CARD_ID));

            // 메뉴 update
            if (isUpdated) {
                updatedStatus = findColumnStatusByCard($prevCard);
                $prevCard.remove();
                $currentCard.remove();
                prevContent = $prevCard.querySelector(".card-content").innerHTML;
            }
            // 메뉴 add
            else {
                menuLogAdd(findCardHeaderName($currentCard), cardTitle);
            }

            // 메뉴 update (update 사항이 있는 경우 메뉴 바에 반영)
            if (isUpdated && prevContent != updatedContent) {
                const columnName = statusListOnLocal[updatedStatus][STATUS.NAME];
                menuLogUpdate(columnName, cardTitle);
            }
        }
    ])
}

/** 카드에 더블 클릭 이벤트를 등록합니다. */
const doubleClickEventToCard = ($card) =>
    addEvent($card, [() => changeCardToRegisterForm($card)], EVENT.DOUBLE_CLICK)

/**
 * 카드를 등록 폼 형태로 바꾸어줍니다.
 * @param {Node} $card 카드 객체
 */
function changeCardToRegisterForm($card) {
    const title = findCardTitle($card);
    const content = findCardContent($card);
    const status = findColumnStatusByCard($card);

    deleteCardData(status, $card.getAttribute(CARD_ID));
    $card.before(newCardTemplate(title, content, $card, true));
    $card.style.display = DISPLAY.NONE;
}

/** 사용자 입력에 따라 카드 등록 폼 형태의 크기를 조절해줍니다. */
function resizeCardByInputBox($cardRegisterInput, $cardRegisterForm) {
    let scrollHeight = 0;

    addEvent($cardRegisterInput, [
        () => {
            if (scrollHeight < $cardRegisterInput.scrollHeight) {
                $cardRegisterForm.style.height ?
                    $cardRegisterForm.style.height = parseInt($cardRegisterForm.style.height) + CARD.TEXT_HEIGTH + "vh" :
                    $cardRegisterForm.style.height = CARD.HEIGHT + CARD.TEXT_HEIGTH + "vh";
            }

            scrollHeight = $cardRegisterInput.scrollHeight;
        }
    ], EVENT.INPUT);
}

/**
 * 카드 내용을 개행을 기준으로 구분하여 반환합니다.
 * @param {String} cardContent 카드 내용
 * @returns 개행 문자가 포함된 카드 내용
 */
const parseCardContentByNewLine = (cardContent) => pipe(
    (cardContent) => cardContent.split("\n"),
    (cardContentArray) => cardContentArray.join("<br>")
)(cardContent);

export {
    eventToNewCardBtn, eventToCardDeleteBtn,
    eventToMakeCardCancelBtn, eventToMakeNewCardBtn, resizeCardByInputBox, findCardByTitle,
    doubleClickEventToCard, deleteCard, findCardTitle, deleteAllCards, $chosenCard, parseCardContentByNewLine
}