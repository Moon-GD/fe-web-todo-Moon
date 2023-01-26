import { EVENT, DISPLAY, STATUS, CARD_ID, COLUMN_STATUS } from "../common/commonVariable.js";
import { pipe, addEvent } from "../common/commonFunction.js";
import { idGenerator } from "../common/IDGenerator.js";
import { showWarningModal } from "./modal.js";
import { querySelector } from "../devUtils/querySelector.js";
import { cardListOnLocal, statusListOnLocal } from "../store/store.js";
import { columnTemplate, headerTitleTemplate } from "../templates/template.js";
import { addStatus } from "../../../server/column/post.js";
import { validateNewStatusName } from "../../../server/column/validation.js";
import { deleteStatus } from "../../../server/column/delete.js";
import { updateStatusName } from "../../../server/column/patch.js";

const $mainTag = querySelector("main");

/**
 * column 삭제 버튼에 이벤트를 등록합니다.
 * @param {Node} $columnDeleteButton column 삭제 버튼
 * @param {Node} $column column 객체
 */
function columnDeleteEvent($columnDeleteButton, $column) {
    addEvent($columnDeleteButton, [
        () => {
            deleteStatus($column.querySelector("span").innerHTML)
            $column.remove();
        }
    ])
}

/**
 * column을 추가합니다.
 * @param {String} columnName column 이름
 */
function addColumn(columnName) {
    pipe(
        () => idGenerator.createStatusID(),
        (newColumnID) => {
            addStatus(columnName, newColumnID)
            return columnTemplate(columnName, newColumnID)
        },
        ($newColumn) => {
            $mainTag.appendChild($newColumn);
            $newColumn.scrollIntoView({behavior: "smooth"});
        }
    )()
}

/**
 * 카드가 속한 column의 header 이름을 반환합니다.
 * @param {Node} $card
 * @returns {String} column 이름
 */
const findCardHeaderName = ($card) => pipe(
    () => $card.closest("section"),
    ($section) => $section.querySelector("span").innerHTML
)()

/**
 * column 길이를 갱신합니다.
 * @param {String} status colum status
 */
function updateColumnLength(status) {
    let $columnList = document.querySelectorAll(".column");

    pipe(
        () => statusListOnLocal.filter((statusJSON) => statusJSON[STATUS.ID] === status)[0][STATUS.NAME],
        (statusName) => {
            for (const $column of $columnList) {
                if ($column.querySelector("span").innerHTML === statusName) {
                    return $column.querySelector(".column-length");
                }
            }
        },
        ($columnLength) => $columnLength.innerHTML = cardListOnLocal[status].filter((ele) => ele).length
    )()
}

/**
 * 카드가 속한 column의 status를 반환합니다.
 * @param {Node} $card 카드 객체
 * @returns {String} column status
 */
const findColumnStatusByCard = ($card) => pipe(
    () => findCardHeaderName($card),
    (headerName) => statusListOnLocal.filter((ele) => {
        return ele.statusName === headerName;
    }),
    ($column) => $column[0]["statusIndex"]
)()

/**
 * column header에 더블 클릭 이벤트를 등록합니다.
 * @param {Node} $header column header
 */
function headerDoubleClickEvent($header) {
    addEvent($header, [
        () => pipe(
            () => $header.querySelector("span").innerHTML,
            (headerTitle) => headerTitleTemplate(headerTitle, $header),
            ($headerTemplate) => {
                $header.after($headerTemplate);
                $header.style.display = DISPLAY.NONE;
            }
        )()
    ], EVENT.DOUBLE_CLICK);
}

/**
 * column header 이름을 수정합니다.
 * @param {Node} $header header 객체
 * @param {String} newTitle 새로운 header 이름
 * @returns
 */
const changeHeaderName = ($header, newTitle) => $header.querySelector("span").innerHTML = newTitle;

/**
 * column header에 focus out 이벤트를 등록합니다.
 * @param {Node} $headerInput header input 객체
 * @param {String} originalTitle 기존 header 이름
 * @param {Node} $originalHeader 기존 header 객체
 */
function inputFocusOutEvent($headerInput, originalTitle, $originalHeader) {
    addEvent($headerInput, [
        () => {
            const newTitle = $headerInput.value;

            if (validateNewStatusName(originalTitle, newTitle)) {
                changeHeaderName($originalHeader, newTitle);
                $originalHeader.style.display = DISPLAY.FLEX;

                updateStatusName(originalTitle, newTitle);
                $headerInput.parentElement.remove();
            } else {
                showWarningModal();
                $headerInput.value = "";

                setTimeout(() => {
                    $headerInput.focus();
                })

            }
        }
    ], EVENT.FOCUS_OUT);
}

/**
 * 해당하는 status의 column 객체를 반환합니다.
 * @param {String} columnStatus column status
 * @returns {Node} column 객체
 */
const getColumnNodeByStatus = (columnStatus) => pipe(
    () => document.querySelectorAll(".column"),
    ($columnArray) => $columnArray.find(($column) => $column.getAttribute(STATUS.ID) === `${columnStatus}`)
)();

/**
 * column의 카드 순서를 반환합니다.
 * @param {Node} $column column 객체
 * @returns {Array} 카드 순서 배열
 */
const getCardOrderByColumn = ($column) => pipe(
    () => $column.querySelectorAll(".card-frame"),
    ($cardArray) => $cardArray.map(($card) => $card.getAttribute(CARD_ID))
)()

export {
    $mainTag,
    columnDeleteEvent, findColumnStatusByCard, addColumn,
    findCardHeaderName, updateColumnLength,
    headerDoubleClickEvent, inputFocusOutEvent,
    getColumnNodeByStatus, getCardOrderByColumn
}