import { pipe } from "../common/commonFunction.js";
import { SEARCH_CARD, ONE_SECOND, SEARCH_CARD_DARK_MODE } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { menuLogSearch } from "../component/menu/menu.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "./searchLogManager.js";
import { isDarkMode } from "../common/darkMode.js";

const $searchModal = querySelector("#search-modal-section");
const $searchInput = querySelector("#search-input");
const $suggestedSearchText = querySelector("#suggested-search-log");

/**
 * 해당하는 제목을 가진 모든 카드 객체를 배열로 반환합니다.
 * @param {String} title 카드 제목
 * @returns 카드 객체 배열
 */
const getCardArrayByTitle = (title) => pipe(
    () => document.querySelectorAll("div.card-frame"),
    ($cardList) => $cardList.filter(($card) => findCardTitle($card).indexOf(title) != -1)
)();

/**
 * 카드의 색깔을 1초간 변경합니다.
 * @param {Array} $cardList 카드 객체 배열
 */
const changeCardColorTemporary = ($cardList) => {
    $cardList.forEach(($card) => {
        isDarkMode() ?
                $card.style.outline = SEARCH_CARD_DARK_MODE.OUTLINE:
                $card.style.outline = SEARCH_CARD.OUTLINE;
        
        setTimeout(() => {
            $card.style.transition = ONE_SECOND;
            isDarkMode() ?
                    $card.style.outline = SEARCH_CARD_DARK_MODE.ORIGINAL:
                    $card.style.outline = SEARCH_CARD.ORIGINAL;
        }, 1000);
    })
}

/**
 * 카드를 검색합니다.
 * @param {String} searchInputValue 검색어
 */
function searchCard(searchInputValue) {
    searchLogManger.addNewSearchLog(searchInputValue);
    changeCardBackGroundColor(searchInputValue);
    menuLogSearch(searchInputValue);
}

/**
 * 카드를 검색하고 배경색을 잠시 변경합니다.
 * @param {String} cardTitle 카드 제목
 */
function changeCardBackGroundColor(cardTitle) {
    pipe(
        getCardArrayByTitle,
        changeCardColorTemporary,
    )(cardTitle)
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