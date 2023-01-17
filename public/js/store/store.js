import { STATUS_NAME } from "../common/commonVariable.js";

let cardListOnLocal = [];
let statusListOnLocal = [];

/** 새롭게 생성될 status의 이름 타당성 여부를 반환합니다. */
function validateStatus(name) {
    for(let statusJSON of statusListOnLocal) {
        if(statusJSON[STATUS_NAME] == name) { return false; }
    }

    return true;
}

/** 수정될 status의 이름 타당성 여부를 반환합니다. */
function validateNewStatusName(originalName, newName) {
    for(let i=0;i<statusListOnLocal.length;i++) {
        let statusName = statusListOnLocal[i][STATUS_NAME];

        if(statusName == newName && statusName != originalName) { return false; }
    }

    return true;
}

export { 
    statusListOnLocal, cardListOnLocal,
    validateStatus, validateNewStatusName
}