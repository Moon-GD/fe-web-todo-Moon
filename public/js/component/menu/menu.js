import { querySelector } from "../../devUtils/querySelector.js";
import { timeStringToArray, getElapsedTime, getElapsedTimeByTimeArray } from "./menuLogTime.js";
import { 
    menuLogAddTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, 
    menuSearchTemplate, menuLogDeleteAllTemplate
} from "../../templates/template.js";
import { makeCreateMenuJSON } from "../../../../server/menu/action/cardCreation.js";
import { makeDeleteMenuJSON } from "../../../../server/menu/action/cardDeletion.js";
import { makeSearchMenuJSON } from "../../../../server/menu/action/search.js";
import { searchLogManger } from "../../search/searchLogManager.js";
import { makeDeleteAllMenuJSON } from "../../../../server/menu/action/cardDeletionAll.js";
import { makeUpdateMenuJSON } from "../../../../server/menu/action/cardUpdation.js";
import { makeMoveMenuJSON } from "../../../../server/menu/action/cardMove.js";
import { pipe } from "../../common/commonFunction.js";

const $menuBar = querySelector("#menu");
const $menuContent = querySelector("#menu-content")

/** 메뉴에 add log를 남깁니다. */
function menuLogAdd(title, status) {
    makeCreateMenuJSON(status, title);
    $menuContent.prepend(menuLogAddTemplate(title, status));
}

/** 메뉴에 delete log를 남깁니다. */
function menuLogDelete(title, status, cardContent) {
    makeDeleteMenuJSON(status, title, cardContent)
    $menuContent.prepend(menuLogDeleteTemplate(title, cardContent, status));
}

/** 메뉴에 delete all log를 남깁니다. */
function menuLogDeleteAll() {
    makeDeleteAllMenuJSON()
    $menuContent.prepend(menuLogDeleteAllTemplate());
}

/** 메뉴에 move log를 남깁니다. */
function menuLogMove(cardTitle, prevColumnName, nextColumnName) {
    if(prevColumnName === nextColumnName) { return; }
    makeMoveMenuJSON(prevColumnName, nextColumnName, cardTitle);
    $menuContent.prepend(menuLogMoveTemplate(cardTitle, prevColumnName, nextColumnName));
}

/** 메뉴에 update log를 남깁니다. */
function menuLogUpdate(title, status) {
    makeUpdateMenuJSON(status, title);
    $menuContent.prepend(menuLogUpdateTemplate(title, status));
}

/** 메뉴에 search log를 남깁니다. */
function menuLogSearch(searchLog) {
    makeSearchMenuJSON(searchLog, searchLogManger.getSearchCount(searchLog))
    $menuContent.prepend(menuSearchTemplate(searchLog));
}

/** 메뉴 log 시간을 업데이트합니다. */
function menuLogTimeUpdate() {
    const $timeNodeList = document.querySelectorAll(".log-time");
    $timeNodeList.forEach(($timeNode) => {
        pipe(
            ($timeNode) => $timeNode.dataset.time,
            (timeString) => timeStringToArray(timeString),
            (timeArray) => getElapsedTimeByTimeArray(timeArray),
            (timeDiff) => $timeNode.textContent = timeDiff
        )($timeNode)
    })
}

export { 
    $menuBar, 
    menuLogAdd, menuLogDelete, menuLogDeleteAll, menuLogMove, menuLogUpdate, menuLogSearch, 
    menuLogTimeUpdate 
}