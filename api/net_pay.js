/**
 * 擬似NetPay
 */
const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const io = require("socket.io-client");
const socket = io("http://localhost:8331");
const moment = require("moment-timezone");

module.exports = { path: "/net_pay", handler: app };

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

var responseNetPay = {
    isDenied : true,
    isQueued : true,
    isGathered : true,
    resultCode: "0",
    Message: ""
};

const NETPAY_EXECUTE_RESULT_OK = "0";
const NETPAY_EXECUTE_RESULT_NG = "1";
const NETPAY_EXECUTE_RESULT_ALREADY_PAID = "2";

/**
 * NetPay Post
 */
app.post("/mob/vehicle/netpay/", (req, res) => {
    console.log("================================================");
    console.log("NetPay Post");
    console.log("APIKey: " + req.header("APIKey"));
    console.log("Authorization: " + req.header("Authorization"));
    // リクエストボディを出力
    console.log(req.body);
    moment.tz.setDefault("Asia/Tokyo");
    req.body.receive_date = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
    console.log(JSON.stringify(req.body, undefined, 4));

    socket.emit("net_pay_event", { my: req.body });
    res.json(responseNetPay);
});
