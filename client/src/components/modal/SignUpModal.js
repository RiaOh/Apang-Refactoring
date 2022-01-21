import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { valid } from "../../modules/validator";
import { message } from "../../modules/message";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import { KAKAO_AUTH_URL } from "../OAuthKakao";
import { GOOGLE_AUTHORIZE_URL } from "../OAuthGoogle";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
  height: 33rem;
  border-radius: 1rem;
  background-color: #fbf3ed;
  overflow: hidden;
`;

export const LoginHeader = styled.div`
  position: relative;
  padding: 1.5rem 3.5rem 1rem 9rem;
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

export const SelectHeader = styled.div`
  position: relative;
  padding: 0 3.5rem 0 7rem;
  background-color: #fbf3ed;
  font-weight: 500;
  color: black;
  font-size: 1.5rem;
`;

export const LoginBody = styled.div`
  padding: 1rem;
  color: black;
  background-color: #fbf3ed;

  & > div {
    padding: 0 0.7rem 0.7rem 2rem;
    display: block;
    align-items: center;
    justify-content: center;
  }

  & > div > input {
    display: block;
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
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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

export const LoginFoot = styled.div`
  padding: 0.1rem 1rem 1rem 3.8rem;
  background-color: #fbf3ed;
`;

export const SocialLoginHeader = styled.div`
  background-color: #fbf3ed;
`;

export const SocialLogin = styled.a`
  padding: 0.1rem 1rem 1rem 2rem;
`;

export const Button = styled.button`
  margin: 0rem 2rem;
  background: #6ec5ff;
  white-space: nowrap;
  padding: 0.6rem 7rem;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: #fff;
    background-color: #002171;
  }
`;

export const BtnMenu = styled.button`
  margin: 0.7rem 1.2rem;
  background: #fbf3ed;
  white-space: nowrap;
  color: black;
  outline: none;
  border: none;
`;

export const Msg = styled.span`
  display: block;
  margin: 0 3.3rem;
  color: red;
  margin-top: 0;
  font-size: 0.8rem;
