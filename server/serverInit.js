import { getAllCardJSONData } from "./card/GET.js";
import { getAllStatusJSONData } from "./column/GET.js";

/** 모든 json 데이터를 불러옵니다.*/
async function getAllJSONData() {
    await getAllStatusJSONData();
    await getAllCardJSONData();
}

export { getAllJSONData }