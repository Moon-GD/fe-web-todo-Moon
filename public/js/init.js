import { 
    addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton, addEventToFabBtn 
} from "./component/button.js";
import { getAllJSONData } from "../../server/GET.js";
import { initialDataToTemplate } from "./templates/template.js";

// 웹 페이지에 필요한 이벤트를 추가합니다.
function addEventsToWebsite() {
    initialDataToTemplate();
    addEventToMenuBtns();
    addEventToModalButtons();
    addEventToColumnAddButton();
    addEventToFabBtn();
}

(async () => {
    await getAllJSONData();

    // 사이트에 이벤트를 추가합니다
    addEventsToWebsite();
})();