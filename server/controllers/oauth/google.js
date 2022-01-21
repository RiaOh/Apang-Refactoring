const axios = require("axios");
const jwtDecode = require("jwt-decode");
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

module.exports = async (req, res) => {
  // console.log("구글인포", req.body);
  const decoded = await axios
    .post("https://oauth2.googleapis.com/token", {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: "https://localhost:3000",
    })
    .then((data) => {
      const id_token = data.data.id_token;
      const userInfo = jwtDecode(id_token);
      // console.log(userInfo);
      res.status(200).send({
        data: userInfo,
        message: "Google Signin Authorized",
        token: id_token,
      });
    })
    .catch(() => {
      res
        .status(401)
        .send({ data: null, message: "Google Signin Not Authorized" });
    });
};
