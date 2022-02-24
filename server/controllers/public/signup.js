const { users } = require("../../models");

module.exports = async (req, res) => {
  try {
    console.log("일반 회원가입 : ", req.body);
    // req.body에 회원가입 할 정보가 담겨있음.
    const userInfo = req.body;
    if (
      userInfo.email === "" ||
      userInfo.nickname === "" ||
      userInfo.password === ""
    ) {
      // 항목이 비었을때 400코드에 bad request메세지를 보내주고 클라이언트에서는 항목이비었다는 메세지.
      res.status(400).send({ message: "잘못된 요청" });
    } else {
      // 같은 닉네임이 존재하는지 확인
      const isExist = await users.findOne({
        where: {
          nickname: userInfo.nickname,
        },
      });
      // console.log("같은닉네임 : ", isExist);
      if (isExist) {
        res.send({ status: 409, error: 3, message: "동일한 닉네임 존재" });
      } else {
        users
          .findOrCreate({
            where: { email: userInfo.email },
            defaults: {
              password: userInfo.password,
              nickname: userInfo.nickname,
              profile_img: "user.png",
              auth: 2,
            },
          })
          .then(([users, created]) => {
            // create => true : 중복되는 이메일이 없어서 새로 만들어줌.
            // create => false : 중복되는 이메일이 있어서 새로 만들 수 없음.

            // 중복되는 이메일이 없을 때 201상태코드와 SignUp Ok메세지를 보내줌.
            if (created) {
              res.status(201).send({ message: "일반유저 회원가입 완료" });
            }
            // 중복되는 이메일이 있을때 409상태코드와 Eamil Exist메세지를 보내줌.
            else {
              res.send({
                status: 409,
                error: 2,
                message: "동일한 이메일 존재",
              });
            }
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
