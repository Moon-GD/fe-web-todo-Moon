import { addChildAfterParent } from "../common/commonFunction.js";
import { makeShadedNode, makeLightNode } from "./dragEffect.js";
import { dragIDManager } from "./dragIDManager.js";

/** 드래그 중인 카드를 기록합니다. */
const recordDragCard = ({target}) => dragIDManager.setCurrentCardID(target.id);

/** 카드가 위에 지나갈 때 실행됩니다. */
const dragOverCard = ($parent, event) => {
    event.preventDefault();
    addChildAfterParent($parent, makeShadedNode());
}

/** 카드를 놓을 때 실행됩니다. */
const dropCard = ($parent, event) => addChildAfterParent($parent, makeLightNode());

export { recordDragCard, dragOverCard, dropCard }