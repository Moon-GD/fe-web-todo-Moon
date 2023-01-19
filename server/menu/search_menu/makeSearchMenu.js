import { 
    FETCH_MENU_URL, MENU_ACTION, 
    POST_METHOD, POST_HEADER 
} from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js";
import { idGenerator } from "../../../public/js/common/IDGenerator.js";
import { getCurrentTimeInString } from "../../../public/js/component/menu/menuLogTime.js";

// card 삭제 menu json을 반환합니다.
function returnSearchMenuJSON(searchInput, searchFrequency) {
    return {
        "action": MENU_ACTION.SEARCH,
        "actionTime": getCurrentTimeInString(),
        "id": idGenerator.createMenuID(),
        "searchInput": searchInput,
        "searchFrequency": searchFrequency
    }
}

// card 생성 menu JSON을 server에 생성합니다.
function makeSearchMenuJSONOnServer(menuJSON) {
    fetch(FETCH_MENU_URL, {
        method: POST_METHOD,
        headers: POST_HEADER,
        body: JSON.stringify(menuJSON)
    });
}

// card 생성 menu JSON을 local에 생성합니다.
function makeSearchMenuJSONOnLocal(menuJSON) { menuListOnLocal.push(menuJSON); }

// card 삭제 menu JSON 데이터를 생성합니다. (server, local)
function makeSearchMenuJSON(searchInput, searchFrequency) {
    const menuJSON = returnSearchMenuJSON(searchInput, searchFrequency);
    makeSearchMenuJSONOnServer(menuJSON);
    makeSearchMenuJSONOnLocal(menuJSON);
}

export { makeSearchMenuJSON }