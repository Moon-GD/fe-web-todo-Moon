import { columnTemplate, headerTitleTemplate } from "../templates/template.js";
import { statusNameList, addStatus, deleteStatus, JSON_DATA, updateStatusName, validateNewName } from "../json_data/json_data.js";
import { turnOnColumnAddModal } from "./modal.js";

const mainTag = document.querySelector("main");
const columnAddBtn = document.querySelector("#column-add-btn");

// column 버튼에 column 삭제 이벤트를 추가합니다.
function columnDeleteEvent(columnDeleteBtn, column) {
    columnDeleteBtn.addEventListener("click", () => {
        let status = column.children[0].innerHTML.split("\n")[0]
        
        deleteStatus(status)
        column.remove();
    })
}

// 새로운 column을 추가합니다.
function addColumn(columnName = "제목 없음") {
    let newColumn = columnTemplate(columnName);
    mainTag.appendChild(newColumn);

    // data 영역에도 status 추가
    addStatus(columnName)

    // column으로 smooth하게 스크롤 이동
    newColumn.scrollIntoView({behavior:'smooth'});
}

// fab 버튼에 column add event를 추가합니다.
columnAddBtn.addEventListener("click", () => { turnOnColumnAddModal(); })

// 카드가 속한 헤더의 이름을 반환합니다.
function findCardHeaderName(cardNode) {
    let currentSection = cardNode.parentElement.parentElement;
    let headerName = currentSection.children[0].children[0].innerHTML

    return headerName
}

// column 길이를 갱신합니다.
function updateColumnLength(status) {
    let currentSection = document.querySelectorAll("article")[status].parentElement
    let sectionLength = currentSection.children[0].children[1]
    
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
    headerNode.addEventListener("dblclick", () => {
        let headerTitle = headerDom.children[0].innerHTML;
        let headerInputTemplate = headerTitleTemplate(headerTitle, headerNode);

        headerNode.after(headerInputTemplate)
        headerNode.style.display = "none";
    })
}

// 헤더의 이름을 수정합니다. ( 호출 시기 : 헤더에 더블 클릭 발생 이후 )
function changeHeaderName(headerDom, newTitle) {
    headerDom.children[0].innerHTML = newTitle
}

// 헤더에 focus out 이벤트를 추가합니다.
function inputFocusOutEvent(headerInput, originalTitle, originalHeaderDom) {
    headerInput.addEventListener("focusout", ()=> {
        const newTitle = headerInput.value;

        // 새로 바뀐 이름 중복 검사
        if(validateNewName(originalTitle, newTitle)) {
            changeHeaderName(originalHeaderDom, newTitle)
            originalHeaderDom.style.display = "flex";

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
    mainTag, 
    columnDeleteEvent, findColumnStatusByCard, addColumn, 
    findCardHeaderName, updateColumnLength,
    headerDoubleClickEvent, inputFocusOutEvent
}