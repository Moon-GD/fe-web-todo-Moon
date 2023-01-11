import { findColumnStatusByCard } from "../component/column.js";
import { dragCard, dragOverCard, dropCard } from "./dragCard.js"
import { makeLightNode } from "./dragEffect.js"
import { menuLogMove } from "../component/menu.js";
import { findCardTitle } from "../common.js";
import { moveJSONData } from "../json_data/json_data.js";

let dragStartStatus = "";
let dragEndStatus = "";

// 카드 Dom에 드래그 이벤트를 추가합니다
function makeCardDragEvent(cardDom) {
    cardDom.addEventListener("dragstart", (event) => {
        dragStartStatus = findColumnStatusByCard(cardDom)
        dragCard(event)
    })

    cardDom.addEventListener("dragover", (event) => {
        dragOverCard(cardDom, event)
    })

    cardDom.addEventListener("dragend", (event) => {
        // 이동 완료된 column의 status 계산
        dragEndStatus = findColumnStatusByCard(cardDom);

        // menu에 이동 로그 남기기
        menuLogMove(findCardTitle(cardDom), dragStartStatus, dragEndStatus);

        // json 데이터 이동 반영
        moveJSONData(dragStartStatus, dragEndStatus, cardDom);

        makeLightNode();
    })

    cardDom.addEventListener("drop", (event) => {
        dropCard(cardDom, event)
    })
}

export { 
    dragStartStatus, dragEndStatus,
    makeCardDragEvent
}