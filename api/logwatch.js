
const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment-timezone");
// const io = require("socket.io-client");
// const socket = io("http://localhost:8331");


module.exports = { path: "/logwatch", handler: app };

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.raw({
    type: "*/*",
    imit: "10mb" // default limit: '100kb
  })
);


app.put("/upload/log", (req, res) => {
    console.log("content-type: " + req.header("content-type"));
    console.log("user agent: " + req.header("User-Agent"));
    console.log("is text: " + req.is("text/*"));  
    console.log("req.body=" + req.body);

    const jsonString = JSON.stringify(req.body, undefined, 4);
    const jsonObj = JSON.parse(jsonString);
    jsonObj.messages.sort(function(a, b) {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
      });
    console.log("jsonString=" + jsonString);
    var concateString = ""
    jsonObj.messages.forEach(function(message, index) {
        concateString += message.timestamp + "\t" + message.message + "\n"
    });
    console.log("concateString=" + concateString);
    moment.tz.setDefault("Asia/Tokyo");
    const t = moment(new Date()).format("YYYYMMDD _HHmmss");
    console.log("t=" + t);
    fs.writeFile("./log/log_" + t + ".tsv", concateString, err => {
      if (err) {
        console.log("エラーが発生しました err=" + err);
      } else {
        console.log("ファイルが正常に書き出しされました");
      }
    });
    var user = {
      result : "OK"
    };
    res.json(user);
  });