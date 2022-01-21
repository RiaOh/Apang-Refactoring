const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 80;
const indexRouter = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTION", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use("/", indexRouter);

// module.exports = app.listen(PORT, () => {
//   console.log(`Server Start on ${PORT}`);
// });
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log("https server runnning"));
} else {
  server = app.listen(PORT, () => console.log("http server runnning"));
}
module.exports = server;
