import { goSearchModalBtn } from "../component/column.js";
import { CLICK } from "../common/commonVariable.js";
import { changeCSS, findCardTitle } from "../common/commonFunction.js";
import { DISPLAY_FLEX } from "../common/commonVariable.js";
import { querySelector } from "../devUtils/querySelector.js";
import { turnOffSearchModal } from "../component/modal.js";

const searchModal = querySelector("#search-modal-section");
const searchInput = querySelector("#search-input");
const searchCancelBtn = querySelector("#search-cancel-btn");
const searchAcceptBtn = querySelector("#search-accept-btn");

// 검색 모달을 띄워주는 클릭 이벤트를 추가합니다.
function addEventToSearchBtn() {
    goSearchModalBtn.addEventListener(CLICK, () => {
        changeCSS(searchModal, "display", DISPLAY_FLEX);
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
    })
}

function searchCard(searchInputValue) {
    const cards = document.querySelectorAll("div.card-frame");
    let cardNodeList = [];

    cards.forEach((card) => {
        if(findCardTitle(card).indexOf(searchInputValue) != -1) {
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

export {
    searchModal,
    addEventToSearchBtn, addEventToSearchCancelBtn, addEventToSearchAcceptBtn
}