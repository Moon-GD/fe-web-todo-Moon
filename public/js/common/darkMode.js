import { addEvent } from "./commonFunction.js";
import { multiQuerySelector } from "../devUtils/querySelector.js";

const [$body, bulbArea] = multiQuerySelector(["body", "#bulb-area"]);

/** card에 부여된 css를 초기화합니다. */
function initializeCardCSS() {
    const $cardArray = document.querySelectorAll(".card-frame");
    $cardArray.forEach(($card) => $card.style = "");
}

/** 현재 dark mode 인지 여부를 반환합니다.
 * @returns {Boolean} true / false
 */
DOMTokenList.prototype.includes = String.prototype.includes;
const isDarkMode = () => $body.classList.includes("dark-mode");

/** 전구 아이콘 구역에 다크 모드 토글 이벤트를 추가합니다. */
function eventToBulbs() {
    addEvent(bulbArea, [
        () => $body.classList.toggle("dark-mode"),
        () => initializeCardCSS()
    ]);
}

export { eventToBulbs, isDarkMode }