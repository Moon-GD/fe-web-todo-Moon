
import { 
    MONTH, DATE, HOUR, MINUTE, 
    MOUSE_OVER, MOUSE_LEAVE 
} from "./commonVariable.js";

/** parentNode 다음에 childNode를 추가합니다. */
function addChildAfterParent($parentNode, $childNode) { $parentNode.after($childNode); }

/** (target)의 css (key)를 (value)로 바꿉니다. */
function changeCSS($targetNode, key, value) { $targetNode.style[key] = value; }

/** 현재 시간을 string으로 파싱하여 반환합니다. */
function getCurrentTimeInString() {
    const dateObject = new Date();

    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    
    return `${month}월 ${day}일 ${hour}시 ${minute}분`;
}

/** 시간 string을 배열로 반환합니다. */
function timeStringToArray(timeString) {
    // "1월 1일 1시 1분"
    const splitPoints = ["월", "일", "시", "분"];

    // [월, 일, 시, 분]
    let timeList = [];

    // 월, 일, 시, 분 순서로 자릅니다.
    for(const [splitIndex, splitValue] of splitPoints.entries()) {
        timeString = timeString.split(splitValue);
        timeList[splitIndex] = timeString[0];
        timeString = timeString[1]
    }

    return timeList;
}

/** 시간 차이를 구하여 string으로 반환합니다. */
function getElapsedTime(timeList) {
    const currentTime = new Date();
    const currentMonth = currentTime.getMonth() + 1;
    const currentDate = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if(timeList[MONTH] != currentMonth) { return `${currentMonth - timeList[MONTH]}달 전`; }
    else if(timeList[DATE] != currentDate) { return `${currentDate - timeList[DATE]}일 전`; }
    else if(timeList[HOUR] != currentHour) { return `${currentHour - timeList[HOUR]}시간 전`; }
    else if(timeList[MINUTE] != currentMinute) { return `${currentMinute - timeList[MINUTE]}분 전`; }
    else { return '방금'; }
}

/** 노드에 시간을 저장합니다. */
function saveTimeInTimeNode(timeNode, parsedTime) { timeNode.setAttribute("data-time", parsedTime); }

/** 시간 노드에 이벤트를 추가합니다. */
function addEventToTimeNode(timeNode) {
    const timeNodeContent = timeNode.textContent;

    timeNode.addEventListener(MOUSE_OVER, () => { timeNode.textContent = timeNode.dataset.time; })
    timeNode.addEventListener(MOUSE_LEAVE, () => { timeNode.textContent = timeNodeContent; })
}

export {
    changeCSS, addChildAfterParent, 
    getCurrentTimeInString, timeStringToArray, getElapsedTime,
    saveTimeInTimeNode, addEventToTimeNode
}