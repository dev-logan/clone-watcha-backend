require('dotenv').config();

const express = require("express");
const connect = require("./schemas")
const cors = require("cors");
const app = express();
const { port } = process.env

// Routers
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const commentRouter = require("./routes/comments");

// 몽고 db 커넥트
connect();

app.use((req, res, next) => {
    console.log('Request URL:', `[${req.method}]`, req.originalUrl, ' - ', new Date().toLocaleString())
    next();
});

app.use(cors());
app.use(express.urlencoded());
app.use(express.json())

app.use("/api", [userRouter, movieRouter, commentRouter]);


app.use((err, req, res, next) => {
    res.status(401).send({ result: "fail", msg: err.message })
})


app.listen(port, () => {
    console.log(port, "포트로 서버가 요청 받을 준비가 됐습니다!");
});
