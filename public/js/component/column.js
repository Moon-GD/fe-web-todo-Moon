import { 
    CLICK, DOUBLE_CLICK, FOCUS_OUT, 
    DISPLAY_FLEX, DISPLAY_NONE, STATUS_ID, STATUS_NAME, CARD_ID
} from "../common/commonVariable.js";
import { querySelector } from "../devUtils/querySelector.js";
import { cardListOnLocal, statusListOnLocal } from "../store/store.js";
import { columnTemplate, headerTitleTemplate } from "../templates/template.js";
import { deleteStatus } from "../../../server/DELETE.js";
import { updateStatusName } from "../../../server/PATCH.js";
import { addStatus } from "../../../server/POST.js";
import { validateNewStatusName } from "../../../server/column/validate_column/validateColumn.js";
import { pipe } from "../common/commonFunction.js";
import { idGenerator } from "../common/IDGenerator.js";

const $mainTag = querySelector("main");

/** column 삭제 버튼에 이벤트를 등록합니다. */
function columnDeleteEvent($columnDeleteBtn, $column) {
    $columnDeleteBtn.addEventListener(CLICK, () => {
        let statusName = $column.querySelector("span").innerHTML;
        deleteStatus(statusName);
        $column.remove();
    })
}

/** column을 추가합니다. */
function addColumn(columnName="제목 없음") {
    let newColumnID = idGenerator.createStatusID();
    const $column = columnTemplate(columnName, newColumnID);
    $mainTag.appendChild($column);
    $column.scrollIntoView({behavior: "smooth"});

    // data 영역에도 status 추가
    addStatus(columnName, newColumnID);
}

/** 카드가 속한 column의 header 이름을 반환합니다. */
function findCardHeaderName($card) {
    return pipe(
        ($card) => $card.closest("section"),
        ($section) => $section.querySelector("span").innerHTML
    )($card)
}

/** column 길이를 갱신합니다. */
function updateColumnLength(status) {
    let statusName = statusListOnLocal.filter((statusJSON) => { return statusJSON[STATUS_ID] == status; })[0][STATUS_NAME];
    let $columnList = document.querySelectorAll(".column");
    let $columnLength = '';

    for(const $column of $columnList) {
        if($column.querySelector("span").innerHTML == statusName) {
            $columnLength = $column.querySelector(".column-length");
            break;
        }
    }

    $columnLength.innerHTML = cardListOnLocal[status].filter((ele) => ele).length;
}

/** 카드가 속한 column의 status를 반환합니다. */
function findColumnStatusByCard($card) {
    return pipe(
        ($card) => findCardHeaderName($card),
        (headerName) => statusListOnLocal.filter((ele) => {
            return ele.statusName == headerName;
        }),
        ($column) => $column[0]["statusIndex"]
    )($card)
}

/** column header에 더블 클릭 이벤트를 등록합니다. */
function headerDoubleClickEvent($header) {
    $header.addEventListener(DOUBLE_CLICK, () => {
        let headerTitle = $header.querySelector("span").innerHTML;
        let $headerInputTemplate = headerTitleTemplate(headerTitle, $header);
        $header.after($headerInputTemplate);
        $header.style.display = DISPLAY_NONE;
    })
}

/** column header 이름을 수정합니다. */
const changeHeaderName = ($header, newTitle) => $header.querySelector("span").innerHTML = newTitle;

/** column header에 focus out 이벤트를 등록합니다. */
function inputFocusOutEvent($headerInput, originalTitle, $originalHeader) {
    $headerInput.addEventListener(FOCUS_OUT, ()=> {
        const newTitle = $headerInput.value;

        // 새로 바뀐 이름 중복 검사
        if(validateNewStatusName(originalTitle, newTitle)) {
            changeHeaderName($originalHeader, newTitle);
            $originalHeader.style.display = DISPLAY_FLEX;

            updateStatusName(originalTitle, $headerInput.value);
            $headerInput.parentElement.remove();
        }
        else {
            alert("이미 존재하는 이름입니다.");
            $headerInput.value = "";
            
            setTimeout(()=>{
                $headerInput.focus();
            })

        }
    })
}

function getColumnNodeByStatus(columnStatus) {
    const $columnList = document.querySelectorAll(".column");
    return $columnList.find(($column) => $column.getAttribute("id") == `column-${columnStatus}`);
}

function getCardOrderByColumn($column) {
    const $cardList = $column.querySelectorAll(".card-frame");
    return $cardList.map(($card) => $card.getAttribute(CARD_ID));
}

export { 
    $mainTag,
    columnDeleteEvent, findColumnStatusByCard, addColumn, 
    findCardHeaderName, updateColumnLength,
    headerDoubleClickEvent, inputFocusOutEvent,
    getColumnNodeByStatus, getCardOrderByColumn
}