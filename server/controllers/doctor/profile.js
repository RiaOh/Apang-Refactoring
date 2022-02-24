const { doctors } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../client/public/", "uploads"),
  filename: function (req, file, cb) {
    fileName = file.originalname;
    console.log("들어왔나?", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = async (req, res) => {
  try {
    const userInfo = isAuthorized(req);
    console.log(userInfo);
    if (userInfo.auth === 0) {
      const id = Object.keys(req.body).toString();
      console.log(id);
      await doctors.update(
        {
          agree: "true",
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send({ message: "의사 신청 완료" });
    } else {
      console.log("이름이랑 병원명 어째뜸? : ", req.body);
      const user = await doctors.findOne({
        where: {
          id: userInfo.id,
        },
      });
      console.log("user : ", user);
      if (req.body.password === undefined) {
        if (req.body.onlyName) {
          if (req.body.onlyName.name === "") {
            await doctors.update(
              {
                name: user.dataValues.name,
                hospital: req.body.onlyName.hospital,
              },
              {
                where: {
                  id: userInfo.id,
                },
              }
            );
          } else if (req.body.onlyName.hospital === "") {
            await doctors.update(
              {
                name: req.body.onlyName.name,
                hospital: user.dataValues.hospital,
              },
              {
                where: {
                  id: userInfo.id,
                },
              }
            );
          } else {
            await doctors.update(
              {
                name: req.body.onlyName.name,
                hospital: req.body.onlyName.hospital,
              },
              {
                where: {
                  id: userInfo.id,
                },
              }
            );
          }
          res.status(200).send({ message: "이름, 병원명 수정완료" });
        } else {
          const user = await doctors.findOne({
            where: {
              id: userInfo.id,
            },
          });
          console.log("user : ", user);
          if (user.dataValues.profile_img !== "doctor.png") {
            const img = user.dataValues.profile_img;
            // console.log(img);
            fs.unlink(
              path.join(__dirname, "../../../client/public/uploads/", img),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
          try {
            let upload = multer({
              storage: storage,
            }).single("apang");

            upload(req, res, function (err) {
              const name = req.body.name;
              const hospital = req.body.hospital;
              const filename = req.file.filename;
              if (!req.file) {
                return res.send("이미지를 올려주세요");
              } else if (err instanceof multer.MulterError) {
                return res.send(err);
              } else if (err) {
                return res.send(err);
              }
              if (name === "" && hospital === "") {
                doctors.update(
                  {
                    profile_img: filename,
                  },
                  {
                    where: {
                      id: userInfo.id,
                    },
                  }
                );
                res.status(200).send({ message: "의사 프로필 수정 완료" });
              } else {
                doctors.update(
                  {
                    profile_img: filename,
                    name: name,
                    hospital: hospital,
                  },
                  {
                    where: {
                      id: userInfo.id,
                    },
                  }
                );
                res
                  .status(200)
                  .send({ message: "이름, 병원명, 프로필사진 수정 완료" });
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        const user = doctors.findOne({
          where: {
            id: userInfo.id,
            password: req.body.password,
          },
        });
        // !user가 아니라 null로 해야됨. user를 선언해서 findOne함수한것을 담은 거라서 없으면 저 변수는 Null이 되기때문에
        if (user === null) {
          res.send({ status: 401, message: "비밀번호가 맞지 않습니다." });
        } else {
          doctors.update(
            {
              password: req.body.newPassword,
            },
            {
              where: {
                id: userInfo.id,
              },
            }
          );
          res.status(200).send({ message: "비밀번호 수정 완료" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