`;

function SignUpModal({ open, close, handleResponseSuccess }) {
  const [isSelect, setIsSelect] = useState("public");

  // input값, 에러메세지 초기화
  const reset = () => {
    setPublicInfo({
      nickname: "",
      email: "",
      password: "",
    });
    setDoctorInfo({
      email: "",
      name: "",
      password: "",
      hospital: "",
      license: "",
    });
    setErrorMessage({
      nickname: "",
      email: "",
      password: "",
      confirm: "",
      name: "",
      hospital: "",
      license: "",
    });
  };

  // 유효성검사에 띄워줄 메세지
  const [errorMessage, setErrorMessage] = useState({
    nickname: "",
    email: "",
    password: "",
    confirm: "",
    name: "",
    hospital: "",
    license: "",
  });

  // 일반회원 정보
  const [publicInfo, setPublicInfo] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  // 일반회원 onChange 함수
  const publicChange = (key) => (e) => {
    setPublicInfo({
      ...publicInfo,
      [key]: e.target.value,
    });
    const id = e.target.id;
    const value = e.target.value;
    if (valid[id](value)) {
      setErrorMessage((prev) => {
        prev[id] = "";
        return prev;
      });
    } else {
      setErrorMessage((prev) => {
        prev[id] = message[id];
        return prev;
      });
    }
  };

  // 의사회원 정보
  const [doctorInfo, setDoctorInfo] = useState({
    email: "",
    name: "",
    password: "",
    hospital: "",
    license: "",
  });

  // 의사회원 onChange 함수
  const doctorChange = (key) => (e) => {
    setDoctorInfo({
      ...doctorInfo,
      [key]: e.target.value,
    });
    const id = e.target.id;
    const value = e.target.value;
    if (id !== "hospital") {
      if (valid[id](value)) {
        setErrorMessage((prev) => {
          prev[id] = "";
          return prev;
        });
      } else {
        setErrorMessage((prev) => {
          prev[id] = message[id];
          return prev;
        });
      }
    }
  };

  // 일반, 의사 회원가입 폼양식 바꾸기
  const handleClick = (e) => {
    reset();
    setIsSelect(e.target.value);
  };

  // 일반회원가입
  const publicSignUp = () => {
    const { nickname, email, password } = publicInfo;
    if (nickname === "" || email === "" || password === "") {
      setErrorMessage({
        ...errorMessage,
        confirm: message.emptyMessage,
      });
      return;
    } else if (
      errorMessage.nickname ||
      errorMessage.password ||
      errorMessage.email
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.rightStyle,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/public/signup`, publicInfo, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("회원가입 완료");
          if (res.data.error === 2) {
            Swal.fire({
              icon: "warning",
              title: "Apang 회원가입",
              text: message.existEmail,
            });
          } else if (res.data.error === 3) {
            Swal.fire({
              icon: "warning",
              title: "Apang 회원가입",
              text: message.existNickname,
            });
          } else if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Apang 회원가입",
              text: message.signupSuccess,
            });
            delete publicInfo.nickname;
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/common/signin`,
                publicInfo,
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log("여기로 오지않음?");
                handleResponseSuccess(res.data.data.auth);
              });
            close();
          }
          // navigate("/");
        });
    }
  };

  const doctorSignUp = () => {
    const { email, name, password, hospital, license } = doctorInfo;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      hospital === "" ||
      license === ""
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.emptyMessage,
      });
      return;
    } else if (
      errorMessage.name ||
      errorMessage.password ||
      errorMessage.email ||
      errorMessage.hospital ||
      errorMessage.license
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.rightSignup,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/doctor/signup`, doctorInfo, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.status);
          if (res.data.error === 2) {
            Swal.fire({
              icon: "warning",
              title: "Apang 회원가입",
              text: message.existEmail,
            });
          } else if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Apang 회원가입",
              text: message.doctorSignupSuccess,
            });
            close();
          }
        });
    }
  };

  return open ? (
    <ModalBackGround
      onClick={() => {
        setIsSelect("public");
        reset();
        close();
      }}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <LoginHeader>
          회원가입
          <button
            onClick={() => {
              setIsSelect("public");
              reset();
              close();
            }}
          >
            &times;
          </button>
        </LoginHeader>
        <SelectHeader>
          <input
            type="radio"
            name="user"
            value="public"
            onChange={handleClick}
            defaultChecked={true}
          />
          <BtnMenu>일반</BtnMenu>
          <input
            type="radio"
            name="user"
            value="doctor"
            onClick={handleClick}
            defaultChecked={false}
          />
          <BtnMenu>의사</BtnMenu>
        </SelectHeader>
        {isSelect === "public" ? (
          <>
            <LoginBody>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="이메일"
                  onChange={publicChange("email")}
                  value={publicInfo.email}
                />
                <Msg>{errorMessage.email}</Msg>
              </div>

              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  onChange={publicChange("password")}
                  value={publicInfo.password}
                />
                <Msg>{errorMessage.password}</Msg>
              </div>

              <div>
                <input
                  id="nickname"
                  type="text"
                  placeholder="닉네임"
                  onChange={publicChange("nickname")}
                  value={publicInfo.nickname}
                />
                <Msg>{errorMessage.nickname}</Msg>
                <Msg>{errorMessage.confirm}</Msg>
              </div>
              <Button onClick={publicSignUp}>가입하기</Button>
            </LoginBody>
            <>
              <LoginFooter>
                <div className="line">소셜계정으로 간편하게 로그인하세요</div>
                <LoginFoot>
                  <SocialLogin href={KAKAO_AUTH_URL} onClick={close}>
                    <img src={kakao} alt="kakaologin" width="48rem"></img>
                  </SocialLogin>
                  <SocialLogin href={GOOGLE_AUTHORIZE_URL} onClick={close}>
                    <img src={google} alt="googlelogin" width="48rem"></img>
                  </SocialLogin>
                </LoginFoot>
              </LoginFooter>
            </>
          </>
        ) : (
          <LoginBody>
            <div>
              <input
                id="email"
                type="email"
                placeholder="이메일"
                onChange={doctorChange("email")}
              />
              <Msg>{errorMessage.email}</Msg>
            </div>

            <div>
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                onChange={doctorChange("password")}
              />
              <Msg>{errorMessage.password}</Msg>
            </div>

            <div>
              <input
                id="name"
                type="text"
                placeholder="이름"
                onChange={doctorChange("name")}
              />
              <Msg>{errorMessage.name}</Msg>
            </div>

            <div>
              <input
                id="license"
                type="number"
                placeholder="면허 번호"
                onChange={doctorChange("license")}
              />
              <Msg>{errorMessage.license}</Msg>
            </div>

            <div>
              <input
                id="hospital"
                type="text"
                placeholder="병원 이름"
                onChange={doctorChange("hospital")}
              />
              <Msg>{errorMessage.confirm}</Msg>
            </div>

            <Button onClick={doctorSignUp}>신청하기</Button>
          </LoginBody>
        )}
      </ModalBox>
    </ModalBackGround>
  ) : null;
}

export default SignUpModal;
