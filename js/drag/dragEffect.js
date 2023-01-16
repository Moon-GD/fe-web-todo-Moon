import { dragIDManager } from "./dragIDManager.js"

// 카드의 잔상을 만듭니다
function makeShadedNode() {
    let movedCard = document.getElementById(dragIDManager.getCurrentCardID());
    movedCard.style.opacity = 0.5;

    return movedCard;
}

// 카드의 잔상을 밝게 해줍니다
function makeLightNode() {
    let movedCard = document.getElementById(dragIDManager.getCurrentCardID());
    movedCard.style.opacity = 1;

    return movedCard;
}

export { makeShadedNode, makeLightNode }