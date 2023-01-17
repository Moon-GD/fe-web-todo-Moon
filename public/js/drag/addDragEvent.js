import { DRAG_START, DRAG_OVER, DRAG_END, DROP } from "../common/commonVariable.js";
import { findCardTitle } from "../component/card.js";
import { findColumnStatusByCard } from "../component/column.js";
import { menuLogMove } from "../component/menu.js";
import { dragCard, dragOverCard, dropCard } from "./dragCard.js"
import { makeLightNode } from "./dragEffect.js"
import { moveJSONData } from "../store/store.js";

let dragStartStatus = "";
let dragEndStatus = "";

// 카드 Dom에 드래그 이벤트를 추가합니다
function makeCardDragEvent($cardNode) {
    $cardNode.addEventListener(DRAG_START, (event) => {
        dragStartStatus = findColumnStatusByCard($cardNode);
        dragCard(event);
    })

    $cardNode.addEventListener(DRAG_OVER, (event) => { dragOverCard($cardNode, event); })

    $cardNode.addEventListener(DRAG_END, (event) => {
        // 이동 완료된 column의 status 계산
        dragEndStatus = findColumnStatusByCard($cardNode);

        // menu에 이동 로그 남기기
        menuLogMove(findCardTitle($cardNode), dragStartStatus, dragEndStatus);

        // json 데이터 이동 반영
        moveJSONData(dragStartStatus, dragEndStatus, $cardNode.getAttribute("id"));

        makeLightNode();
    })

    $cardNode.addEventListener(DROP, (event) => { dropCard($cardNode, event); })
}

export { 
    dragStartStatus, dragEndStatus,
    makeCardDragEvent
}