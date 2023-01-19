import { DRAG_START, DRAG_OVER, DRAG_END, DROP, CARD_ID, STATUS_NAME } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { findColumnStatusByCard } from "../component/column.js";
import { menuLogMove } from "../component/menu/menu.js";
import { recordDragCard, dragOverCard, dropCard } from "./dragCard.js"
import { makeLightNode } from "./dragEffect.js"
import { moveJSONData } from "../../../server/card/move_card/moveCard.js";
import { statusListOnLocal } from "../store/store.js";

let dragStartStatus = "";
let dragEndStatus = "";

/** $cardNode에 드래그 이벤트를 추가합니다 */
function makeCardDragEvent($card) {
    $card.addEventListener(DRAG_START, (event) => {
        dragStartStatus = findColumnStatusByCard($card);
        recordDragCard(event);
    })

    $card.addEventListener(DRAG_OVER, (event) => dragOverCard($card, event))

    $card.addEventListener(DRAG_END, (event) => {
        dragEndStatus = findColumnStatusByCard($card);
        const prevColumnName = statusListOnLocal[dragStartStatus][STATUS_NAME];
        const nextColumnName = statusListOnLocal[dragEndStatus][STATUS_NAME];
        menuLogMove(findCardTitle($card), prevColumnName, nextColumnName);
        moveJSONData(dragStartStatus, dragEndStatus, $card.getAttribute(CARD_ID));
        makeLightNode();
    })

    $card.addEventListener(DROP, (event) => dropCard($card, event))
}

export { 
    dragStartStatus, dragEndStatus,
    makeCardDragEvent
}