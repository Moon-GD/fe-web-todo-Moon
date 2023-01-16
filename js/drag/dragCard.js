import { addChildAfterParent } from "../common/commonFunction.js";
import { makeShadedNode, makeLightNode } from "./dragEffect.js";
import { dragIDManager } from "./dragIDManager.js";

// 드래그 중인 카드를 기록합니다.
function dragCard(event) { dragIDManager.setCurrentCardID(event.target.id); }

// 카드가 위에 지나갈 때 실행됩니다.
function dragOverCard(parentDom, event) {
    event.preventDefault();
    addChildAfterParent(parentDom, makeShadedNode());
}

// 카드를 놓을 때 실행됩니다. (drag가 끝날 때)
function dropCard(parentDom, event) { addChildAfterParent(parentDom, makeLightNode()); }

export { dragCard, dragOverCard, dropCard }