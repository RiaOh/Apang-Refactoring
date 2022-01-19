//일단 멀터 한거 Review/uploads.js
const { reviews } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../client/public/", "receipts"),
  filename: function (req, file, cb) {
    fileName = file.originalname;
    console.log("들어왔나?", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  const kakaoUserid = req.body.kakao_userid;

  //<---- kakao로 로그인 했을 때!---->
  if (kakaoUserid) {
    if (req.body.receipts_img === "" || req.body.content === "") {
      // 항목이 비었을때
      res.status(400).send({ message: "Bad Request" });
    } else {
      //항목이 다 적혀있을때
      let upload = multer({
        storage: storage,
      }).single("receipts_img");

      //여기가 시작
      upload(req, res, function (err) {
        let filename = req.file.filename;
        console.log("filename은?", filename);
        if (!req.file) {
          return res.send("영수증을 올려주세요");
        } else if (err instanceof multer.MulterError) {
          return res.send(err);
        } else if (err) {
          return res.send(err);
        }
        reviews
          .create({
            receipts_img: filename,
            content: req.body.content,
            hospital_name: req.body.hospital_name,
            users_id: kakaoUserid,
          })
          .then(() => {
            res.status(201).send({ message: "Review Upload Ok" });
          });
      });

      // 여기가 끝
    }
    //<---- 일반 로그인 시 ---->
  } else if (!kakaoUserid) {
    //<---- 일반 로그인 시, 토큰이 유효하지 않을 때 ---->

    if (!accessTokenData) {
      res.status(401).send({ data: null, message: "Invalid Token" });
      //<--- 일반 로그인 시, 토큰은 유효, but 항목이 비었을 때 --->
    } else if (accessTokenData) {
      let upload = multer({
        storage: storage,
      }).single("receipts_img");

      upload(req, res, function (err) {
        console.log("req what?", req);
        if (!req.file || !req.body.content) {
          res.send({ status: 400, message: "Bad Request" });
        } else {
          let filename = req.file.filename;
          console.log("filename은?", filename);
          if (!req.file) {
            return res.send("영수증을 올려주세요");
          } else if (err instanceof multer.MulterError) {
            return res.send(err);
          } else if (err) {
            return res.send(err);
          }
          reviews
            .create({
              receipts_img: filename,
              content: req.body.content,
              hospital_name: req.body.hospital_name,
              users_id: accessTokenData.id,
            })
            .then(() => {
              res.status(201).send({ message: "Review Upload Ok" });
            });
        }
      });
    }
  }
};
