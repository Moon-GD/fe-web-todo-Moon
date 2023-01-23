import { LOG_TIME, EVENT } from "../../common/commonVariable.js";

function getCurrentTime() {
    const dateObject = new Date();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();

    return [month, day, hour, minute];
}

/** 현재 시간을 string으로 파싱하여 반환합니다. */
function timeToStringFormat() {
    const [month, day, hour, minute] = getCurrentTime();
    return `${month}월 ${day}일 ${hour}시 ${minute}분`;
}

/** 시간 string을 배열로 반환합니다. */
function timeStringToArray(timeString) {
    const splitPoints = ["월", "일", "시", "분"];
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
    const [month, day, hour, minute] = getCurrentTime();

    if(timeList[LOG_TIME.MONTH] != month) { return `${month - timeList[LOG_TIME.MONTH]}달 전`; }
    else if(timeList[LOG_TIME.DATE] != day) { return `${day - timeList[LOG_TIME.DATE]}일 전`; }
    else if(timeList[LOG_TIME.HOUR] != hour) { return `${hour - timeList[LOG_TIME.HOUR]}시간 전`; }
    else if(timeList[LOG_TIME.MINUTE] != minute) { return `${minute - timeList[LOG_TIME.MINUTE]}분 전`; }
    else { return '방금'; }
}

/** 노드에 시간을 저장합니다. */
function saveTimeInTimeNode(timeNode, parsedTime) { timeNode.setAttribute("data-time", parsedTime); }

/** 시간 노드에 이벤트를 추가합니다. */
function addEventToTimeNode(timeNode) {
    const timeNodeContent = timeNode.textContent;

    timeNode.addEventListener(EVENT.MOUSE_OVER, () => { timeNode.textContent = timeNode.dataset.time; })
    timeNode.addEventListener(EVENT.MOUSE_LEAVE, () => { timeNode.textContent = timeNodeContent; })
}

export { 
    timeToStringFormat, timeStringToArray,
    getElapsedTime, saveTimeInTimeNode, addEventToTimeNode
}