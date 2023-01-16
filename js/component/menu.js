import { timeStringToArray, getElapsedTime } from "../common/commonFunction.js";
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
    menuContent.prepend(menuLogDeleteTemplate(title, status, emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (delete all)
function menuLogDeleteAll(emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogDeleteAllTemplate(emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (move)
function menuLogMove(title, prevStatus, nextStatus, emotion="🥳", author="@sam") {
    if(prevStatus == nextStatus) { return ; }
    
    menuContent.prepend(menuLogMoveTemplate(title, prevStatus, nextStatus, emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (update)
function menuLogUpdate(title, status, emotion="🥳", author="@sam") {
    menuContent.prepend(menuLogUpdateTemplate(title, status, emotion, author));
}

// 메뉴 바에 기록을 남깁니다. (search)
function menuLogSearch(searchLog, emotion="🥳", author="@sam") {
    menuContent.prepend(menuSearchTemplate(searchLog, emotion, author));
}

// 메뉴 바 로그의 시간을 업데이트합니다.
function menuLogTimeUpdate() {
    const logFrameList = document.querySelectorAll(".log-frame");

    for(const logFrame of logFrameList) {
        const timeNode = logFrame.querySelector(".log-time");
        const timeString = timeNode.dataset.time;
        const timeArray = timeStringToArray(timeString);
        const elapsedTimeString = getElapsedTime(timeArray);
        timeNode.textContent = elapsedTimeString;
    }
}

export { 
    menuBar, 
    menuLogAdd, menuLogDelete, menuLogDeleteAll, menuLogMove, menuLogUpdate, menuLogSearch, 
    menuLogTimeUpdate 
}