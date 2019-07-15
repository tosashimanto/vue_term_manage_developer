/**
 * Upload JSONファイルチェッカー
 */
const app = require("express")();
const bodyParser = require("body-parser");

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
 * Upload JSONファイルチェック
 */
app.put("/upload_check", (req, res) => {
  console.log("content-type: " + req.header("content-type"));
  console.log("user agent: " + req.header("User-Agent"));
  console.log("is text: " + req.is("text/*"));
  var apks;
  if (req.is("application/json")) {
    // リクエストボディを出力
    const jsonString = JSON.stringify(req.body);
    console.log("req.body=" + jsonString);
    var resultUploadData = JSON.parse(jsonString);
    apks = resultUploadData.root;
    if (!apks) {
      apks = resultUploadData;
    }
    // console.log("apks=" + apks)
    console.log("apks length=" + apks.length);
    apks.forEach(function(apk, index) {
      console.log("apk" + index + "=" + apk.apk);
      console.log("versionName" + index + "=" + apk.versionName);
      console.log("target.length" + index + "=" + apk.target.length);
    });
  }

  res.json(apks);
});
