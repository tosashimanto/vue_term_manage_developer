/**
 * メータークラウド
 */
const app = require("express")();
const moment = require("moment-timezone");
const bodyParser = require("body-parser");
const io = require("socket.io-client");
const socket = io("http://localhost:8331");

module.exports = { path: "/vehiclelog", handler: app };

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

/**
 * Vehicle Log Post
 */
app.post("/vehicle-log/v1", (req, res) => {
  console.log("================================================");
  console.log("Vehicle Log Post");
  // リクエストボディを出力
  // console.log(req.body);
  const jsonString = JSON.stringify(req.body);
  console.log("req.body=" + jsonString);

  moment.tz.setDefault("Asia/Tokyo");
  req.body.receive_date = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
  socket.emit("vehicle_log_event", { my: req.body });
  var result = {
    status: "OK"
  };
  res.json(result);
});
