const { doctors } = require("../../models");

module.exports = async (req, res) => {
  // console.log(req.body);
  // req.body에 회원가입 할 정보가 담겨있음.
  const doctorInfo = req.body;
  try {
    if (
      doctorInfo.email === "" ||
      doctorInfo.name === "" ||
      doctorInfo.password === "" ||
      doctorInfo.hospital === "" ||
      doctorInfo.license === ""
    ) {
      // 항목이 비었을때 400코드에 bad request메세지를 보내주고 클라이언트에서는 항목이비었다는 메세지.
      res.stats(400).send({ message: "잘못된 요청" });
    } else {
      doctors
        .findOrCreate({
          where: { email: doctorInfo.email },
          defaults: {
            password: doctorInfo.password,
            name: doctorInfo.name,
            hospital: doctorInfo.hospital,
            license: doctorInfo.license,
            auth: 1,
            agree: "false",
            profile_img: "doctor.png",
          },
        })
        .then(([doctors, created]) => {
          // create => true : 중복되는 이메일이 없어서 새로 만들어줌.
          // create => false : 중복되는 이메일이 있어서 새로 만들 수 없음.

          // 중복되는 이메일이 없을 때 201상태코드와 SignUp Ok메세지를 보내줌.
          if (created) {
            res.status(201).send({ message: "의사유저 회원가입 성공" });
          }
          // 중복되는 이메일이 있을때 409상태코드와 Eamil Exist메세지를 보내줌.
          else {
            res.send({ status: 409, error: 2, message: "동일한 이메일 존재" });
          }
        });
    }
  } catch (err) {
    // console.log(err);
  }
};
