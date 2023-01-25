import { addEvent, pipe } from "../../common/commonFunction.js";
import { LOG_TIME, EVENT } from "../../common/commonVariable.js";

/** 현재 시간을 배열로 반환합니다.
 * @returns [월, 일, 시, 분]
 */
const getCurrentTime = () => pipe(
    (dateObj) => [dateObj.getMonth() + 1, dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes()]
)(new Date());

/**
 * 현재 시간을 문자열로 반환합니다
 * @returns ex : "1월 2일 3시 4분"
 */
const timeToStringFormat = () => pipe(
    ([month, day, hour, minute]) => `${month}월 ${day}일 ${hour}시 ${minute}분`
)(getCurrentTime());

/**
 * 시간 문자열을 배열로 반환합니다.
 * @param {String} timeString ex : "1월 2일 3시 4분"
 * @returns [1, 2, 3, 4]
 */
const timeStringToArray = (timeString) => pipe(
    ([splitArray, timeString, arrayToBeReturned]) => {
        splitArray.forEach((splitValue, splitIndex) => {
            timeString = timeString.split(splitValue);
            arrayToBeReturned[splitIndex] = timeString[0];
            timeString = timeString[1]
        })

        return arrayToBeReturned;
    }
)([["월", "일", "시", "분"], timeString, []]);

/**
 * 시간 배열을 기준으로 현재 시간과의 차이를 반환합니다.
 * @param {Array} timeArray
 * @returns {String} "방금" || "1분 전" || "2시간 전" || "3일 전" || "4달 전"
 */
const getElapsedTimeByTimeArray = (timeArray) => pipe(
    ([month, day, hour, minute]) => {
        if (timeArray[LOG_TIME.MONTH] != month)
            return `${month - timeArray[LOG_TIME.MONTH]}달 전`;
        else if (timeArray[LOG_TIME.DATE] != day)
            return `${day - timeArray[LOG_TIME.DATE]}일 전`;
        else if (timeArray[LOG_TIME.HOUR] != hour)
            return `${hour - timeArray[LOG_TIME.HOUR]}시간 전`;
        else if (timeArray[LOG_TIME.MINUTE] != minute)
            return `${minute - timeArray[LOG_TIME.MINUTE]}분 전`;
        else return '방금';
    }
)(getCurrentTime());

/**
 * 타겟 객체의 dateset에 시간을 저장합니다.
 * @param {Node} $target 타겟 객체
 * @param {String} timeString "1월 2일 3시 4분"
 */
const saveTimeStringOnTimeNode = ($target, timeString) => $target.setAttribute("data-time", timeString);

/**
 * 타깃 객체에 현재 시간과의 차이를 기록합니다.
 * @param {Node} $target 타깃 객체
 */
const recordElapsedTimeOnTarget = ($target) => pipe(
    () => timeToStringFormat(),
    (timeString) => {
        saveTimeStringOnTimeNode($target, timeString);
        return timeStringToArray(timeString);
    },
    (timeArray) => $target.textContent = getElapsedTimeByTimeArray(timeArray)
)()

/**
 * 타겟 객체에 mouse over/out 이벤트를 추가합니다.
 * @param {Node} $target 타겟 객체
 */
function eventToTimeNode($target) {
    const timeNodeContent = $target.textContent;

    addEvent($target, [() => $target.textContent = $target.dataset.time], EVENT.MOUSE_OVER);
    addEvent($target, [() => $target.textContent = timeNodeContent], EVENT.MOUSE_LEAVE);
}

export {
    timeToStringFormat, timeStringToArray, getElapsedTimeByTimeArray,
    recordElapsedTimeOnTarget, saveTimeStringOnTimeNode, eventToTimeNode
}