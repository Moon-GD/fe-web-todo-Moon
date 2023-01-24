import { FETCH_URL, HEADER, METHOD } from "../../public/js/common/commonVariable.js";

/**
 * 카드 삭제 undo를 server에 반영합니다.
 * @param {Number} menuID menuID
 */
function uploadRecoverInfoOnServer(menuID) {
    fetch(FETCH_URL.MENU + "/" + menuID, {
        method: METHOD.PATCH,
        headers: HEADER.PATCH,
        body: JSON.stringify({"isRecovered": true})
    })
}

export { uploadRecoverInfoOnServer }