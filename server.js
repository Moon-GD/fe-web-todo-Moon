import express from "express";
import cors from "cors";

const app = express()
const port = 3000

// cors 허용 주소 관리
const allowedCrossOriginList = {
    origin: "http://127.0.0.1:5500",
    credentials: true
}

// cors 허용 주소 전달
app.use(cors(allowedCrossOriginList));

app.get('/get', (req, res) => {
    res.json([
        {
            title: "github 공부하기",
            content: "add, commit, push",
            author: "author by web",
            date: "Sun Jan 03 2023 00:00:00 GMT+0900 (한국 표준시)"
        },
        {
            title: "블로그에 포스팅할 것",
            content: "github 공부 내용",
            author: "author by web",
            date: "Sun Jan 02 2023 00:00:00 GMT+0900 (한국 표준시)"
        }
    ])
})

app.listen(port, () => { console.log(`server is running on port ${port}`); })