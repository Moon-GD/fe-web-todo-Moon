import { Queue } from "./queue.js";

// HTML collection은 forEach가 안되기 때문에 배열 forEach 순회 등록
HTMLCollection.prototype.forEach = Array.prototype.forEach

const TAG = "tagName";
const CLASS = "className";
const ID = "id";

const ROOT_DOM = document.documentElement;
const BODY_DOM = ROOT_DOM.children[1];

function singleQueryToObject(query) {
    let objectQuery = {
        [TAG]: [],
        [CLASS]: [],
        [ID]: [],
    };

    query = query.replace(/\./g, " .")
    query = query.replace(/#/g, " #")
    
    query = query.split(" ").sort((a, b) => { return a - b });

    for(let i=0;i<query.length;i++) {
        if(query[i] == "") {
            continue;
        }
        else if(query[i][0] == ".") {
            objectQuery[CLASS].push(query[i].slice(1, ));
        }
        else if(query[i][0] == "#") {
            objectQuery[ID].push(query[i].slice(1, ));
        }
        else {
            objectQuery[TAG].push(query[i].toUpperCase());
        }
    }

    return objectQuery;
}

function multipleQueryToObject(query) {
    // main section : 하위 요소
    // main>section : 자식 요소
    // main > section : 자식 요소

    let objectQuery = []

    query = query.split(" ")

    for(let i=0;i<query.length;i++) {
        if(query[i] == ">") {
            objectQuery.push(">");
        }
        else {
            objectQuery.push(singleQueryToObject(query[i]))
        }
    }
}

function validateDomByQuery(dom, queryObj) {
    const tags = queryObj[TAG];
    const classes = queryObj[CLASS];
    const ids = queryObj[ID];
    
    
    for(let i=0;i<tags.length;i++) {
        if(dom.tagName != tags[i]) { return false; }
    }
    
    
    for(let i=0;i<classes.length;i++) {
        if(classes[i] in dom.classList) { return false; }
    }

    for(let i=0;i<ids.length;i++) {
        if(dom.id != ids[i]) { return false; }
    }

    return true;
}

function singleQuerySelector(query) {
    let queue = new Queue();
    queue.enque(BODY_DOM);

    let queryObj = singleQueryToObject(query);

    // BFS 방식으로 순회
    while(queue.getLength()) {
        let currentDom = queue.deque();
        // return : 원하는 ID를 찾은 경우
        if(validateDomByQuery(currentDom, queryObj)) { return currentDom; }
        currentDom.children.forEach((child) => { queue.enque(child); })
    }

    return null;
}

setTimeout(() => {
    console.log(singleQuerySelector("i.fa-solid#menu-open-btn"), document.querySelector("i.fa-solid#menu-open-btn"))
})
