// (target)의 css (key)를 (value)로 바꿉니다.
function changeCSS(targetNode, key, value) {
    targetNode.style[key] = value
}

// parentNode 다음에 childNode를 추가합니다.
function addChildAfterParent(parentNode, childNode) {
    parentNode.after(childNode)
}

// 카드의 제목을 찾아줍니다.
function findCardTitle(card) {
    const cardTitle = card.children[0].innerHTML.split('\n')[0];
    
    return cardTitle;
}

// 카드의 내용을 찾아줍니다.
function findCardContent(card) {
    return card.children[1].innerHTML;
}

// 카드가 속한 Column의 길이를 반환합니다.
function findHeaderLengthByCard(card) {
    let cardSection = card.parentElement.parentElement
    let findHeader = cardSection.children[0].children[0]

    return findHeader;
}

export {
    changeCSS, addChildAfterParent, findHeaderLengthByCard, findCardTitle, findCardContent,
}