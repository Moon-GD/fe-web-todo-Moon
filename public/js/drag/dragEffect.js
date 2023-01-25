import { pipe } from "../common/commonFunction.js";
import { querySelector } from "../devUtils/querySelector.js";
import { dragIDManager } from "./dragIDManager.js"

/** drag 중인 카드의 ID를 저장합니다. */
const getDragCardNode = () => querySelector("#" + dragIDManager.getCurrentCardID());

/**
 * 카드 객체의 투명도를 1로 하여 반환해줍니다.
 * @param {Node} $card 카드 객체
 * @returns {Node} 카드 객체
 */
const makeCardLight = ($card) => {
    $card.style.opacity = 1;
    return $card;
}

/**
 * 카드 객체의 투명도를 0.5로 하여 반환해줍니다.
 * @param {Node} $card 카드 객체
 * @returns {Node} 카드 객체
 */
const makeCardDark = ($card) => {
    $card.style.opacity = 0.5;
    return $card;
}

/** 카드의 잔상을 만듭니다 */
const makeShadedNode = () => pipe(
    getDragCardNode,
    makeCardDark
)()

/** 카드의 잔상을 밝게 해줍니다 */
const makeLightNode = () => pipe(
    getDragCardNode,
    makeCardLight
)()

export { makeShadedNode, makeLightNode }