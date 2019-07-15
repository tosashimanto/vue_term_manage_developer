/**
 * 擬似乗務員端末管理サーバー
 */
const app = require("express")();
const bodyParser = require("body-parser");
// Client API を読み込む
const io = require("socket.io-client");
// 通信先のサーバを指定する
const socket = io("http://localhost:8331");

module.exports = { path: "/termmng", handler: app };

// urlencodedとjsonは別々に初期化する
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// JSON形式で設定
app.use(bodyParser.json());
// バイナリ形式で設定
app.use(
  bodyParser.raw({
    type: "*/*",
    // type: 'image/png', この記述はダメっぽい
    imit: "10mb" // default limit: '100kb
  })
);

var response = {
  result_code: 0,
  result_message: "OK"
};

var model = {
  company_id: "99003",
  company_name: "Japan株式会社",
  car_id: "8140",
  setting_password: "2151",
  interval_distance: 60,
  interval_time: 10,
  jtx_link_enabled: 1,
  ipdispatch_mode: 0,
  drivers_singulation_enabled: 1, // DRIVER'S単体化有効フラグ
  netpay_api_account: "Japan Taro", // ネット決済アカウント
  netpay_api_password: "password", // ネット決済パスワード
  netpay_api_store_id: "1234567890", // ネット決済加盟店ID
  meter_type: "yazaki24", // 単体化 メーター種別
  loading_card_type: 1, // ローディングカード種別
  version_btif_ble: "999.999.999 999.999.999 999.999.999", // BTIF(Bluetooth) ファームバージョン
  correct_fare_available: 0 // 金額置換利用フラグ
};

/**
 * 乗務員端末管理サーバー乗務員端末設定情報取得
 */
app.get("/v1/driver_term/settings/:deviceId", (req, res) => {
  console.log("================================================");
  console.log("乗務員端末設定情報取得");
  const deviceId = req.params.deviceId;
  console.log("DeviceID=" + deviceId);
  response.model = model;
  res.json(response);
});

/**
 * 乗務員端末設定情報更新
 */
app.put("/v1/driver_term/settings/:deviceId", (req, res) => {
  console.log("================================================");
  console.log("乗務員端末設定情報更新");
  const deviceId = req.params.deviceId;
  console.log("DeviceID=" + deviceId);
  const jsonString = JSON.stringify(req.body);
  console.log(JSON.stringify(req.body, undefined, 4));
  const receive_data = JSON.parse(jsonString);
  model = receive_data.model;
  console.log(JSON.stringify(model, undefined, 4));

  socket.emit("term_mng_event", { my: receive_data.model });

  // リクエストボディを出力
  console.log(req.body);
  var result = {
    result_code: 0,
    result_message: "OK"
  };
  res.json(result);
});

/**
 * 乗務員端末設定情報更新
 */
app.put("/meterdata/tablet/payment", (req, res) => {
  console.log("乗務員端末設定情報更新");
  const deviceId = req.params.deviceId;
  console.log("DeviceID=" + deviceId);
  // リクエストボディを出力
  console.log(req.body);
  const jsonString = JSON.stringify(req.body);
  console.log("req.body=" + jsonString);
  top = JSON.parse(jsonString);
  response.model = top.model;
  response2 = top.singulation;
  var result = {
    result_code: 0,
    result_message: "OK"
  };
  res.json(result);
});
