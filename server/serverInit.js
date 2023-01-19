import { getAllCardJSONData } from "./card/get_card/getCardData.js";
import { getAllStatusJSONData } from "./column/get_column/getColumnData.js";

/** 모든 json 데이터를 불러옵니다.*/
async function getAllJSONData() {
    await getAllStatusJSONData();
    await getAllCardJSONData();
}

export { getAllJSONData }