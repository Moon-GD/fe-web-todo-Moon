import { Queue } from "./queue.js";

// HTML collection은 forEach 순회가 안되기 때문에 배열 forEach 순회 등록
HTMLCollection.prototype.forEach = Array.prototype.forEach

const ROOT_DOM = document.documentElement;
const HEAD_DOM = ROOT_DOM.children[0];
const BODY_DOM = ROOT_DOM.children[1];

function queryParse(query) {
    let dividedQuery = query.split(" ")
    
    console.log(dividedQuery)
}

// ID querySelctor 구현
function getElementByID(startDom, ID) {
    let queue = new Queue();
    queue.enque(startDom);

    // BFS 방식으로 순회
    while(queue.getLength()) {
        let currentDom = queue.deque();

        // return : 원하는 ID를 찾은 경우
        if(currentDom.id == ID) { return currentDom; }

        // 원하는 ID를 찾지 못한 경우 자식 요소를 모두 enque
        currentDom.children.forEach((child) => { queue.enque(child); })
    }

    // html 파일에서 찾지 못한 경우 undefined 반환
    return undefined;
}

// className querySelector 구현
function getElementByClassName(startDom, className) {
    let queue = new Queue();
    queue.enque(startDom);

    // BFS 방식으로 순회
    while(queue.getLength()) {
        let currentDom = queue.deque();

        for(let i=0;i<currentDom.classList.length;i++) {
            if(currentDom.classList[i] == className) { return currentDom; }
        }

        currentDom.children.forEach((child) => { queue.enque(child); })
    }

    // html 파일에서 찾지 못한 경우 undefined 반환
    return undefined;
}

queryParse("div.class#id > span")
