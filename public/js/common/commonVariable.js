const BASE_URL = "http://localhost:3000"

// fetch url
const FETCH_URL = {
    CARD: BASE_URL + "/cardList", 
    STATUS: BASE_URL + "/statusList",
    MENU: BASE_URL + "/menuList"
}

// fetch method
const METHOD = {
    DELETE: "DELETE",
    GET: "GET",
    PATCH: "PATCH",
    POST: "POST"
};

// fetch header
const HEADER = {
    PATCH: { "Content-Type": "application/json" },
    POST: { "Content-Type": "application/json" }
}

// fetch json key
const COLUMN_STATUS = "status";
const CARD_ID = "id";
const CARD_ORDER = "order";

// column status
const STATUS = {
    ID: "id",
    INDEX: "statusIndex",
    NAME: "statusName"
}

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
const POSITION = {
    BOTTOM: "bottom",
    RIGHT: "right"
}
const TRANSFORM = "transform";

// 버튼 색상 스타일링
const CARD_BTN = {
    HOVER: "#FE5958",
    ORIGINAL: "#000",
}

const CARD_DELETE_BTN_ORIGINAL = "#D0D0D0";

// Todo 카드 css 스타일 value
const CARD = {
    BACKGROUND_ORIGINAL: "#fff",
    BACKGROUND_HOVER: "#FFEEEC",
    OUTLINE_ORIGINAL: "none",
    OUTLINE_HOVER: "0.2vh solid " + CARD_BTN.HOVER,
    TEXT_HEIGTH: 2.5
}

const CARD_DARK_MODE = {
    BACKGROUND_ORIGINAL: "#1C1C21",
    BACKGROUND_HOVER: "#1C1C21",
    OUTLINE_ORIGINAL: "none",
    OUTLINE_HOVER: "0.2vh solid " + CARD_BTN.HOVER,
}

// 검색된 카드 css 스타일링 value
const SEARCH_CARD = {
    ORIGINAL: "0.2vh solid #fff",
    OUTLINE: "0.2vh solid red"
}

// Fab 버튼 관련
const FAB_BTN = {
    DEGREE_MOVED: "rotate(-45deg)",
    DEGREE_ORIGINAL: "rotate(0deg)",
    BOTTOM_ORIGINAL: "5%"
}

// 버튼 위치 css value
const BTN_MOVDED = {
    SEARCH: "13%",
    COLUMN_ADD: "21%",
    CARD_CLEAR: "29%"
}

// 사이드바 transition distance
const MENU_MOVE_DISTANCE = "-30vw";

// css display value
const DISPLAY = {
    BLOCK: "block",
    FLEX: "flex",
    NONE: "none"
}

// js event option - mouse
const EVENT = {
    CLICK: "click",
    DOUBLE_CLICK: "dblclick",
    MOUSE_LEAVE: "mouseleave",
    MOUSE_OVER: "mouseover",
    FOCUS_OUT: "focusout",
    INPUT: "input",
    DRAG_START: "dragstart",
    DRAG_OVER: "dragover",
    DRAG_END: "dragend",
    DROP: "drop"
}

// 사이드바 log 시간 변수
const LOG_TIME = {
    MONTH: 0,
    DATE: 1,
    HOUR: 2,
    MINUTE: 3
}

// css transition value
const HALF_SECOND = "0.5s";
const ONE_SECOND = "1s";

export {
    // fetch url
    FETCH_URL,

    // fetch method
    METHOD,

    // fetch header
    HEADER,

    // fetch json key
    STATUS, CARD_ID, CARD_ORDER,

    // column status
    COLUMN_STATUS,
    
    // json menu key
    MENU,

    // json menu action
    MENU_ACTION,

    // HTTP status
    HTTP_SUCCESS,

    // CSS key
    POSITION, TRANSFORM,

    // 버튼 색상 스타일링
    CARD_BTN, CARD_DELETE_BTN_ORIGINAL,

    // Todo 카드 css 스타일 value
    CARD, CARD_DARK_MODE,

    // 검색된 카드 css 스타일링 value
    SEARCH_CARD,

    // Fab 버튼 관련
    FAB_BTN,

    // 버튼 위치 css value
    BTN_MOVDED,

    // 사이드바 transition distance
    MENU_MOVE_DISTANCE,

    // css display value
    DISPLAY,

    // js event option - mouse
    EVENT, 

    // 사이드바 log 시간 변수
    LOG_TIME,

    // css transition value
    HALF_SECOND, ONE_SECOND,
}