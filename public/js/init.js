import { eventToMenuBtns, eventToModalButtons, eventToFabBtn } from "./component/button.js";
import { getAllJSONData } from "../../server/serverInit.js";
import { initialDataToTemplate } from "./templates/template.js";
import { idGenerator } from "./common/IDGenerator.js";
import { getAllMenuJSON } from "../../server/menu/GET.js";
import { eventToBulbs } from "./common/darkMode.js";

function addEventsToWebsite() {
    idGenerator.initialize();
    eventToBulbs();
    eventToMenuBtns();
    eventToModalButtons();
    eventToFabBtn();
    initialDataToTemplate();
}

( async () => {
    await Promise.all([
        getAllJSONData(),
        getAllMenuJSON()
    ]);
    
    // 사이트에 이벤트를 추가합니다
    addEventsToWebsite();
})();