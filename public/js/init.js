import { 
    addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton, addEventToFabBtn 
} from "./component/button.js";
import { getAllJSONData } from "../../server/init.js";
import { initialDataToTemplate } from "./templates/template.js";
import { idGenerator } from "./common/IDGenerator.js";
import { getMenuJSON } from "../../server/menu/get_menu/getMenu.js";

function addEventsToWebsite() {
    initialDataToTemplate();
    addEventToMenuBtns();
    addEventToModalButtons();
    addEventToColumnAddButton();
    addEventToFabBtn();
}

( async () => {
    await getAllJSONData();
    await idGenerator.initialize();
    getMenuJSON();
    
    // 사이트에 이벤트를 추가합니다
    addEventsToWebsite();
})();