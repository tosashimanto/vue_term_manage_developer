const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");

module.exports = { path: "/api", handler: app };

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
 * Imageファイル upload
 */
app.put("/upload/:screenName", (req, res) => {
  console.log("content-type: " + req.header("content-type"));
  console.log("user agent: " + req.header("User-Agent"));
  console.log("is text: " + req.is("text/*"));

  const screenName = req.params.screenName;
  console.log("Image file put test screenName=" + screenName);
  console.log("req.body.length=" + req.body.length);
  if (req.is("text/*")) {
    // リクエストボディを出力
    console.log("req.body=" + req.body);
  }

  fs.writeFile("./tmp/" + screenName + ".png", req.body, err => {
    if (err) {
      console.log("エラーが発生しました");
    } else {
      console.log("ファイルが正常に書き出しされました");
    }
  });

  var user = {
    id: 0,
    name: "res test"
  };
  res.json(user);
});
