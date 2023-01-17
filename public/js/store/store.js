import { FETCH_CARD_URL, FETCH_STATUS_URL } from "../common/commonVariable.js";
import { findCardContent, findCardTitle } from "../component/card.js";
import { updateColumnLength } from "../component/column.js";

let cardListOnLocal = [];
let statusNameListOnLocal = [];

const TODO = 0;
const DOING = 1;
const DONE = 2;

let statusList = [TODO, DOING, DONE];
let statusNameList = ["해야 할 일", "하고 있는 일", "완료한 일"];
let JSON_DATA = [[], [], []];

/** status json 데이터를 분류해줍니다. */
function classifyStatusJSONList(statusJSONList) {
    statusJSONList.forEach((statusJSON) => {
        const statusIndex = statusJSON["statusIndex"];
        const statusName = statusJSON["statusName"];

        statusNameListOnLocal[statusIndex] = statusName;
        cardListOnLocal[statusIndex] = [];
    })
}

/** card json 데이터를 분류해줍니다. */
function classifyCardJSONList(cardJSONList) {
    cardJSONList.forEach((cardJSON) => {
        const status = cardJSON["status"];
        cardListOnLocal[status].push(cardJSON)
    })
}

/** status 관련 모든 JSON 데이터를 불러옵니다. */
async function getAllStatusJSONData() {
    await fetch(FETCH_STATUS_URL, { method: "GET" })
    .then((res) => { return res.json(); })
    .then((data) => { classifyStatusJSONList(data); } )
}

/** 카드 관련 모든 JSON 데이터를 불러옵니다. */
async function getAllCardJSONData() {
    await fetch(FETCH_CARD_URL, { method: "GET" })
    .then((res) => { return res.json(); })
    .then((data) => { classifyCardJSONList(data); })
}

/** 모든 json 데이터를 불러옵니다.*/
async function getAllJSONData() {
    await getAllStatusJSONData();
    await getAllCardJSONData();
}

/** 새로운 JSON 데이터를 추가합니다. */
function addJSONData(status, title, content, cardID) {
    let newJSONData = {
        title,
        content,
        author: "author by web",
        status: TODO,
        date: new Date(),
        id: cardID
    }

    fetch(FETCH_CARD_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newJSONData)
    })
    .catch((error) => { 
        // 추후 오류 제어 (id 중복 등의 이유로 post 되지 않는 경우 )
    })

    cardListOnLocal[status].push(newJSONData);

    updateColumnLength(status);

    // JSON_DATA[status].push(newJSONData);
}

/** 해당하는 JSON 데이터를 삭제합니다. */
function deleteJSONData(status, cardID) {
    let dataList = cardListOnLocal[status];

    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: "DELETE",
    })
    .then((res) => { if(res.status != 200) {
        // 에러 상황 출력을 위해 임시로 해둠
        // 추후에 에러 핸들링해주기
        throw new Error(`error : ${cardID}번의 card를 삭제하는데 실패`)
    } })

    for(let i=0;i<dataList.length;i++) {
        if(dataList[i].id == cardID) {
            dataList.splice(i, 1);
            break;
        }
    }

    updateColumnLength(status);
}

/** 해당하는 JSON 데이터를 이동합니다. */
function moveJSONData(prevStatus, nextStatus, cardID) {
    // 서버 data 반영
    fetch(FETCH_CARD_URL + "/" + cardID, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status:nextStatus
        })
    })

    // local data 반영
    let prevCardList = cardListOnLocal[prevStatus];
    let nextCardList = cardListOnLocal[nextStatus];

    for(let i=0;i<prevCardList.length;i++) {
        if(prevCardList[i].id == cardID) {
            nextCardList.push(prevCardList[i]);
            prevCardList.splice(i, 1);
            break;
        }
    }
}

/** 새롭게 생성될 status의 이름 타당성 여부를 반환합니다. */
function validateStatus(name) {
    for(let i=0;i<statusNameListOnLocal.length;i++) {
        if(statusNameListOnLocal[i] == name) {
            return false;
        }
    }

    return true;
}

/** 수정될 status의 이름 타당성 여부를 반환합니다. */
function validateNewName(originalName, newName) {
    for(let i=0;i<statusNameListOnLocal.length;i++) {
        if(statusNameListOnLocal[i] == newName && statusNameListOnLocal[i] != originalName) {
            return false;
        }
    }

    return true;
}

// 새로운 status를 추가합니다. (호출 시기 : column 생성 이후)
function addStatus(newStatus) {
    let newStatusIndex = statusNameListOnLocal.length
    statusNameListOnLocal[newStatusIndex] = statusNameListOnLocal[newStatusIndex - 1] + 1;
    statusNameListOnLocal[newStatusIndex] = newStatus;

    cardListOnLocal[newStatusIndex] = [];
}

// 해당하는 status를 삭제합니다. (호출 시기 : column 삭제 이후)
function deleteStatus(status) {
    let statusIndex = statusNameList.indexOf(status);
    
    // 삭제
    JSON_DATA.splice(statusIndex, 1);
    statusList.splice(statusIndex, 1);
    statusNameList.splice(statusIndex, 1);
}

// status의 이름을 바꾸어 줍니다.
function updateStatusName(prevName, nextName) {
    for(let i=0;i<statusNameList.length;i++) {
        if(statusNameList[i] == prevName) {
            statusNameList[i] = nextName;
            break;
        }
    }
}

JSON_DATA[TODO] = [
    {
        title: "github 공부하기",
        content: "add, commit, push",
        author: "author by web",
        date: "Sun Jan 03 2023 00:00:00 GMT+0900 (한국 표준시)"
    },
    {
        title: "블로그에 포스팅할 것",
        content: "github 공부 내용",
        author: "author by web",
        date: "Sun Jan 02 2023 00:00:00 GMT+0900 (한국 표준시)"
    },
];

JSON_DATA[DOING] = [
    {
        title: "HTML/CSS 공부하기",
        content: "input 태그 실습",
        author: "author by web",
        date: "Sun Jan 03 2023 00:00:00 GMT+0900 (한국 표준시)"
    }
];

JSON_DATA[DONE] = [];

export { 
    cardListOnLocal, statusNameListOnLocal,
    statusList, statusNameList, TODO, DOING, DONE, JSON_DATA, getAllJSONData,
    addJSONData, deleteJSONData, validateStatus,
    addStatus, deleteStatus, moveJSONData,
    updateStatusName, validateNewName
}