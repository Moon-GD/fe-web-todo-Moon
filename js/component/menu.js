import { querySelector } from "../devUtils/querySelector.js";
import { 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, menuSearchTemplate, menuLogDeleteAllTemplate
} from "../templates/template.js";

const menuBar = querySelector("#menu");
const menuContent = querySelector("#menu-content")

// 메뉴 바에 기록을 남깁니다. (add)
function menuLogAdd(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogAddTemplate(title, status, emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (delete)
function menuLogDelete(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogDeleteTemplate(title, status, emotion, author))
}

// 메뉴 바에 기록을 남깁니다. (delete all)
function menuLogDeleteAll(emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogDeleteAllTemplate(emotion, author))
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

// 메뉴 바에 기록을 남깁니다. (search)
function menuLogSearch(searchLog, emotion="🥳", author="@sam") {
    menuContent.prepend(menuSearchTemplate(searchLog, emotion, author));
}

export { menuBar, menuLogAdd, menuLogDelete, menuLogDeleteAll, menuLogMove, menuLogUpdate, menuLogSearch }