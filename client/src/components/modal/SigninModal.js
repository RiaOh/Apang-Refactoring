import React, { useState } from "react";
import styled from "styled-components";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import { KAKAO_AUTH_URL } from "../OAuthKakao";
import { GOOGLE_AUTHORIZE_URL } from "../OAuthGoogle";
import axios from "axios";
import Swal from "sweetalert2";
import { message } from "../../modules/message";

export const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

export const ModalBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 23rem;
  max-height: 26rem;
  border-radius: 10px;
  background-color: #fbf3ed;
  overflow: hidden;
`;

export const LoginHeader = styled.div`
  position: relative;
  padding: 0.5rem 3.5rem 1rem 9.3rem;
  background-color: #fbf3ed;
  font-weight: 500;
  color: black;
  font-size: 1.5rem;

  & > button {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    width: 1.5rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    color: ${({ theme }) => theme.color.hamburger};
    border: 0;
    cursor: pointer;
    background-color: #fbf3ed;
  }
`;

export const LoginBody = styled.div`
  padding: 1rem;
  color: black;
  background-color: #fbf3ed;
  border-radius: 10px;
  &:focus {
    outline: 0.1rem solid #63b5f6;
    border-radius: 10px;
  }

  & > div {
    padding: 0rem 0.7rem 0.7rem 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
      border-radius: 10px;
    }
  }

  & > div > input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    width: 17rem;
    height: 2.5rem;
    font-size: 0.8rem;
    border: 0.1rem solid #dee2e6;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
      border-radius: 10px;
    }
  }
`;

export const LoginFooter = styled.div`
  padding: 0.1rem 1rem 1rem 1rem;
  background-color: #fbf3ed;
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #b5afaf;
    font-size: 0.5rem;
    margin: 0.5rem;
  }
  .line::before,
  .line::after {
    content: "";
    flex-grow: 1;
    background: #dee2e6;
    height: 0.1rem;
    margin: 0 2rem;
  }
`;

export const SocialLoginHeader = styled.div`
  font-size: 0.8rem;
  padding-top: 0.1rem;
  padding-left: 1.2rem;
  padding-bottom: 1rem;
  background-color: #fbf3ed;
`;

export const SocialLogin = styled.a`
  padding: 0.1rem 1rem 1rem 0.8rem;
`;

export const Button = styled.button`
  margin: 0rem 2rem;
  background: #6ec5ff;
  white-space: nowrap;
  padding: 0.6rem 7.3rem;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #002171;
  }
`;

export const Msg = styled.div`
  color: red;
  font-size: 13px;
`;

export const SocialKakaoLogin = styled.a`
  text-decoration: none;
  font-size: 0.8rem;
`;

export const SocialGoogleLogin = styled.a`
  text-decoration: none;
  font-size: 0.8rem;
`;

export const LoginFeet = styled.div`
  padding: 1rem 0rem 0rem 0rem;
  background-color: #fbf3ed;
`;

export const ButtonGoogle = styled.div`
  & form {
    margin: 0rem 2rem;
    // background: #4285f4;
    background: #ffffff;
    white-space: nowrap;
    padding: 0.6rem 0.8rem;
    // color: #ffffff;
    color: black;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      // background-color: #0059c1;
      background-color: #4285f4;
      color: #ffffff;
    }
  }
  & img {
    width: 1rem;
    margin-right: 3.5rem;
  }
`;

export const ButtonKakao = styled.div`
  & form {
    margin: 0rem 2rem;
    background: #f7e600;
    white-space: nowrap;
    padding: 0.6rem 0.8rem;
    color: black;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      background-color: #e0d400;
    }
    & img {
      width: 1rem;
      margin-right: 3.5rem;
    }
  }
`;

export const LoginFeets = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #b5afaf;
  font-size: 0.8rem;
  margin: 0.5rem;
  background-color: #fbf3ed;
  margin-left: 2.3rem;
  margin-top: 1.2rem;
  .span {
    margin-left: 0.5rem;
    color: #63b5f6;
    cursor: pointer;
  }
`;

function SigninModal({ open, close, handleResponseSuccess, swi }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const reset = () => {
    setUserInfo({
      email: "",
      password: "",
    });
  };

  const handleInputChange = (key) => (e) => {
    setUserInfo({
      ...userInfo,
      [key]: e.target.value,
    });
  };

  const handleSignIn = () => {
    const { email, password } = userInfo;
    if (email === "") {
      Swal.fire({
        icon: "info",
        text: message.emptyMessage,
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    } else if (password === "") {
      Swal.fire({
        icon: "info",
        text: message.emptyMessage,
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/common/signin`, userInfo, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("auth번호!", res.data.data.auth);
          if (res.data.error === 1) {
            Swal.fire({
              icon: "info",
              title: "Apang 로그인",
              text: message.loginFail,
              showConfirmButton: false,
              timer: 1000,
            });
          } else if (res.data.error === 2) {
            Swal.fire({
              icon: "error",
              title: "Apang 로그인",
              text: message.doctorFail,
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            handleResponseSuccess(res.data.data.auth);
            // console.log("로그인 완료");
            // console.log(res.status);
            Swal.fire({
              icon: "success",
              title: "Apang 로그인",
              text: message.loginSuccess,
              showConfirmButton: false,
              timer: 1000,
            });
            close();
          }
        });
    }
  };
  return open ? (
    <ModalBackGround
      onClick={() => {
        reset();
        close();
      }}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <LoginHeader>
          <button onClick={close}> &times; </button>
        </LoginHeader>
        <LoginBody>
          <div>
            <input
              id="loginEmail"
              type="email"
              placeholder="이메일"
              onChange={handleInputChange("email")}
              value={userInfo.email}
            />
          </div>
          <div>
            <input
              id="loginPassword"
              type="password"
              placeholder="비밀번호"
              onChange={handleInputChange("password")}
              value={userInfo.password}
            />
          </div>
          <Button onClick={handleSignIn}>로그인</Button>
        </LoginBody>
        <LoginFooter>
          <div className="line">또는</div>
          <LoginFeet>
            <SocialKakaoLogin href={KAKAO_AUTH_URL}>
              <ButtonKakao>
                <form>
                  <img src={kakao} alt="kakaologin"></img>
                  카카오로 간편로그인
                </form>
              </ButtonKakao>
            </SocialKakaoLogin>
          </LoginFeet>

          <LoginFeet>
            <SocialGoogleLogin href={GOOGLE_AUTHORIZE_URL} onClick={close}>
              <ButtonGoogle>
                <form>
                  <img src={google} alt="googlelogin"></img>
                  구글로 간편로그인
                </form>
              </ButtonGoogle>
            </SocialGoogleLogin>
          </LoginFeet>
          <LoginFeets>
            <div>아팡이 처음이신가요?</div>
            <span className="span" onClick={swi}>
              회원가입
            </span>
          </LoginFeets>
        </LoginFooter>
      </ModalBox>
    </ModalBackGround>
  ) : null;
}

export default SigninModal;
