# 현대 부트캠프 2주차 - <a href="https://moon-gd-web-todo.netlify.app/">FE web Todo List</a>

<br>

## 제공 기능
### 1️⃣ Column
<ul>
  <li> column 생성 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213904845-be923916-2bbe-4e04-997b-7d02adf9b92e.gif"/><br><br>
  </li>
  <li> column 수정 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213904905-382cdb48-b9ad-4452-bf32-4cfe3ef56975.gif"><br><br>
  </li>
  <li> column 자동 스크롤 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213904957-0eafa030-0c59-432d-bce9-0af0745fc06f.gif"><br><br>
  </li>
  <li> column 삭제 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213905013-62da0530-11a1-48dd-a6a2-6a9bc9f9d67b.gif"><br><br>
  </li>
</ul>

<br>

### 2️⃣ Card
<ul>
  <li> card 생성 <br>
    <img width="45%" src="https://user-images.githubusercontent.com/74173976/213904382-61ef1d16-0a9b-4f2e-9551-6829e18b40ac.gif"/><br><br>
  </li>
  <li> card 수정 <br>
    <img width="45%" src="https://user-images.githubusercontent.com/74173976/213904482-4b186861-68f6-498a-9fbf-3f7a554d8a4b.gif"><br><br>
  </li>
  <li> card 이동 <br>
    <img width="45%" src="https://user-images.githubusercontent.com/74173976/213904612-db24aed3-193d-44bd-bc72-23781e493d10.gif"><br><br>
  </li>
  <li> card 삭제 <br>
    <img width="45%" src="https://user-images.githubusercontent.com/74173976/213904671-ee0ca7cc-d1f9-4d99-ba88-cd276141d227.gif"><br><br>
  </li>
</ul>

<br> 

### 3️⃣ Menu
<ul>
  <li> 사용자 액션 기록 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213905099-24ddbe48-4fc7-4f6f-8039-94f281ae925b.gif"/><br><br>
  </li>
</ul> 

## 도전 중!

## server data

## 요구 사항

## 리팩토링 가이드

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
  <li> 메뉴 로그의 시간 표시 (ex: 방금, n분전, n시간 전) </li>
  <li> 메뉴 로그의 시간 hover시 실제 등록 시간 표시</li>
</ul>

### 4️⃣ For Dev
<ul>
  <li> custom querySelector & querySelectorAll </li>
</ul>

### 5️⃣ Mock-server Data
<ul>
  <li> 추후 작성 예정 </li>
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

## 3주차 요구사항
<ol>
  <li> Mock 서버 or 실제 서버 활용 ✅ </li>
  <li> fetch api에 then, async/await 활용 ✅</li>
  <li> Store, View 관계 느슨하게 </li>
  <li> Promise 객체 만들기 </li>
  <li> 사이드바 시간 반영 ✅</li>
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

<br>

## 셀프 피드백 -> 모르는 게 많은 듯. 정확하게 아는 것 같지는 않다는 느낌이 들었다.
##### js remove, map
##### bind
##### css styling guid - bem
##### requestAnimationFrame
##### web working Draft
##### js animate
##### Babel
##### 콜 스택, 콜백 큐
##### macro/micro queue
