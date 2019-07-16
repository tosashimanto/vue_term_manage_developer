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
  address: "東京都千代田区1-2-3",
  tel: "03-1111-2222",
  car_id: "8140",
  setting_password: "2151",
  interval_distance: 60,
  interval_time: 10,
  jtx_link_enabled: 1,
  log_output_type: 0,
  sim_phone_number: null,
  settle_amount_output_type: 0,
  ip_company_id: "00002",
  group_name: "日本",
  running_start: "1000-01-01 00:00:00",
  prefecture_code: 123,
  radio_available_on: null,
  translation_available_on: null,
  ipdispatch_mode: 0,

  //-------------------------------
  drivers_singulation_available_on: "2019-03-25 13:52:01", // DRIVER'S単体化利用開始日
  netpay_api_store_id: "1234567890", // ネット決済加盟店ID
  netpay_api_account: "Japan Taro", // ネット決済アカウント
  netpay_api_password: "password", // ネット決済パスワード
  drivers_meter_type: "yazaki24", // 単体化 メーター種別
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
