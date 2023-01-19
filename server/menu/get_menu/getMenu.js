import { FETCH_MENU_URL, GET_METHOD } from "../../../public/js/common/commonVariable.js";
import { menuListOnLocal } from "../../../public/js/store/store.js"

async function getMenuJSON() {
    await fetch(FETCH_MENU_URL, {
        method: GET_METHOD
    })
    .then((res) => res.json())
    .then((menuList) => {
        menuList.forEach((menu) => menuListOnLocal.push(menu))
    })
}

export { getMenuJSON }