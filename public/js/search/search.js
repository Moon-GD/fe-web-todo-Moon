import { findCardTitle } from "../component/card.js";
import { menuLogSearch } from "../component/menu.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "./searchLogManager.js";

const $searchModal = querySelector("#search-modal-section");
const $searchInput = querySelector("#search-input");
const $suggestedSearchText = querySelector("#suggested-search-log");

// 카드를 검색합니다.
function searchCard(searchInputValue) {
    // 검색 기록 매니저에 새로운 검색 데이터를 추가해줍니다
    searchLogManger.addNewSearchLog(searchInputValue);

    // 검색된 기록에 해당하는 카드의 색상을 변경해줍니다.
    changeCardBackGroundColor(searchInputValue);

    // 메뉴에 기록을 남깁니다.
    menuLogSearch(searchInputValue);
}

// 카드의 색깔을 배경색을 일시적으로 바꾸어줍니다.
function changeCardBackGroundColor(findTitle) {
    const $cardNodeList = document.querySelectorAll("div.card-frame");
    let $findingCardList = [];

    $cardNodeList.forEach(($cardNode) => {
        if(findCardTitle($cardNode).indexOf(findTitle) != -1) {
            $findingCardList.push($cardNode);
        }
    })

    $findingCardList.forEach(($findingCardNode) => {
        $findingCardNode.style.outline = "0.2vh solid red";
        
        setTimeout(() => {
            $findingCardNode.style.transition = "1s";
            $findingCardNode.style.outline = "0.2vh solid #fff";
        }, 1000);
    })
}

// 추천 검색어를 보여줍니다.
function showSuggestedLog() {
    if(searchLogManger.suggestLog()) {  $suggestedSearchText.innerHTML = "#" + searchLogManger.suggestLog(); }
    else { $suggestedSearchText.innerHTML = "아직 없습니다."; }
}

export {
    $searchModal, $searchInput, searchCard,
    showSuggestedLog
}