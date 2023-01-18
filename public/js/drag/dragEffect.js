import { pipe } from "../common/commonFunction.js";
import { querySelector } from "../devUtils/querySelector.js";
import { dragIDManager } from "./dragIDManager.js"

const getDragCardNode = () => querySelector("#" + dragIDManager.getCurrentCardID());
const makeCardLight = ($cardNode) => { 
    $cardNode.style.opacity = 1;
    return $cardNode;
}
const makeCardDark = ($cardNode) => {
    $cardNode.style.opacity = 0.5;
    return $cardNode;
}

/** 카드의 잔상을 만듭니다 */
function makeShadedNode() {
    return pipe(
        getDragCardNode,
        makeCardDark
    )()
}

/** 카드의 잔상을 밝게 해줍니다 */
function makeLightNode() {
    return pipe(
        getDragCardNode,
        makeCardLight
    )()
}

export { makeShadedNode, makeLightNode }