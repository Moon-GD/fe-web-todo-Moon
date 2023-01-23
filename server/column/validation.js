import { STATUS } from "../../public/js/common/commonVariable.js";
import { statusListOnLocal } from "../../public/js/store/store.js";

/** 새롭게 생성될 status의 이름 타당성 여부를 반환합니다. 
 * @param {string} newName 새롭게 생성할 column의 이름
*/
function validateStatus(newName) {
    for(let statusJSON of statusListOnLocal) {
        if(statusJSON && statusJSON[STATUS.NAME] == newName) return false;
    }

    return true;
}

/** 수정될 status의 이름 타당성 여부를 반환합니다.
 * @param {string} originalName column 변경 전 이름
 * @param {string} newName column 변경 할 이름
 */
function validateNewStatusName(originalName, newName) {
    for(let i=0;i<statusListOnLocal.length;i++) {
        if(! statusListOnLocal[i]) 
            continue;

        let statusName = statusListOnLocal[i][STATUS.NAME];

        if(statusName == newName && statusName != originalName) 
            return false;
    }

    return true;
}

export { validateStatus, validateNewStatusName }