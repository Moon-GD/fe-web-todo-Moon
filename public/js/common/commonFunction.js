import { EVENT } from "./commonVariable.js";

/** parentNode 다음에 childNode를 추가합니다. */
function addChildAfterParent($parent, $child) { $parent.after($child); }

/** (target)의 css (key)를 (value)로 바꿉니다. */
function changeCSS($target, key, value) { $target.style[key] = value; }

/** pipe 헬퍼 함수 */
const pipe = (...functionList) => (pipeParam) => 
    functionList.reduce((curValue, curFunc) => { 
        return curFunc(curValue);
    }, pipeParam)
/**
 * targetNode에 이벤트를 추가합니다.
 * @param {Node} targetNode 이벤트 대상 객체
 * @param {Array} callBackArray 콜백 함수 배열
 * @param {String} eventType 이벤트 종류
 */
const addEvent = (targetNode, callBackArray, eventType=EVENT.CLICK) => {
    callBackArray.forEach((callBack) => targetNode.addEventListener(eventType, callBack));
}

export { changeCSS, addChildAfterParent, pipe, addEvent }