import { 
    CLICK, DOUBLE_CLICK, FOCUS_OUT, 
    DISPLAY_FLEX, DISPLAY_NONE
} from "../common/commonVariable.js";
import { querySelector, querySelectorAll } from "../devUtils/querySelector.js";
import { 
    cardListOnLocal, statusListOnLocal,
    validateNewStatusName
} from "../store/store.js";
import { columnTemplate, headerTitleTemplate } from "../templates/template.js";
import { addStatus } from "../../../server/POST.js";
import { updateStatusName } from "../../../server/PATCH.js";
import { deleteStatus } from "../../../server/DELETE.js";

const $mainTag = querySelector("main");

// column 버튼에 column 삭제 이벤트를 추가합니다.
function columnDeleteEvent($columnDeleteBtn, $columnNode) {
    $columnDeleteBtn.addEventListener(CLICK, () => {
        let statusName = $columnNode.querySelector("span").innerHTML;
        deleteStatus(statusName);
        $columnNode.remove();
    })
}

// 새로운 column을 추가합니다.
function addColumn(columnName="제목 없음") {
    let $newColumnNode = columnTemplate(columnName);
    $mainTag.appendChild($newColumnNode);

    // data 영역에도 status 추가
    addStatus(columnName);

    // column으로 smooth하게 스크롤 이동
    $newColumnNode.scrollIntoView({behavior:'smooth'});
}

// 카드가 속한 헤더의 이름을 반환합니다.
function findCardHeaderName($cardNode) {
    let $currentSection = $cardNode.parentElement.parentElement;
    let headerName = $currentSection.querySelector("span").innerHTML;

    return headerName;
}

// column 길이를 갱신합니다.
function updateColumnLength(status) {
    let $currentSection = querySelectorAll("article")[status].parentElement;
    let $sectionLength = $currentSection.querySelector(".column-length");
    
    $sectionLength.innerHTML = cardListOnLocal[status].length;
}

// 카드가 속한 column의 status 번호를 반환합니다.
function findColumnStatusByCard(cardNode) {
    let headerName = findCardHeaderName(cardNode);

    let filterd = statusListOnLocal.filter((ele) => {
        return ele.statusName == headerName;
    })

    let statusIndex = filterd[0]["statusIndex"];

    return statusIndex;
}

// column의 header에 더블 클릭 이벤트를 추가합니다.
function headerDoubleClickEvent($headerNode) {
    $headerNode.addEventListener(DOUBLE_CLICK, () => {
        let headerTitle = $headerNode.querySelector("span").innerHTML;
        let $headerInputTemplate = headerTitleTemplate(headerTitle, $headerNode);

        $headerNode.after($headerInputTemplate);
        $headerNode.style.display = DISPLAY_NONE;
    })
}

// 헤더의 이름을 수정합니다. ( 호출 시기 : 헤더에 더블 클릭 발생 이후 )
function changeHeaderName($headerNode, newTitle) {
    $headerNode.querySelector("span").innerHTML = newTitle;
}

// 헤더에 focus out 이벤트를 추가합니다.
function inputFocusOutEvent($headerInput, originalTitle, originalHeaderDom) {
    $headerInput.addEventListener(FOCUS_OUT, ()=> {
        const newTitle = $headerInput.value;

        // 새로 바뀐 이름 중복 검사
        if(validateNewStatusName(originalTitle, newTitle)) {
            changeHeaderName(originalHeaderDom, newTitle);
            originalHeaderDom.style.display = DISPLAY_FLEX;

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

export { 
    $mainTag,
    columnDeleteEvent, findColumnStatusByCard, addColumn, 
    findCardHeaderName, updateColumnLength,
    headerDoubleClickEvent, inputFocusOutEvent
}