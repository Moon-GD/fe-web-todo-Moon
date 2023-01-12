import { changeCSS } from "../common/commonFunction.js"
import { MENU_MOVE_DISTANCE, RIGHT, CLICK } from "../common/commonVariable.js";
import { 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate
} from "../templates/template.js";
import { querySelector } from "../devUtils/querySelector.js";

const menuBar = querySelector("#menu");
const menuOpenBtn = querySelector("#menu-open-btn");
const menuCloseBtn = querySelector("#menu-close-btn");
const menuContent = querySelector("#menu-content")

// menu toggle 이벤트 추가
menuOpenBtn.addEventListener(CLICK, () => { changeCSS(menuBar, RIGHT, 0) })
menuCloseBtn.addEventListener(CLICK, () => { changeCSS(menuBar, RIGHT, MENU_MOVE_DISTANCE) })

// 메뉴 바에 기록을 남깁니다. (add)
function menuLogAdd(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogAddTemplate(title, status, emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (delete)
function menuLogDelete(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogDeleteTemplate(title, status, emotion, author))
}

// 메뉴 바에 기록을 남깁니다. (move)
function menuLogMove(title, prevStatus, nextStatus, emotion="🥳", author="@sam") {
    if(prevStatus == nextStatus) { return ; }
    
    menuContent.prepend(menuLogMoveTemplate(title, prevStatus, nextStatus, emotion, author))
}

// 메뉴 바에 기록을 남깁니다. (update)
function menuLogUpdate(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogUpdateTemplate(title, status, emotion, author));
}

export { menuLogAdd, menuLogDelete, menuLogMove, menuLogUpdate }