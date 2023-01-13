import { changeCSS } from "../common/commonFunction.js";
import { DISPLAY_FLEX, CLICK } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { goSearchModalBtn } from "../component/column.js";
import { menuLogSearch } from "../component/menu.js";
import { turnOffSearchModal } from "../component/modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { searchLogManger } from "./searchLogManager.js";

const searchModal = querySelector("#search-modal-section");
const searchInput = querySelector("#search-input");
const searchCancelBtn = querySelector("#search-cancel-btn");
const searchAcceptBtn = querySelector("#search-accept-btn");
const suggestedSearchText = querySelector("#suggested-search-log");

// 검색 모달을 띄워주는 클릭 이벤트를 추가합니다.
function addEventToSearchBtn() {
    goSearchModalBtn.addEventListener(CLICK, () => {
        changeCSS(searchModal, "display", DISPLAY_FLEX);
        showSuggestedLog();
    })
}

// 검색 모달의 취소 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchCancelBtn() {
    searchCancelBtn.addEventListener(CLICK, turnOffSearchModal);
}

// 검색 모달의 검색 버튼에 클릭 이벤트를 추가합니다.
function addEventToSearchAcceptBtn() {
    searchAcceptBtn.addEventListener(CLICK, () => {
        turnOffSearchModal();
        searchCard(searchInput.value)
        searchInput.value = "";
    })
}

// 카드를 검색합니다.
function searchCard(searchInputValue) {
    // 검색 기록 매니저에 새로운 검색 데이터를 추가해줍니다
    searchLogManger.addNewSearchLog(searchInputValue);

    // 검색된 기록에 해당하는 카드의 색상을 변경해줍니다.
    changeCardBackGroundColor(searchInputValue)

    // 메뉴에 기록을 남깁니다.
    menuLogSearch(searchInputValue);
}

// 카드의 색깔을 배경색을 일시적으로 바꾸어줍니다.
function changeCardBackGroundColor(findTitle) {
    const cards = document.querySelectorAll("div.card-frame");
    let cardNodeList = [];

    cards.forEach((card) => {
        if(findCardTitle(card).indexOf(findTitle) != -1) {
            cardNodeList.push(card);
        }
    })

    cardNodeList.forEach((cardNode) => {
        cardNode.style.outline = "0.2vh solid red";
        
        setTimeout(() => {
            cardNode.style.transition = "1s";
            cardNode.style.outline = "0.2vh solid #fff";
        }, 1000)
    })
}

// 추천 검색어를 보여줍니다.
function showSuggestedLog() {
    if(searchLogManger.suggestLog()) { 
        suggestedSearchText.innerHTML = "#" + searchLogManger.suggestLog();
    }
    else {
        suggestedSearchText.innerHTML = "아직 없습니다."
    }
}

export {
    searchModal,
    addEventToSearchBtn, addEventToSearchCancelBtn, addEventToSearchAcceptBtn
}