import { querySelector, multiQuerySelector } from "../devUtils/querySelector.js";
import { changeCSS } from "./commonFunction.js";
import { DISPLAY, EVENT } from "./commonVariable.js";

const [$body, bulbArea, darkBulb, lightBulb] = 
    multiQuerySelector(["body", "#bulb-area", "#go-dark-mode", "#go-light-mode"]);

/** card에 부여된 css를 초기화합니다. */
function initializeCardCSS() {
    const $cardList = document.querySelectorAll(".card-frame");
    $cardList.forEach(($card) => { $card.style = "";})
}

/** 현재 dark mode 인지 여부를 반환합니다.
 * @returns {Boolean} true / false
 */

DOMTokenList.prototype.includes = String.prototype.includes;
const isDarkMode = () => $body.classList.includes("dark-mode")


/** 전구 버튼에 다크 모드 토글 이벤트를 추가합니다. */
function eventToBulbs() {
    bulbArea.addEventListener(EVENT.CLICK, () => {
        console.log(isDarkMode())
        $body.classList.toggle("dark-mode");
        initializeCardCSS()

        if(isDarkMode()) {
            changeCSS(lightBulb, "display", DISPLAY.BLOCK);
            changeCSS(darkBulb, "display", DISPLAY.NONE);
        }
        else {
            changeCSS(lightBulb, "display", DISPLAY.NONE);
            changeCSS(darkBulb, "display", DISPLAY.BLOCK);
        }
    })
}

export { eventToBulbs, isDarkMode }