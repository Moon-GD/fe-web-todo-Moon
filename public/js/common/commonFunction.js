
import { MONTH, DATE, HOUR, MINUTE, MOUSE_OVER, MOUSE_LEAVE } from "./commonVariable.js";
import { mainTag } from "../component/column.js";
import { makeCardDragEvent } from "../drag/addDragEvent.js";
import { statusList, statusNameList, JSON_DATA } from "../store/store.js";
import { columnTemplate, cardTemplate } from "../templates/template.js";

// parentNode 다음에 childNode를 추가합니다.
function addChildAfterParent(parentNode, childNode) { parentNode.after(childNode); }

// (target)의 css (key)를 (value)로 바꿉니다.
function changeCSS(targetNode, key, value) {
    targetNode.style[key] = value;
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

// 현재 시간을 string으로 파싱하여 반환합니다.
function getCurrentTimeInString() {
    const dateObject = new Date();

    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    
    return `${month}월 ${day}일 ${hour}시 ${minute}분`;
}

// 시간 string을 배열로 반환합니다.
function timeStringToArray(timeString) {
    // "1월 1일 1시 1분"
    const splitPoints = ["월", "일", "시", "분"];
    // [월, 일, 시, 분]
    let listToBeReturned = [];

    // 월, 일, 시, 분 순서로 자릅니다.
    for(const [splitIndex, splitValue] of splitPoints.entries()) {
        timeString = timeString.split(splitValue);
        listToBeReturned[splitIndex] = timeString[0];
        timeString = timeString[1]
    }

    return listToBeReturned;
}

// 시간 차이를 구하여 string으로 반환합니다.
function getElapsedTime(timeArray) {
    const currentTime = new Date();
    const currentMonth = currentTime.getMonth() + 1;
    const currentDate = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if(timeArray[MONTH] != currentMonth) { return `${currentMonth - timeArray[MONTH]}달 전`; }
    else if(timeArray[DATE] != currentDate) { return `${currentDate - timeArray[DATE]}일 전`; }
    else if(timeArray[HOUR] != currentHour) { return `${currentHour - timeArray[HOUR]}시간 전`; }
    else if(timeArray[MINUTE] != currentMinute) { return `${currentMinute - timeArray[MINUTE]}분 전`; }
    else { return '방금'; }
}

// 노드에 시간을 저장합니다.
function saveTimeInTimeNode(timeNode, parsedTime) { timeNode.setAttribute("data-time", parsedTime); }

function addEventToTimeNode(timeNode) {
    const timeNodeContent = timeNode.textContent;

    timeNode.addEventListener(MOUSE_OVER, () => {
       timeNode.textContent = timeNode.dataset.time;
    })

    timeNode.addEventListener(MOUSE_LEAVE, () => {
       timeNode.textContent = timeNodeContent;
    })
}

export {
    changeCSS, addChildAfterParent, 
    getCurrentTimeInString, timeStringToArray, getElapsedTime,
    saveTimeInTimeNode, addEventToTimeNode,
    loadInitialData
}