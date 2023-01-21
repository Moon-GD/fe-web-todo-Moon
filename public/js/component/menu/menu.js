import { querySelector } from "../../devUtils/querySelector.js";
import { timeStringToArray, getElapsedTime } from "./menuLogTime.js";
import { 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, 
    menuSearchTemplate, menuLogDeleteAllTemplate
} from "../../templates/template.js";
import { makeCreateMenuJSON } from "../../../../server/menu/create_menu/makeCreateMenu.js";
import { makeDeleteMenuJSON } from "../../../../server/menu/delete_menu/makeDeleteMenu.js";
import { makeSearchMenuJSON } from "../../../../server/menu/search_menu/makeSearchMenu.js";
import { searchLogManger } from "../../search/searchLogManager.js";
import { makeDeleteAllMenuJSON } from "../../../../server/menu/delete_menu/makeDeleteAllMenu.js";
import { makeUpdateMenuJSON } from "../../../../server/menu/update_menu/makeUpdateMenu.js";
import { makeMoveMenuJSON } from "../../../../server/menu/move_menu/makeMoveMenu.js";

const $menuBar = querySelector("#menu");
const $menuContent = querySelector("#menu-content")

/** 메뉴에 add log를 남깁니다. */
function menuLogAdd(title, status, emotion="🥳", author="@sam") {
    makeCreateMenuJSON(status, title);
    $menuContent.prepend(menuLogAddTemplate(title, status, emotion, author));
}

/** 메뉴에 delete log를 남깁니다. */
function menuLogDelete(title, status, emotion="🥳", author="@sam") {
    makeDeleteMenuJSON(status, title)
    $menuContent.prepend(menuLogDeleteTemplate(title, status, emotion, author));
}

/** 메뉴에 delete all log를 남깁니다. */
function menuLogDeleteAll(emotion="🥳", author="@sam") {
    makeDeleteAllMenuJSON()
    $menuContent.prepend(menuLogDeleteAllTemplate(emotion, author));
}

/** 메뉴에 move log를 남깁니다. */
function menuLogMove(cardTitle, prevColumnName, nextColumnName, emotion="🥳", author="@sam") {
    if(prevColumnName === nextColumnName) { return; }
    makeMoveMenuJSON(prevColumnName, nextColumnName, cardTitle);
    $menuContent.prepend(menuLogMoveTemplate(cardTitle, prevColumnName, nextColumnName, emotion, author));
}

/** 메뉴에 update log를 남깁니다. */
function menuLogUpdate(title, status, emotion="🥳", author="@sam") {
    makeUpdateMenuJSON(status, title);
    $menuContent.prepend(menuLogUpdateTemplate(title, status, emotion, author));
}

/** 메뉴에 search log를 남깁니다. */
function menuLogSearch(searchLog, emotion="🥳", author="@sam") {
    makeSearchMenuJSON(searchLog, searchLogManger.getSearchCount(searchLog))
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