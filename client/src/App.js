//app.js 1/21
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./components/Nav.js";
import Main from "./pages/Main.js";
import AuthPage from "./pages/AuthPage.js";
import UserMypage from "./pages/UserMypage.js";
import DocMypage from "./pages/DocMypage.js";
import Footer from "./components/Footer.js";
import Kakao from "./components/Kakao.js";
import QnaPage from "./pages/QnaPage.js";
import QnaDetail from "./pages/QnaDetail.js";
import ScrollTop from "./components/Scroll.js";
import Medical from "./pages/Medical.js";
import Swal from "sweetalert2";
import { message } from "./modules/message";

import axios from "axios";

function App() {
  // console.log("App.js랜더링");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null); //사용자 정보
  const [auth, setAuth] = useState("");
  // const [qnaDetail, setqnaDetail] = useState(null);
  // const [googleToken, setGoogleToken] = useState("");

  const isAuthenticated = () => {
    const authnumber = parseInt(localStorage.getItem("auth"));
    //< --일반인 로그인 -->
    if (authnumber === 2 || authnumber === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/public/userinfo`, {
          withCredentials: true, //이게 없으니까 cookies안에 토큰이 없다.
        })
        .then((res) => {
          setUserInfo(res.data.userInfo);
          setAuth(res.data.userInfo.auth); //nav에 내려주기 위해
          setIsLogin(true);
          // navigate("/");
        });

      //<-- 의사 로그인 -->
    } else if (authnumber === 1) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/doctor/userinfo`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data.userInfo);
          setAuth(res.data.userInfo.auth);
          setIsLogin(true);
          // navigate("/");
        });

      // <-- 카카오 로그인 -->
    } else if (authnumber === 4) {
      console.log("userInfo?", userInfo);
      console.log("isLogin?", isLogin);
      axios
        .post(`${process.env.REACT_APP_API_URL}/oauth/kakao`, {
          //서버로부터 사용자 정보 받아오기
          access_token: localStorage.getItem("accessToken"),
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            const user = res.data;
            localStorage.setItem("userid", user.data.id);
            console.log(localStorage.getItem("userid"));
            const userInfo = {
              id: user.data.id,
              nickname: user.data.properties.nickname,
              email: user.data.kakao_account.email,
            };
            setUserInfo(userInfo); //state변경될때마다 카카오로 토큰요청이 2번 간다. <Kakao> https://kauth.kakao.com/auth/token
            setIsLogin(true);
            navigate("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Apang 로그인",
              text: message.loginFail,
            });
          }
        });
    }
  };

  const handleResponseSuccess = (authnumber) => {
    localStorage.setItem("auth", authnumber);
    isAuthenticated();
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const LoginHandler = () => {
    isAuthenticated();
  };

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/common/signout`,
        {
          auth: auth,
          userid: localStorage.getItem("userid"),
          // googleToken,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
        // setAccessToken("");
        localStorage.removeItem("userid");
        localStorage.removeItem("auth");
        localStorage.removeItem("accessToken");
        Swal.fire({
          icon: "success",
          title: "또 만나요",
          text: "로그아웃 되었습니다",
        });
        navigate("/");
      });
  };

  const getGoogleToken = async (authorizationCode) => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}/oauth/google`,
      method: "post",
      data: { authorizationCode },
      withCredentials: true,
    }).then((res) => {
      // console.log("이건 데이터", res.data);
      // console.log("이건 이메일", res.data.data.email);
      // console.log("이건 이름", res.data.data.name);
      if (res.status === 200) {
        const user = res.data;
        const userInfo = {
          id: user.data.sub,
          nickname: user.data.name,
          email: user.data.email,
        };
        // setGoogleToken(res.data.token);
        setUserInfo(userInfo);
        localStorage.setItem("auth", 3);
        setAuth(localStorage.getItem("auth"));
        setIsLogin(true);
        navigate("/");
        console.log("유저인포", userInfo);
      } else {
        Swal.fire({
          icon: "error",
          title: "Apang 로그인",
          text: message.loginFail,
        });
      }
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    // console.log(`url ${url}`);
    const authorizationCode = url.searchParams.get("code");
    // console.log(`authorizationCode ${authorizationCode}`);
    if (authorizationCode) {
      getGoogleToken(authorizationCode);
    }
  }, []);

  return (
    <>
      <ScrollTop />
      <Nav
        isLogin={isLogin}
        auth={parseInt(localStorage.getItem("auth"))}
        handleResponseSuccess={handleResponseSuccess}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route
          path="/mypage/publicprofile"
          element={
            <UserMypage userInfo={userInfo} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/mypage/doctorprofile"
          element={
            <DocMypage userInfo={userInfo} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/oauth/callback/kakao"
          element={
            <Kakao
              LoginHandler={LoginHandler}
              isLogin={isLogin}
              userInfo={userInfo}
            />
          }
        />

        <Route
          path="/qna"
          element={
            <QnaPage
              isLogin={isLogin}
              // userInfo={userInfo}
              auth={parseInt(localStorage.getItem("auth"))}
            />
          }
        />

        <Route
          path="/medicallist"
          element={
            <Medical
              isLogin={isLogin}
              userInfo={userInfo}
              auth={parseInt(localStorage.getItem("auth"))}
            />
          }
        />
        <Route
          path="/qna/detail/:id"
          element={
            <QnaDetail
              isLogin={isLogin}
              userInfo={userInfo}
              auth={parseInt(localStorage.getItem("auth"))}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
