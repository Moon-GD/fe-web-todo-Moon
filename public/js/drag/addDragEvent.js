import { DRAG_START, DRAG_OVER, DRAG_END, DROP } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { findColumnStatusByCard } from "../component/column.js";
import { menuLogMove } from "../component/menu/menu.js";
import { recordDragCard, dragOverCard, dropCard } from "./dragCard.js"
import { makeLightNode } from "./dragEffect.js"
import { moveJSONData } from "../../../server/PATCH.js";

let dragStartStatus = "";
let dragEndStatus = "";

/** $cardNode에 드래그 이벤트를 추가합니다 */
function makeCardDragEvent($cardNode) {
    $cardNode.addEventListener(DRAG_START, (event) => {
        dragStartStatus = findColumnStatusByCard($cardNode);
        recordDragCard(event);
    })

    $cardNode.addEventListener(DRAG_OVER, (event) => { dragOverCard($cardNode, event); })

    $cardNode.addEventListener(DRAG_END, (event) => {
        dragEndStatus = findColumnStatusByCard($cardNode);
        menuLogMove(findCardTitle($cardNode), dragStartStatus, dragEndStatus);
        moveJSONData(dragStartStatus, dragEndStatus, $cardNode.getAttribute("id"));
        makeLightNode();
    })

    $cardNode.addEventListener(DROP, (event) => { dropCard($cardNode, event); })
}

export { 
    dragStartStatus, dragEndStatus,
    makeCardDragEvent
}