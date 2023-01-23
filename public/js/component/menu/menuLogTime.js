import { LOG_TIME, EVENT } from "../../common/commonVariable.js";

/** 현재 시간을 배열로 반환합니다.
 * @returns [월, 일, 시, 분]
 */
function getCurrentTime() {
    const dateObject = new Date();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();

    return [month, day, hour, minute];
}

/**
 * 현재 시간을 문자열로 반환합니다
 * @returns ex : "1월 2일 3시 4분"
 */
function timeToStringFormat() {
    const [month, day, hour, minute] = getCurrentTime();
    return `${month}월 ${day}일 ${hour}시 ${minute}분`;
}

/**
 * 시간 문자열을 배열로 반환합니다.
 * @param {String} timeString ex : "1월 2일 3시 4분"
 * @returns [1, 2, 3, 4]
 */
function timeStringToArray(timeString) {
    const splitPoints = ["월", "일", "시", "분"];
    let timeList = [];

    for(const [splitIndex, splitValue] of splitPoints.entries()) {
        timeString = timeString.split(splitValue);
        timeList[splitIndex] = timeString[0];
        timeString = timeString[1]
    }

    return timeList;
}

/**
 * 시간 차이를 문자열로 반환합니다.
 * @param {Array} timeList 월, 일, 시, 분 정보가 담긴 정수 배열
 * @returns "1달 전" || "2일 전" || "3시간 전" || "4분 전" || 방금
 */
function getElapsedTime(timeList) {
    const [month, day, hour, minute] = getCurrentTime();

    if(timeList[LOG_TIME.MONTH] != month) { return `${month - timeList[LOG_TIME.MONTH]}달 전`; }
    else if(timeList[LOG_TIME.DATE] != day) { return `${day - timeList[LOG_TIME.DATE]}일 전`; }
    else if(timeList[LOG_TIME.HOUR] != hour) { return `${hour - timeList[LOG_TIME.HOUR]}시간 전`; }
    else if(timeList[LOG_TIME.MINUTE] != minute) { return `${minute - timeList[LOG_TIME.MINUTE]}분 전`; }
    else { return '방금'; }
}

/**
 * 메뉴 log 노드의 dateset에 시간을 저장합니다.
 * @param {Node} timeNode 메뉴 log 노드
 * @param {String} timeString "1월 2일 3시 4분"
 */
const saveTimeInTimeNode = (timeNode, timeString) => timeNode.setAttribute("data-time", timeString); 

/**
 * 메뉴 log 노드에 mouse over/out 이벤트를 추가합니다.
 * @param {Node} timeNode 메뉴 log 노드
 */
function eventToTimeNode(timeNode) {
    const timeNodeContent = timeNode.textContent;

    timeNode.addEventListener(EVENT.MOUSE_OVER, () => { timeNode.textContent = timeNode.dataset.time; })
    timeNode.addEventListener(EVENT.MOUSE_LEAVE, () => { timeNode.textContent = timeNodeContent; })
}

export { 
    timeToStringFormat, timeStringToArray,
    getElapsedTime, saveTimeInTimeNode, eventToTimeNode
}