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
const POSITION = {
    BOTTOM: "bottom",
    RIGHT: "right"
}
const TRANSFORM = "transform";

// 버튼 색상 스타일링
const CARD_BTN = {
    HOVER: "#FE5958",
    ORIGINAL: "#000"
}
const CARD_DELETE_BTN_ORIGINAL = "#D0D0D0";

// Todo 카드 css 스타일 value
const CARD = {
    BACKGROUND_ORIGINAL: "",
    BACKGROUND_HOVER: "#FFEEEC",
    OUTLINE_ORIGINAL: "none",
    OUTLINE_HOVER: "0.2vh solid " + CARD_BTN.HOVER,
    TEXT_HEIGTH: 2.5
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
    FETCH_URL,

    // fetch method
    METHOD,

    // fetch header
    HEADER,

    // fetch json key
    STATUS, STATUS_ID, STATUS_INDEX, STATUS_NAME, CARD_ID, CARD_ORDER,

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
    CARD,

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