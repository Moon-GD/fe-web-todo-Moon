import { querySelector } from "../../devUtils/querySelector.js";
import { timeStringToArray, getElapsedTimeByTimeArray } from "./menuLogTime.js";
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
import { STATUS } from "../../common/commonVariable.js";

const $menuBar = querySelector("#menu");
const $menuContent = querySelector("#menu-content")

/** 메뉴에 add log를 남깁니다. */
function menuLogAdd(columnName, cardTitle) {
    makeCreateMenuJSON(columnName, cardTitle);
    $menuContent.prepend(menuLogAddTemplate(columnName, cardTitle));
}

/** 메뉴에 delete log를 남깁니다. */
function menuLogDelete(columnName, cardTitle, cardContent) {
    makeDeleteMenuJSON(columnName, cardTitle, cardContent)
    $menuContent.prepend(menuLogDeleteTemplate(columnName, cardTitle, cardContent));
}

/** 메뉴에 delete all log를 남깁니다. */
function menuLogDeleteAll() {
    makeDeleteAllMenuJSON()
    $menuContent.prepend(menuLogDeleteAllTemplate());
}

/** 메뉴에 move log를 남깁니다. */
function menuLogMove(prevColumnName, nextColumnName, cardTitle) {
    if(prevColumnName === nextColumnName) { return; }
    makeMoveMenuJSON(prevColumnName, nextColumnName, cardTitle);
    $menuContent.prepend(menuLogMoveTemplate(prevColumnName, nextColumnName, cardTitle));
}

/** 메뉴에 update log를 남깁니다. */
function menuLogUpdate(status, cardTitle) {
    makeUpdateMenuJSON(status, cardTitle);
    const columnName = statusListOnLocal[status][STATUS.NAME];
    $menuContent.prepend(menuLogUpdateTemplate(columnName, cardTitle));
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