import { columnTemplate, headerTitleTemplate } from "../templates/template.js";
import { statusNameList, addStatus, deleteStatus, JSON_DATA, updateStatusName, validateNewName } from "../json_data/json_data.js";
import { turnOnColumnAddModal } from "./modal.js";
import { querySelector, querySelectorAll } from "../devUtils/querySelector.js";
import { 
    CLICK, DOUBLE_CLICK, FOCUS_OUT, 
    DISPLAY_FLEX, DISPLAY_NONE 
} from "../common/commonVariable.js";
import { changeCSS } from "../common/commonFunction.js";
import { 
    addEventToSearchBtn, addEventToSearchCancelBtn, addEventToSearchAcceptBtn
} from "../search/search.js";

const mainTag = querySelector("main");
const fabBtn = querySelector("#column-add-btn");
const goColumnAddModalBtn = querySelector("#go-column-add-modal-btn");
const goSearchModalBtn = querySelector("#go-search-btn");

// fab 버튼을 토글합니다.
function toggleFabBtn() {
    if(goColumnAddModalBtn.style.bottom == "21%") {
        changeCSS(goColumnAddModalBtn, "bottom", "5%");
        changeCSS(goSearchModalBtn, "bottom", "5%");
    }
    else {
        changeCSS(goColumnAddModalBtn, "bottom", "21%");
        changeCSS(goSearchModalBtn, "bottom", "13%");
    }
}

// fab 버튼에 클릭 이벤트를 추가합니다.
function addEventToFabBtn() {
    fabBtn.addEventListener(CLICK, () => {
        toggleFabBtn();
    })

    // Fab에 숨겨진 버튼들에 이벤트를 추가합니다.
    addEventToSearchBtn();
    addEventToSearchCancelBtn();
    addEventToSearchAcceptBtn();

    // fab 버튼에 column add event를 추가합니다.
    goColumnAddModalBtn.addEventListener(CLICK, () => { turnOnColumnAddModal(); })
}

// column 버튼에 column 삭제 이벤트를 추가합니다.
function columnDeleteEvent(columnDeleteBtn, column) {
    columnDeleteBtn.addEventListener(CLICK, () => {
        let status = column.children[0].innerHTML.split("\n")[0]
        
        // deleteStatus(status)
        column.remove();
    })
}

// 새로운 column을 추가합니다.
function addColumn(columnName="제목 없음") {
    let newColumn = columnTemplate(columnName);
    mainTag.appendChild(newColumn);

    // data 영역에도 status 추가
    addStatus(columnName)

    // column으로 smooth하게 스크롤 이동
    newColumn.scrollIntoView({behavior:'smooth'});
}

// 카드가 속한 헤더의 이름을 반환합니다.
function findCardHeaderName(cardNode) {
    let currentSection = cardNode.parentElement.parentElement;
    let headerName = currentSection.querySelector("span").innerHTML;

    return headerName
}

// column 길이를 갱신합니다.
function updateColumnLength(status) {
    let currentSection = querySelectorAll("article")[status].parentElement
    let sectionLength = currentSection.querySelector(".column-length");
    
    sectionLength.innerHTML = JSON_DATA[status].length
}

// 카드가 속한 column의 status 번호를 반환합니다.
function findColumnStatusByCard(cardNode) {
    let headerName = findCardHeaderName(cardNode)

    for(let i=0;i<statusNameList.length;i++) {
        if(headerName == statusNameList[i]) { return i; }
    }

    return -1;
}

// column의 header에 더블 클릭 이벤트를 추가합니다.
function headerDoubleClickEvent(headerNode) {
    headerNode.addEventListener(DOUBLE_CLICK, () => {
        let headerTitle = headerNode.querySelector("span").innerHTML;
        let headerInputTemplate = headerTitleTemplate(headerTitle, headerNode);

        headerNode.after(headerInputTemplate)
        headerNode.style.display = DISPLAY_NONE;
    })
}

// 헤더의 이름을 수정합니다. ( 호출 시기 : 헤더에 더블 클릭 발생 이후 )
function changeHeaderName(headerDom, newTitle) {
    headerDom.querySelector("span").innerHTML = newTitle
}

// 헤더에 focus out 이벤트를 추가합니다.
function inputFocusOutEvent(headerInput, originalTitle, originalHeaderDom) {
    headerInput.addEventListener(FOCUS_OUT, ()=> {
        const newTitle = headerInput.value;

        // 새로 바뀐 이름 중복 검사
        if(validateNewName(originalTitle, newTitle)) {
            changeHeaderName(originalHeaderDom, newTitle)
            originalHeaderDom.style.display = DISPLAY_FLEX;

            updateStatusName(originalTitle, headerInput.value);
            headerInput.parentElement.remove();
        }
        else {
            alert("이미 존재하는 이름입니다.");
            headerInput.value = "";
            
            setTimeout(()=>{
                headerInput.focus();
            })

        }
    })
}

export { 
    mainTag, goSearchModalBtn,
    columnDeleteEvent, findColumnStatusByCard, addColumn, 
    findCardHeaderName, updateColumnLength,
    headerDoubleClickEvent, inputFocusOutEvent, addEventToFabBtn
}