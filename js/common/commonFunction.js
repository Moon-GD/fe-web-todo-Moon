import { statusList, statusNameList, JSON_DATA } from "../json_data/json_data.js";
import { mainTag, addEventToFabBtn } from "../component/column.js";
import { columnTemplate, cardTemplate } from "../templates/template.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { addEventToMenuBtns } from "../component/menu.js";
import { addEventToModalButtons, addEventToFabButton } from "../component/modal.js";

// (target)의 css (key)를 (value)로 바꿉니다.
function changeCSS(targetNode, key, value) {
    targetNode.style[key] = value
}

// parentNode 다음에 childNode를 추가합니다.
function addChildAfterParent(parentNode, childNode) {
    parentNode.after(childNode)
}

// 카드의 제목을 찾아줍니다.
function findCardTitle(card) {
    const cardTitleText = card.querySelector("h3").innerHTML
    const cardTitle = cardTitleText.split('\n')[0];

    return cardTitle;
}

// 카드의 내용을 찾아줍니다.
function findCardContent(card) {
    const cardContent = card.querySelector(".card-content").innerHTML;

    return cardContent;
}

// 초기 데이터를 불러와 column, card를 생성합니다.
function loadInitialData() {
    statusList.forEach((status) => {
        let newColumn = columnTemplate(statusNameList[status], JSON_DATA[status].length);
        let cardArea = newColumn.querySelector("article");
        
        JSON_DATA[status].forEach((data) => {
            let newCard = cardTemplate(data.title, data.content, data.author);
            makeCardDragEvent(newCard);
    
            cardArea.prepend(newCard);
        })
        
        mainTag.appendChild(newColumn);
    })
}

// 웹 페이지에 필요한 이벤트를 추가합니다.
function addEventsToWebsite() {
    addEventToMenuBtns();
    addEventToModalButtons();
    addEventToFabButton();
    loadInitialData();
    addEventToFabBtn();
}

export {
    changeCSS, addChildAfterParent, findCardTitle, findCardContent, addEventsToWebsite
}