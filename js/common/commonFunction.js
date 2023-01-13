
import { 
    addEventToFabBtn, addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton 
} from "../component/button.js";
import { mainTag } from "../component/column.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { statusList, statusNameList, JSON_DATA } from "../json_data/json_data.js";
import { columnTemplate, cardTemplate } from "../templates/template.js";

// parentNode 다음에 childNode를 추가합니다.
function addChildAfterParent(parentNode, childNode) {
    parentNode.after(childNode)
}

// (target)의 css (key)를 (value)로 바꿉니다.
function changeCSS(targetNode, key, value) {
    targetNode.style[key] = value
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
    loadInitialData();
    addEventToMenuBtns();
    addEventToModalButtons();
    addEventToColumnAddButton();
    addEventToFabBtn();
}

export {
    changeCSS, addChildAfterParent, addEventsToWebsite
}