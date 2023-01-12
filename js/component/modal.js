import { validateStatus, statusNameList, deleteJSONData } from "../json_data/json_data.js";
import { addColumn, findColumnStatusByCard } from "./column.js";
import { menuLogDelete } from "./menu.js";
import { querySelector } from "../devUtils/querySelector.js";
import { CLICK } from "../common/commonVariable.js";

let chosenCard = "";

// card delete modal
const modalSection = querySelector("#modal-section");
const modalDeleteBtn = querySelector("#card-delete-btn");
const modalCancelBtn = querySelector("#card-cancel-btn");

// column add modal
const columnAddModal = querySelector("#column-add-modal-section");
const columnAddModalCancelBtn = querySelector("#column-add-cancel-btn");
const columnAddModalAcceptBtn = querySelector("#column-add-accept-btn");

// 카드 삭제 관련 모달을 띄워줍니다.
function turnOnModal() { modalSection.style.display = "flex"; }

// 카드 삭제 관련 모달을 숨겨줍니다.
function turnOffModal() { modalSection.style.display = "none"; }

// column 추가 관련 모달을 띄워줍니다.
function turnOnColumnAddModal() { columnAddModal.style.display = "flex"; }

// column 추가 관련 모달을 숨겨줍니다.
function turnOffColumnAddModal() { columnAddModal.style.display = "none"; }

// 현재 drag 중인 카드 정보를 저장합니다.
function setCard(cardDom) { chosenCard = cardDom; }

// modal 버튼에 이벤트를 추가합니다.
function addEventToModalButtons() {
    // card modal 버튼들 이벤트 추가
    modalDeleteBtn.addEventListener(CLICK, () => {
        turnOffModal();
        
        let status = findColumnStatusByCard(chosenCard);
        const title = chosenCard.querySelector(".card-title").textContent.split("\n")[0]

        // menu 삭제 log 남기기
        menuLogDelete(title, statusNameList[status]);

        // 로컬 data 반영
        deleteJSONData(status, title);

        chosenCard.remove();
    })

    modalCancelBtn.addEventListener(CLICK, () => { turnOffModal(); })
}

// column 추가 이벤트를 추가합니다.
function addEventToFabButton() {
    // column add modal 버튼들 이벤트 추가
    columnAddModalCancelBtn.addEventListener(CLICK, () => { turnOffColumnAddModal(); })
    columnAddModalAcceptBtn.addEventListener(CLICK, () => {
        let columnAddInput = querySelector("#column-add-input");
        
        // 중복되는 status가 없을 경우에만 column 추가
        if(validateStatus(columnAddInput.value)) {
            addColumn(columnAddInput.value);
            turnOffColumnAddModal();
        }
        else {
            columnAddInput.value = "";
            alert("이미 존재하는 status 입니다.")
        }
    })
}

export { 
    setCard, modalSection, turnOnModal, turnOnColumnAddModal,
    addEventToModalButtons, addEventToFabButton
 }