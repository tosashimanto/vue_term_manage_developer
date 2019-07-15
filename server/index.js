/**
 * expresサーバー起動
 *
 */
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // CORSを許可する処理を追加
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // Listen the server
  var server = app.listen(port, host);

  /**
   * Pageとの接続
   */
  const io2 = require("socket.io")(server);
  io2.on("connection", function(socket) {
    /**
     * 端末管理PageからのPOST
     */
    socket.on("term_manage_page_POST_MESSAGE", function(data) {
      console.log(`term_manage_page_connected[id:${socket.id}]`);
      // io2.emit("receive_term_manage_page_MESSAGE", data);
    });
    /**
     * メータークラウドPageからのPOST
     */
    socket.on("Pmeter_cloud_page_POST_MESSAGE", function(data) {
      console.log(`meter_cloud_page connected[id:${socket.id}]`);
      // io2.emit("receive_meter_cloud_page_MESSAGE", data);
    });
  });

  /**
   * API受診通知
   */
  var io = require("socket.io").listen(8331);
  io.on("connection", function(socket) {
    console.log("api server connection!!");
    // クライアントへデータ送信
    socket.emit("api_res", { hello: "world" });
    /**
     * term manager API受診通知
     */
    socket.on("term_mng_event", function(data) {
      // クライアントから受け取ったデータを出力する
      console.log("term_mng_event=" + data);
      const jsonString = JSON.stringify(data.my);
      console.log("term_mng_event from api=" + jsonString);
      io2.emit("receive_term_manage_page_MESSAGE", data.my);
      // io2.emit("receive_term_manage_page_MESSAGE", data);
    });
    /**
     * メータークラウドAPI受信通知
     */
    socket.on("meter_cloud_event", function(data) {
      // クライアントから受け取ったデータを出力する
      console.log("meter_cloud_event=" + data);
      const jsonString = JSON.stringify(data.my);
      console.log("meter_cloud_event from api=" + jsonString);
      io2.emit("receive_meter_cloud_page_MESSAGE", data.my);
    });
    /**
     * Vehicle log API受信通知
     */
    socket.on("vehicle_log_event", function(data) {
      // クライアントから受け取ったデータを出力する
      console.log("vehicle_log_event=" + data);
      const jsonString = JSON.stringify(data.my);
      console.log("vehicle_log_event from api=" + jsonString);
      io2.emit("receive_vehicle_log_page_MESSAGE", data.my);
    });
  });

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
