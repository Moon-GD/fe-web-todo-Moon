import { FETCH_MENU_URL, POST_METHOD, POST_HEADER } from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * menu JSON을 server에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

/**
 * menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

/**
 * menu JSON을 server와 local에 업로드합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSON(menuJSON) {
    uploadMenuJSONOnServer(menuJSON);
    uploadMenuJSONOnLocal(menuJSON);
}

export { uploadMenuJSON }