# 현대 부트캠프 2주차 - <a href="https://moon-gd-web-todo.netlify.app/">FE web Todo List</a>

<br>

## 제공 기능
### 1️⃣ Column
<ul>
  <li> 추가 (기존 column과의 중복도 검사 포함) </li>
  <li> column이 많은 상태에서 추가할 경우 추가된 column으로 scroll 이동 </li>
  <li> 더블 클릭시 헤더 내용 갱신 </li>
  <li> 삭제 </li>
</ul>

### 2️⃣ Card
<ul>
  <li> 추가 (등록 과정에서 inputbox는 사용자 입력에 맞추어 유연하게 크기 조정) </li>
  <li> 더블 클릭 시 내용 수정 </li>
  <li> 삭제 </li>
</ul>

### 3️⃣ Menu
<ul>
  <li> Card 관련 4가지 액션 (add, delete, update, move) 발생 시 로그로 표시 </li>
</ul>

### 4️⃣ For Dev
<ul>
  <li> custom querySelector & querySelectorAll </li>
</ul>

<br>

## 2주차 요구사항
<ol>
  <li> Todo 삭제, 편집 ✅ </li>
  <li> Drag & Drop ✅ </li>
  <li> prototype 활용한 객체 1개 이상 ✅ </li>
  <li> ES classes 활용 객체 1개 이상 ✅ </li>
  <li> querySelector 구현 ✅ </li>
</ol>

<br>

## 기타 사항
### 리팩토링 가이드
<ol>
  <li> html tag 작성 요령
     <ul>
      <li> header & main > section > h3 & article > div  </li>
    </ul>
  </li>
  <br>
  <li> css 작성 요령 
    <ul>
      <li> 큰 요소 > 작은 요소 순서 </li>
      <li> 배치 관련 우선 작성 > 글자 크기, 색깔 등의 스타일링은 후에 작성 </li>
      <li> 요소 크기는 vw, vh, % 활용 (px 지양) </li>
      <li> 글자는 최상단 font size에 비례하도록 rem 활용 </li>
    </ul>
  </li>
</ol>
