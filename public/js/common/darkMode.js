import { querySelector } from "../devUtils/querySelector.js";
import { changeCSS } from "./commonFunction.js";
import { DISPLAY, EVENT } from "./commonVariable.js";

const main = document.body;
const darkBulb = querySelector("#go-dark-mode")
const lightBulb = querySelector("#go-light-mode");

function initializeCardCSS() {
    const $cardList = document.querySelectorAll(".card-frame");
    $cardList.forEach(($card) => { $card.style = "";})
}

function isDarkMode() { return main.classList[0] === "dark-mode";}

function eventToBulbs() {
    darkBulb.addEventListener(EVENT.CLICK, () => {
        main.classList.add("dark-mode")
        initializeCardCSS()
        changeCSS(lightBulb, "display", DISPLAY.BLOCK);
        changeCSS(darkBulb, "display", DISPLAY.NONE);
    });

    lightBulb.addEventListener(EVENT.CLICK, () => {
        main.classList.remove("dark-mode")
        initializeCardCSS()
        changeCSS(lightBulb, "display", DISPLAY.NONE);
        changeCSS(darkBulb, "display", DISPLAY.BLOCK);
    });
}

export { eventToBulbs, isDarkMode }