import { querySelector } from "../../devUtils/querySelector.js";
import { timeStringToArray, getElapsedTime } from "./menuLogTime.js";
import { 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, 
    menuSearchTemplate, menuLogDeleteAllTemplate
} from "../../templates/template.js";
import { createMenuJSON } from "../../../../server/menu/create_menu/createMenu.js";

const $menuBar = querySelector("#menu");
const $menuContent = querySelector("#menu-content")

/** 메뉴에 add log를 남깁니다. */
function menuLogAdd(title, status, emotion="🥳", author="@sam") {
    createMenuJSON(status, title);
    $menuContent.prepend(menuLogAddTemplate(title, status, emotion, author));
}

/** 메뉴에 delete log를 남깁니다. */
function menuLogDelete(title, status, emotion="🥳", author="@sam") {
    $menuContent.prepend(menuLogDeleteTemplate(title, status, emotion, author));
}

/** 메뉴에 delete all log를 남깁니다. */
function menuLogDeleteAll(emotion="🥳", author="@sam") {
    $menuContent.prepend(menuLogDeleteAllTemplate(emotion, author));
}

/** 메뉴에 move log를 남깁니다. */
function menuLogMove(title, prevStatus, nextStatus, emotion="🥳", author="@sam") {
    if(prevStatus == nextStatus) { return; }
    
    $menuContent.prepend(menuLogMoveTemplate(title, prevStatus, nextStatus, emotion, author));
}

/** 메뉴에 update log를 남깁니다. */
function menuLogUpdate(title, status, emotion="🥳", author="@sam") {
    $menuContent.prepend(menuLogUpdateTemplate(title, status, emotion, author));
}

/** 메뉴에 search log를 남깁니다. */
function menuLogSearch(searchLog, emotion="🥳", author="@sam") {
    $menuContent.prepend(menuSearchTemplate(searchLog, emotion, author));
}

/** 메뉴 log 시간을 업데이트합니다. */
function menuLogTimeUpdate() {
    const $logFrameList = document.querySelectorAll(".log-frame");

    for(const $logFrame of $logFrameList) {
        const $timeNode = $logFrame.querySelector(".log-time");
        const timeString = $timeNode.dataset.time;
        const timeArray = timeStringToArray(timeString);
        const elapsedTimeString = getElapsedTime(timeArray);
        $timeNode.textContent = elapsedTimeString;
    }
}

export { 
    $menuBar, 
    menuLogAdd, menuLogDelete, menuLogDeleteAll, menuLogMove, menuLogUpdate, menuLogSearch, 
    menuLogTimeUpdate 
}