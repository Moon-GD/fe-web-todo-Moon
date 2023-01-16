import { dragIDManager } from "./dragIDManager.js"

// 카드의 잔상을 만듭니다
function makeShadedNode() {
    let $movedCardNode = document.getElementById(dragIDManager.getCurrentCardID());
    $movedCardNode.style.opacity = 0.5;

    return $movedCardNode;
}

// 카드의 잔상을 밝게 해줍니다
function makeLightNode() {
    let $movedCardNode = document.getElementById(dragIDManager.getCurrentCardID());
    $movedCardNode.style.opacity = 1;

    return $movedCardNode;
}

export { makeShadedNode, makeLightNode }