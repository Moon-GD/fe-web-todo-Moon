import { EVENT, CARD_ID, STATUS } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { findColumnStatusByCard } from "../component/column.js";
import { menuLogMove } from "../component/menu/menu.js";
import { recordDragCard, dragOverCard } from "./dragCard.js"
import { makeLightNode } from "./dragEffect.js"
import { moveJSONData } from "../../../server/card/patchMove.js";
import { statusListOnLocal } from "../store/store.js";
import { addEvent, pipe } from "../common/commonFunction.js";

let dragStartStatus = "";
let dragEndStatus = "";

/**
 * 카드에 드래그 이벤트를 추가합니다.
 * @param {Node} $card 카드 객체
 */
function eventToCard($card) {
    addEvent($card, [
        () => dragStartStatus = findColumnStatusByCard($card),
        (event) => recordDragCard(event)
    ], EVENT.DRAG_START);

    addEvent($card, [
        (event) => dragOverCard($card, event)
    ], EVENT.DRAG_OVER);

    addEvent($card, [
        () => pipe(
            () => dragEndStatus = findColumnStatusByCard($card),
            () => [statusListOnLocal[dragStartStatus][STATUS.NAME], statusListOnLocal[dragEndStatus][STATUS.NAME]],
            ([prevColumnName, nextColumnName]) => {
                menuLogMove(prevColumnName, nextColumnName, findCardTitle($card));
                moveJSONData(dragStartStatus, dragEndStatus, $card.getAttribute(CARD_ID));
                makeLightNode();
            }
        )()
    ], EVENT.DRAG_END);

    addEvent($card, [
        () => dragOverCard($card, event)
    ], EVENT.DROP);
}

export { 
    dragStartStatus, dragEndStatus,
    eventToCard
}