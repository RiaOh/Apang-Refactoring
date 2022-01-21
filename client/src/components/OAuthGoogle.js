import qs from "qs";

const GOOGLE_AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";

const queryStr = qs.stringify({
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirect_uri: `https://localhost:3000`,
  response_type: "code",
  scope: "openid profile email",
  access_type: "offline",
});

export const GOOGLE_AUTHORIZE_URL = GOOGLE_AUTHORIZE_URI + "?" + queryStr;
