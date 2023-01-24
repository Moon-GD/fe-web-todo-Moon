import { FETCH_URL, HEADER, METHOD } from "../../public/js/common/commonVariable.js";

/**
 * 
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