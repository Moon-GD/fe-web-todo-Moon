import { FETCH_URL, METHOD, HEADER } from "../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../public/js/store/store.js";

/**
 * menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSONOnServer(menuJSON) {
    fetch(FETCH_URL.MENU, {
        method: METHOD.POST,
        headers: HEADER.POST,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSONOnLocal(menuJSON) { 
    menuListOnLocal.push(menuJSON); 
}

/**
 * menu JSON을 server와 local에 업로드합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSON(menuJSON) {
    uploadMenuJSONOnServer(menuJSON);
    uploadMenuJSONOnLocal(menuJSON);
}

export { uploadMenuJSON }