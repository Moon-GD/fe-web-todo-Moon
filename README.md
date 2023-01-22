# 현대 부트캠프 2주차 - FE web Todo List 
#### <i>(mock server 연동으로 배포 링크 닫아둔 상태입니다.)</i>

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

## 도전했던 기능

### 1️⃣ Search
<ul>
  <li> Card 제목을 기준으로 검색 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213905239-6995c972-7e6c-4988-8384-d719ca1f0d05.gif"/><br><br>
  </li>
  <li> 검색어 추천 <br>
    운영체제의 페이지 교체 기법 중 LFU를 반대로 활용하여 검색어를 추천하도록 설계 <br>
    <img width="85%" src="https://user-images.githubusercontent.com/74173976/213905325-83045c3d-6e0f-496a-b613-e235028afcdc.gif"/><br><br>
  </li>
</ul>

<br>

### 2️⃣ Dev Utils
<ul>
  <li> 
    Custom querySelector 구현 및 활용 <br>
    사용자 query를 파싱하여 돔 트리 탐색 (BFS) <a href="https://github.dev/Moon-GD/fe-web-todo-Moon/blob/4ba48e04ba5535f7497359e189ab4b7e36d68826/public/js/devUtils/querySelector.js#L13-L18">구현 부분</a>
  </li>
  <li> 
    pipeline 함수를 통한 가독성 향상 <br>
    3중 함수 구조 (내부적으로 reduce 함수를 통해 함수 배열 반복 수행) <a href="https://github.dev/Moon-GD/fe-web-todo-Moon/blob/4ba48e04ba5535f7497359e189ab4b7e36d68826/public/js/common/commonFunction.js#L7-L11">구현 부분</a>
  </li>
</ul>

<br>

### 3️⃣ Dark Mode
<ul>
  <li> 전구 icon을 통한 toggle <br>
     <img width="85%" src="https://user-images.githubusercontent.com/74173976/213905535-aae8af09-cbfb-459f-b2c7-228445ad2990.gif"/> <br><br>
  </li>
</ul>

## server data
<ul>
  <li> mock server로 json-server 활용 </li>
  <li>
    <details>
      <summary>
        예시 데이터
      </summary>

      ```json
    {
      "statusList": [
        {
          "id": 1,
          "statusIndex": 1,
          "statusName": "해야할 일",
          "order": [
            "-1"
          ]
        },
        {
          "id": 2,
          "statusIndex": 2,
          "statusName": "하고 있는 일",
          "order": [
            "-2"
          ]
        },
        {
          "id": 3,
          "statusIndex": 3,
          "statusName": "완료한 일",
          "order": [
            "-3"
          ]
        }
      ],
      "cardList": [
        {
          "title": "3주차 보충학습",
          "content": "this를 설명해보자!",
          "author": "author by web",
          "status": 1,
          "date": "2023-01-21T12:51:17.916Z",
          "id": "-1"
        },
        {
          "title": "Github",
          "content": "README 정리",
          "author": "author by web",
          "status": 2,
          "date": "2023-01-21T12:51:20.835Z",
          "id": "-2"
        },
        {
          "title": "설날",
          "content": "가족들과 시간 보내기",
          "author": "author by web",
          "status": 3,
          "date": "2023-01-21T12:51:23.083Z",
          "id": "-3"
        }
      ],
      "menuList": [
        {
          "action": "CREATE",
          "actionTime": "1월 22일 16시 39분",
          "id": 410,
          "columnName": "하고 있는 일",
          "cardTitle": "노래 듣기"
        },
        {
          "action": "DELETE",
          "actionTime": "1월 22일 16시 39분",
          "id": 918,
          "columnName": "하고 있는 일",
          "cardTitle": "노래 듣기"
        }
      ]
    }
    ```

    </details>
  </li>    
</ul>
  
<br>
  
## 요구 사항
### 2주차
<ol>
  <li> Todo 삭제, 편집 ✅ </li>
  <li> Drag & Drop ✅ </li>
  <li> prototype 활용한 객체 1개 이상 ✅ </li>
  <li> ES classes 활용 객체 1개 이상 ✅ </li>
  <li> querySelector 구현 ✅ </li>
</ol>

<br>

### 3주차 요구사항
<ol>
  <li> Mock 서버 or 실제 서버 활용 ✅ </li>
  <li> fetch api에 then, async/await 활용 ✅</li>
  <li> Store, View 관계 느슨하게 </li>
  <li> Promise 객체 만들기 </li>
  <li> 사이드바 시간 반영 ✅</li>
</ol>

<br>

## 리팩토링 가이드
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
