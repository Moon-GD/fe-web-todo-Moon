import { loadInitialData } from "./common/commonFunction.js";
import { 
    addEventToMenuBtns, addEventToModalButtons, addEventToColumnAddButton, addEventToFabBtn 
} from "./component/button.js";

// 웹 페이지에 필요한 이벤트를 추가합니다.
function addEventsToWebsite() {
    loadInitialData();
    addEventToMenuBtns();
    addEventToModalButtons();
    addEventToColumnAddButton();
    addEventToFabBtn();

    fetch("http://localhost:3000/get").then((res) => {
        if(res.status == 200) {
            return res.json();
        }
        else {
            return null;
        }
    }).then((data) => { console.log(data); })
    .catch((error) => { console.log("fail to fetch"); })
}

(() => {
    // 사이트에 이벤트를 추가합니다
    addEventsToWebsite();
})();