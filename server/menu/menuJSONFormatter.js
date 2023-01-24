import { MENU } from "../../public/js/common/commonVariable.js"
import { findCardByTitle } from "../../public/js/component/card.js"
import { findCardHeaderName } from "../../public/js/component/column.js"
import { menuLogAddTemplate, menuLogDeleteAllTemplate, menuLogDeleteTemplate, menuLogMoveTemplate, menuLogUpdateTemplate, menuSearchTemplate } from "../../public/js/templates/template.js"

/**
 * menu JSON 객체를 반환합니다. (create)
 * @param {Object} menuJSON menu JSON
 * @returns {Object} create menu JSON
 */
function getCreateMenuJSON(menuJSON) {
    return {
        "action":menuJSON[MENU.ACTION],
        "actionTime":menuJSON[MENU.ACTION_TIME],
        "id":menuJSON[MENU.ID],
        "columnName":menuJSON[MENU.COLUMN_NAME],
        "cardTitle":menuJSON[MENU.CARD_TITLE]
    }
}

/**
 * menu JSON 객체를 반환합니다. (update)
 * @param {Object} menuJSON menu JSON
 * @returns {Object} update menu JSON
 */
function getUpdateMenuJSON(menuJSON) {
    return {
        "action":menuJSON[MENU.ACTION],
        "actionTime":menuJSON[MENU.ACTION_TIME],
        "id":menuJSON[MENU.ID],
        "columnName":menuJSON[MENU.COLUMN_NAME],
        "cardTitle":menuJSON[MENU.CARD_TITLE]
    }
}

/**
 * menu JSON 객체를 반환합니다. (delete)
 * @param {*} menuJSON 
 * @returns 
 */
function getDeleteMenuJSON(menuJSON) {
    return {
        "action":menuJSON[MENU.ACTION],
        "actionTime":menuJSON[MENU.ACTION_TIME],
        "id":menuJSON[MENU.ID],
        "columnName":menuJSON[MENU.COLUMN_NAME],
        "cardTitle":menuJSON[MENU.CARD_TITLE],
        "cardContent": menuJSON[MENU.CARD_CONTENT],
        "isRecovered":menuJSON["isRecovered"]
    }
}

/**
 * menu JSON 객체를 반환합니다. (delete all)
 * @param {Object} menuJSON menu JSON
 * @returns {Object} delete all menu JSON
 */
function getDeleteAllMenuJSON(menuJSON) {
    return {
        "action": menuJSON[MENU.ACTION],
        "actionTime":menuJSON[MENU.ACTION_TIME],
        "id":menuJSON[MENU.ID]
    }
}

/**
 * menu JSON 객체를 반환합니다. (move)
 * @param {Object} menuJSON menu JSON
 * @returns {Object} move menu JSON
 */
function getMoveMenuJSON(menuJSON) {
    return {
        "action": menuJSON[MENU.ACTION],
        "actionTime": menuJSON[MENU.ACTION_TIME],
        "id": menuJSON[MENU.ID],
        "prevColumnName": menuJSON[MENU.PREV_COLUMN_NAME],
        "nextColumnName": menuJSON[MENU.NEXT_COLUMN_NAME],
        "cardTitle": menuJSON[MENU.CARD_TITLE]
    }
}

/**
 * menu JSON 객체를 반환합니다. (search)
 * @param {Object} menuJSON menu JSON
 * @returns {Object} search menu JSON
 */
function getSearchMenuJSON(menuJSON) {
    return {
        "action": menuJSON[MENU.ACTION],
        "actionTime": menuJSON[MENU.ACTION_TIME],
        "id": menuJSON[MENU.ID],
        "searchInput": menuJSON[MENU.SEARCH_INPUT],
        "searchFrequency": menuJSON[MENU.SEARCH_FREQUENCY]
    }
}

/** action에 따른 menu JSON 함수를 연결해줍니다. */
const menuJSONFormatter = {
    "CREATE": getCreateMenuJSON,
    "UPDATE": getUpdateMenuJSON,
    "DELETE": getDeleteMenuJSON,
    "DELETE_ALL": getDeleteAllMenuJSON,
    "MOVE": getMoveMenuJSON,
    "SEARCH": getSearchMenuJSON
}

const menuJSONTemplateForMatter = (menuJSON) => {
    const action = menuJSON[MENU.ACTION];
    const actionTime = menuJSON[MENU.ACTION_TIME];
    const columnName = menuJSON[MENU.COLUMN_NAME];
    const prevColumnName = menuJSON[MENU.PREV_COLUMN_NAME];
    const nextColumnName = menuJSON[MENU.NEXT_COLUMN_NAME];
    const cardTitle = menuJSON[MENU.CARD_TITLE];
    const cardContent = menuJSON[MENU.CARD_CONTENT];
    const searchInPut = menuJSON[MENU.SEARCH_INPUT];
    const searchFrequency = menuJSON[MENU.ACTION.SEARCH_FREQUENCY];
    const isRecovered = menuJSON[MENU.isRecovered];

    if(action == "CREATE") return menuLogAddTemplate(columnName, cardTitle, actionTime);
    else if(action == "UPDATE") return menuLogUpdateTemplate(columnName, cardTitle, actionTime);
    else if(action == "MOVE") return menuLogMoveTemplate(prevColumnName, nextColumnName, cardTitle, actionTime);
    else if(action == "DELETE_ALL") return menuLogDeleteAllTemplate(actionTime);
    else if(action == "DELETE") return menuLogDeleteTemplate(columnName, cardTitle, cardContent, actionTime, isRecovered);
    else if(action == "SEARCH") return menuSearchTemplate(searchInPut, searchFrequency, actionTime);
}

export { menuJSONFormatter, menuJSONTemplateForMatter }