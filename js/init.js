import { addEventsToWebsite } from "./common/commonFunction.js";

(() => {
    // HTML collection은 forEach가 안되기 때문에 배열 forEach 순회 등록
    HTMLCollection.prototype.forEach = Array.prototype.forEach;

    // 사이트에 이벤트를 추가합니다
    addEventsToWebsite();
})();