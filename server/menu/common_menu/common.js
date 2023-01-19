import { FETCH_MENU_URL, POST_METHOD, POST_HEADER } from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";

/**
 * card menu JSON을 server에 생성합니다.
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
 * card menu JSON을 local에 생성합니다.
 * @param {Object} menuJSON menu JSON
 */
function uploadMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

export { uploadMenuJSONOnServer, uploadMenuJSONOnLocal }