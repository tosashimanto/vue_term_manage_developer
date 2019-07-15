/**
 * 擬似メータークラウド
 */
const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const io = require("socket.io-client");
const socket = io("http://localhost:8331");
const moment = require("moment-timezone");

module.exports = { path: "/meter_cloud", handler: app };

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

var t = {
  // 会社コード
  companyCode: "",
  // 無線番号(IPタブレットルール。3桁であれば先頭に0は入れない！)
  fmNo: "",
  // 営業開始日時。フォーマットは「yyyyMMddHHmm」。
  startTime: "",
  // 乗車日時(迎車営業の場合は「営業開始日時」と異なる可能性あり)フォーマットは「yyyyMMddHHmm」。
  getonTime: "",
  // 降車日時。(営業終了日時)フォーマットは「yyyyMMddHHmm」。
  getoffTime: "",
  // 決済金額
  paymentAmount: 0,
  // 決済種別
  paymentType: ""
};

/**
 * メータークラウドPost
 */
app.post("/meterdata/tablet/payment", (req, res) => {
  console.log("================================================");
  console.log("メータークラウドPost");
  // リクエストボディを出力
  console.log(req.body);
  moment.tz.setDefault("Asia/Tokyo");
  req.body.receive_date = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
  console.log(JSON.stringify(req.body, undefined, 4));

  socket.emit("meter_cloud_event", { my: req.body });
  var result = {
    status: "OK"
  };
  res.json(result);
});
