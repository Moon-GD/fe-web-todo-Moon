// fetch url
const FETCH_CARD_URL = "http://localhost:3000/cardList";
const FETCH_STATUS_URL = "http://localhost:3000/statusList"
const FETCH_MENU_URL = "http://localhost:3000/menuList"

// fetch method
const DELETE_METHOD = "DELETE";
const GET_METHOD = "GET";
const PATCH_METHOD = "PATCH";
const POST_METHOD = "POST";

// fetch header
const PATCH_HEADER = { "Content-Type": "application/json", };
const POST_HEADER = { "Content-Type": "application/json", };

// fetch json key
const STATUS = "status";
const STATUS_ID = "id";
const STATUS_INDEX = "statusIndex";
const STATUS_NAME = "statusName";
const CARD_ID = "id";
const CARD_ORDER = "order";

// json menu key
const MENU = {
    ACTION: "action",
    ACTION_TIME: "actionTime",
    ID: "id",
    PREV_COLUMN_NAME: "prevColumnName",
    NEXT_COLUMN_NAME: "nextColumnName",
    COLUMN_NAME: "columnName",
    CARD_TITLE: "cardTitle",
    SEARCH_INPUT: "searchInput",
    SEARCH_FREQUENCY: "searchFrequency"

}

// json menu action
const MENU_ACTION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    DELETE_ALL: "DELETE_ALL",
    MOVE: "MOVE",
    SEARCH: "SEARCH"
}

// HTTP status
const HTTP_SUCCESS = 200

// CSS key
const POSITION_BOTTOM = "bottom";
const RIGHT = "right";
const TRANSFORM = "transform";

// 버튼 색상 스타일링
const CARD_BTN_HOVER = "#FE5958";
const CARD_BTN_ORIGINAL = "#000";
const CARD_DELETE_BTN_ORIGINAL = "#D0D0D0";

// Todo 카드 css 스타일 value
const CARD_BACKGROUND_ORIGINAL = "#fff";
const CARD_BACKGROUND_HOVER = "#FFEEEC";
const CARD_OUTLINE_ORIGINAL = "none";
const CARD_OUTLINE_HOVER = "0.2vh solid " + CARD_BTN_HOVER;
const CARD_TEXT_HEIGHT = 2.5;

// 검색된 카드 css 스타일링 value
const SEARCHED_CARD_ORIGINAL = "0.2vh solid #fff";
const SEARCHED_CARD_OUTLINE = "0.2vh solid red";

// Fab 버튼 transition degree
const FAB_BTN_DEGREE_MOVED = "rotate(-45deg)";
const FAB_BTN_DEGREE_ORIGINAL = "rotate(0deg)";

// 버튼 위치 css value
const FAB_BTNS_BOTTOM_ORIGINAL = "5%";
const GO_SEARCH_BTN_MOVED = "13%";
const GO_COLUMN_ADD_BTN_MOVED = "21%";
const GO_CLEAR_BTN_MOVED = "29%";

// 사이드바 transition distance
const MENU_MOVE_DISTANCE = "-30vw";

// css display value
const DISPLAY_BLOCK = "block";
const DISPLAY_FLEX = "flex";
const DISPLAY_NONE = "none";

// js event option - mouse
const CLICK = "click";
const DOUBLE_CLICK = "dblclick";
const MOUSE_LEAVE = "mouseleave";
const MOUSE_OVER = "mouseover";

// js event option - input box
const FOCUS_OUT = "focusout";
const INPUT = "input";

// js event option - drag
const DRAG_START = "dragstart";
const DRAG_OVER = "dragover";
const DRAG_END = "dragend";
const DROP = "drop";

// 사이드바 log 시간 변수
const MONTH = 0;
const DATE = 1;
const HOUR = 2;
const MINUTE = 3;

// css transition value
const HALF_SECOND = "0.5s";
const ONE_SECOND = "1s";

export {
    // fetch url
    FETCH_CARD_URL, FETCH_STATUS_URL, FETCH_MENU_URL,

    // fetch method
    DELETE_METHOD, GET_METHOD, PATCH_METHOD, POST_METHOD,

    // fetch header
    PATCH_HEADER, POST_HEADER,

    // fetch json key
    STATUS, STATUS_ID, STATUS_INDEX, STATUS_NAME, CARD_ID, CARD_ORDER,

    // json menu key
    MENU,

    // json menu action
    MENU_ACTION,

    // HTTP status
    HTTP_SUCCESS,

    // CSS key
    POSITION_BOTTOM, RIGHT, TRANSFORM,

    // 버튼 색상 스타일링
    CARD_BTN_HOVER, CARD_BTN_ORIGINAL, CARD_DELETE_BTN_ORIGINAL,

    // Todo 카드 css 스타일 value
    CARD_BACKGROUND_ORIGINAL, CARD_BACKGROUND_HOVER, CARD_OUTLINE_ORIGINAL, CARD_OUTLINE_HOVER, CARD_TEXT_HEIGHT,

    // 검색된 카드 css 스타일링 value
    SEARCHED_CARD_OUTLINE, SEARCHED_CARD_ORIGINAL, 

    // Fab 버튼 transition degree
    FAB_BTN_DEGREE_MOVED, FAB_BTN_DEGREE_ORIGINAL,

    // 버튼 위치 css value
    FAB_BTNS_BOTTOM_ORIGINAL, GO_SEARCH_BTN_MOVED, GO_COLUMN_ADD_BTN_MOVED, GO_CLEAR_BTN_MOVED,

    // 사이드바 transition distance
    MENU_MOVE_DISTANCE,

    // css display value
    DISPLAY_BLOCK, DISPLAY_FLEX, DISPLAY_NONE,

    // js event option - mouse
    CLICK, DOUBLE_CLICK, MOUSE_LEAVE, MOUSE_OVER,

    // js event option - input box
    FOCUS_OUT, INPUT, 

    // js event option - drag
    DRAG_START, DRAG_OVER, DRAG_END, DROP,    

    // 사이드바 log 시간 변수
    MONTH, DATE, HOUR, MINUTE,

    // css transition value
    HALF_SECOND, ONE_SECOND,
}