/** parentNode 다음에 childNode를 추가합니다. */
function addChildAfterParent($parentNode, $childNode) { $parentNode.after($childNode); }

/** (target)의 css (key)를 (value)로 바꿉니다. */
function changeCSS($targetNode, key, value) { $targetNode.style[key] = value; }

/** pipe 헬퍼 함수 */
const pipe = (...functionList) => (pipeParam) => {
    return functionList.reduce((curValue, curFunc) => { 
        return curFunc(curValue); 
    }, pipeParam)
}

export { changeCSS, addChildAfterParent, pipe }