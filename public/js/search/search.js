import { pipe } from "../common/commonFunction.js";
import { SEARCHED_CARD_OUTLINE, SEARCHED_CARD_ORIGINAL, ONE_SECOND } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { menuLogSearch } from "../component/menu.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "./searchLogManager.js";

const $searchModal = querySelector("#search-modal-section");
const $searchInput = querySelector("#search-input");
const $suggestedSearchText = querySelector("#suggested-search-log");

const getCardListByTitle = (title) => { 
    let $cardList = document.querySelectorAll("div.card-frame");
    $cardList = $cardList.filter(($card) => findCardTitle($card).indexOf(title) != -1)

    return $cardList;
}

const changeCardColorTemporary = ($cardList) => {
    $cardList.forEach(($card) => {
        $card.style.outline = SEARCHED_CARD_OUTLINE;
        
        setTimeout(() => {
            $card.style.transition = ONE_SECOND;
            $card.style.outline = SEARCHED_CARD_ORIGINAL;
        }, 1000);
    })
}

/** 카드를 검색합니다. */
function searchCard(searchInputValue) {
    searchLogManger.addNewSearchLog(searchInputValue);
    changeCardBackGroundColor(searchInputValue);
    menuLogSearch(searchInputValue);
}

/** 검색된 카드의 배경색을 일시적으로 바꿉니다. */
function changeCardBackGroundColor(findTitle) {
    pipe(
        getCardListByTitle,
        changeCardColorTemporary,
    )(findTitle)
}

/** 추천 검색어를 보여줍니다. */
function showSuggestedLog() {
    searchLogManger.suggestLog() ?
            $suggestedSearchText.innerHTML = "#" + searchLogManger.suggestLog():
            $suggestedSearchText.innerHTML = "아직 없습니다.";
}

export {
    $searchModal, $searchInput, 
    searchCard, showSuggestedLog
}