// fetch url
const FETCH_CARD_URL = "http://localhost:3000/cardList";
const FETCH_STATUS_URL = "http://localhost:3000/statusList"

// CSS 속성 관련
const POSITION_BOTTOM = "bottom";
const TRANSFORM = "transform";

// 카드 관련
const CARD_BTN_ORIGINAL = "#000";
const CARD_BACKGROUND_ORIGINAL = "#fff";
const CARD_OUTLINE_ORIGINAL = "none";
const CARD_DELETE_BTN_ORIGINAL = "#D0D0D0";
const CARD_BTN_HOVER = "#FE5958";
const CARD_OUTLINE_HOVER = "0.2vh solid " + CARD_BTN_HOVER;
const CARD_BACKGROUND_HOVER = "#FFEEEC";
const CARD_TEXT_HEIGHT = 2.5;

// 버튼 관련
const FAB_BTN_DEGREE_ORIGINAL = "rotate(0deg)";
const FAB_BTN_DEGREE_MOVED = "rotate(-45deg)";
const FAB_BTNS_BOTTOM_ORIGINAL = "5%";
const GO_SEARCH_BTN_MOVED = "13%";
const GO_COLUMN_ADD_BTN_MOVED = "21%";
const GO_CLEAR_BTN_MOVED = "29%";

// 메뉴 관련
const MENU_MOVE_DISTANCE = "-30vw";

// 위치, 배치 관련
const DISPLAY_FLEX = "flex";
const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";
const RIGHT = "right";

// 이벤트 관련
const CLICK = "click";
const MOUSE_OVER = "mouseover";
const MOUSE_LEAVE = "mouseleave";
const INPUT = "input";
const DOUBLE_CLICK = "dblclick";
const FOCUS_OUT = "focusout";
const DRAG_START = "dragstart";
const DRAG_OVER = "dragover";
const DRAG_END = "dragend";
const DROP = "drop";

// 시간 관련
const MONTH = 0;
const DATE = 1;
const HOUR = 2;
const MINUTE = 3;

export {
    FETCH_CARD_URL, FETCH_STATUS_URL,
    POSITION_BOTTOM, TRANSFORM,
    FAB_BTN_DEGREE_ORIGINAL, FAB_BTNS_BOTTOM_ORIGINAL, 
    FAB_BTN_DEGREE_MOVED, GO_SEARCH_BTN_MOVED, GO_COLUMN_ADD_BTN_MOVED, GO_CLEAR_BTN_MOVED,
    CARD_BTN_ORIGINAL, CARD_OUTLINE_ORIGINAL, CARD_BACKGROUND_ORIGINAL, CARD_DELETE_BTN_ORIGINAL,
    CARD_BTN_HOVER, CARD_OUTLINE_HOVER, CARD_BACKGROUND_HOVER, CARD_TEXT_HEIGHT,
    MENU_MOVE_DISTANCE,
    DISPLAY_FLEX, DISPLAY_BLOCK, DISPLAY_NONE, RIGHT,
    CLICK, MOUSE_OVER, MOUSE_LEAVE, INPUT, DOUBLE_CLICK, FOCUS_OUT, 
    DRAG_START, DRAG_OVER, DRAG_END, DROP,
    MONTH, DATE, HOUR, MINUTE
}