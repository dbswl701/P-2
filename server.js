const express = require('express');
const { connect } = require('http2');
const mysql = require('mysql');
const path = require("path");

// express 사용
const app = express();


// express.static 미들웨어 사용
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'proj'
});

// express서버-mysql 연결 확인용
conn.connect(function(error){
  if(error){
    console.log("error!!!!!");
  }
  console.log("connected");
  // 확인
  conn.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
      console.log(error);
    }
    console.log(topics);
  });
})


// 3000 port 생성 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("Server running ...."));