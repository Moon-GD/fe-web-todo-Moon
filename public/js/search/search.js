import { SEARCHED_CARD_OUTLINE, SEARCHED_CARD_ORIGINAL, ONE_SECOND } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { menuLogSearch } from "../component/menu.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "./searchLogManager.js";

const $searchModal = querySelector("#search-modal-section");
const $searchInput = querySelector("#search-input");
const $suggestedSearchText = querySelector("#suggested-search-log");

/** 카드를 검색합니다. */
function searchCard(searchInputValue) {
    searchLogManger.addNewSearchLog(searchInputValue);
    changeCardBackGroundColor(searchInputValue);
    menuLogSearch(searchInputValue);
}

/** 검색된 카드의 배경색을 일시적으로 바꿉니다. */
function changeCardBackGroundColor(findTitle) {
    const $cardNodeList = document.querySelectorAll("div.card-frame");
    let $findingCardList = [];

    $cardNodeList.forEach(($cardNode) => {
        if(findCardTitle($cardNode).indexOf(findTitle) != -1) {
            $findingCardList.push($cardNode);
        }
    })

    $findingCardList.forEach(($findingCardNode) => {
        $findingCardNode.style.outline = SEARCHED_CARD_OUTLINE;
        
        setTimeout(() => {
            $findingCardNode.style.transition = ONE_SECOND;
            $findingCardNode.style.outline = SEARCHED_CARD_ORIGINAL;
        }, 1000);
    })
}

/** 추천 검색어를 보여줍니다. */
function showSuggestedLog() {
    if(searchLogManger.suggestLog()) {  $suggestedSearchText.innerHTML = "#" + searchLogManger.suggestLog(); }
    else { $suggestedSearchText.innerHTML = "아직 없습니다."; }
}

export {
    $searchModal, $searchInput, searchCard,
    showSuggestedLog
}