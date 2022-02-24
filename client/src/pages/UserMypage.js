import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../styles";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { message } from "../modules/message";
import { valid } from "../modules/validator";

export const UserContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  padding: 4rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// 회원정보 시작

const Title = styled.h1`
  width: 100%;
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
    padding: 1vw;
    margin-bottom: 2vw;
  }
`;

const UserContainerLine = styled.div`
  border: 1px solid #b5afaf;
  padding: 2rem;
  height: 190px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 15px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 25rem;
  }
`;

const Profilecontainer = styled.div`
  float: left;
  width: 40%;
  text-align: center;
  height: 80%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 50%;
  }
`;

const Profile = styled.input``;

const ProfileEditing = styled.label`
  border: 1px solid #63b5f6;
  background-color: #63b5f6;
  padding: 0.5vw;
  color: #fff;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: #002171;
  }
  display: block;
  width: 6vw;
  margin: auto;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 8rem;
    font-size: 13px;
  }
`;

const UserTitle = styled.div`
  float: left;
  padding: 1rem;
  font-weight: bold;
  width: 20%;
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
    width: 100%;
    font-size: 15px;
    padding: 1px;
  }
`;

const UserInput = styled.input`
  float: left;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 30px;
  width: 30%;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Edting = styled.button`
  border: 1px solid #63b5f6;
  background-color: #63b5f6;
  border-radius: 30px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #002171;
  }
  display: block;
  margin: auto;
  width: 7vw;

  @media ${({ theme }) => theme.device.ipad} {
    width: 10%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 60%;
    font-size: 12px;
  }
`;

// 회원정보 끝

// 비밀번호 시작

const PasswordLine = styled.div`
  border: 1px solid #b5afaf;
  padding: 1rem;
  height: 240px;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 18.5rem;
    width: 100%;
  }
`;

const PassWordTitle = styled.span`
  width: 45%;
  padding: 20px;
  float: left;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
    width: 100%;
    padding: 1px;
  }
`;

const PassWordInput = styled.input`
  width: 30%;
  height: 10px;
  margin: 10px;
  float: left;
  border: 1px solid black;
  border-radius: 30px;
  padding: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Box = styled.div`
  text-align: center;
`;

const EditPasswordDeleted = styled.button`
  width: 20%;
  border: 1px solid #63b5f6;
  background-color: #63b5f6;
  border-radius: 30px;
  color: #fff;
  padding: 10px;
  margin: 20px;
  cursor: pointer;
  &:hover {
    background-color: #002171;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
    width: 50%;
    margin: 10px;
  }
`;

// 비밀번호 끝

// 마이리뷰 qna 시작

const MyreviewTitle = styled.h2`
  color: #095cd8;
  margin: 20px 10px 20px 0px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
  }
`;

const MyreviewContainer = styled.div`
  margin: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin: 0;
  }
`;

const MyreviewLine = styled.div`
  border: 1px solid #63b5f6;
  border-radius: 10px;
  width: 20%;
  height: 50%;
  margin: 1vw;
  float: left;
  background-color: #e3f2fd;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    float: none;
    margin-bottom: 3vw;
  }
`;

const MyreviewTrash = styled.button`
  text-align: right;
  float: right;
  margin: 0.5vw;
  cursor: pointer;
  border: none;
  background-color: #e3f2fd;
  &:hover {
    background-color: #fff;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin: 3vw;
  }
`;

const MyreviewContent = styled.div`
  margin: 0.5vw 1vw 1vw 0.5vw;
  border-bottom: 1px solid #b5afaf;
  width: 90%;
  padding: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0 1.5vw 1.5vw 1.5vw;
  }
`;

const TitleHeader = styled.h4`
  margin: 1vw 0 0.5vw 0.5vw;
  color: #007ac1;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 2vw 1.5vw 1.5vw 2vw;
  }
`;

// 마이리뷰, qna 끝

// 유효성 시작

const Clear = styled.div`
  clear: both;
`;

const Prosecutor = styled.div`
  font-size: 10px;
  color: #e91e63;
  width: 90%;
  margin-left: 100px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0vw;
    margin-bottom: 1rem;
    width: 100%;
  }
`;

// 유효성 끝

function UserMypage(props) {
  const navigate = useNavigate();
  const [myQnaInfo, setmyQnaInfo] = useState([]);
  const [myReviewInfo, setmyReviewInfo] = useState([]);

  //나의 qna 전부 불러오기
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/qna/info`,
        { kakao_userid: localStorage.getItem("userid"), page: "usermypage" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("myqnainfo?", res.data.myQnaInfo);
        setmyQnaInfo(res.data.myQnaInfo);
      });
  }, []);

  //나의 review 전부 불러오기
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review/info`,
        { kakao_userid: localStorage.getItem("userid"), page: "usermypage" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setmyReviewInfo(res.data.myReviewInfo);
      });
  }, []);

  console.log(props.userInfo);
  console.log(myQnaInfo);
  const [imgInfo, setImgInfo] = useState({
    // 사진수정
    file: [],
    filepreview: null,
  });

  const [userInfo, setUserInfo] = useState({
    //개인정보수정
    nickname: "",
    password: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    newPassword: "",
    passwordConfirm: "",
  });
  const handleImgChange = (e) => {
    setImgInfo({
      ...imgInfo,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleInputChange = (key) => (e) => {
    setUserInfo({
      ...userInfo,
      [key]: e.target.value,
    });
    const id = e.target.id;
    const value = e.target.value;
    if (id === "passwordConfirm") {
      if (userInfo.newPassword === e.target.value) {
        setErrorMessage({ ...errorMessage, passwordConfirm: "" });
      } else {
        setErrorMessage({
          ...errorMessage,
          passwordConfirm: message.passwordConfirm,
        });
      }
      return;
    }
    if (id === "passwordConfirm" || id === "newPassword") {
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

  // 수정
  const submit = () => {
    if (!imgInfo.filepreview) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/public/profile`,
          { onlyNickname: userInfo.nickname },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          console.log("ria");
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
          });
        });
    } else {
      const formdata = new FormData();
      formdata.append("apang", imgInfo.file);
      // console.log(formdata);
      formdata.append("nickname", userInfo.nickname);
      formdata.append("token", localStorage.getItem("accessToken"));
      axios
        .post(`${process.env.REACT_APP_API_URL}/public/profile`, formdata, {
          headers: { "Content-type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
          });
          // navigate("/");
          // navigate("/mypage/doctorprofile");
        });
    }
    window.location.reload(); //근데 페이지가 새로고침되어지면 안됌 원래는. 이거 있으면 alert가 안된다.
  };
  // 비밀번호 변경
  const passwordChange = () => {
    delete userInfo.nickname;
    // console.log("비밀번호 변경 : ", userInfo);
    axios
      .post(`${process.env.REACT_APP_API_URL}/public/profile`, userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Apang 정보수정",
            text: message.errorPassword,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
          });
          props.handleLogout();
        }
      });
  };

  // 회원탈퇴
  const deleteHandler = () => {
    Swal.fire({
      icon: "info",
      title: "모든 정보가 삭제될 수 있습니다",
      text: "정말로 탈퇴하실건가요?",
      showCancelButton: true,
      confirmButtonColor: "#63b5f6",
      cancelButtonColor: "#dd3333",
      confirmButtonText: "네, 탈퇴하겠습니다",
      cancelButtonText: "다시 생각해볼게요",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/common/users`, {
            withCredentials: true,
          })
          .then(() => {
            props.handleLogout();
            navigate("/");
          });
      }
    });
  };

  //내가 쓴 qna 삭제코드
  const handleQnaDelete = (qnaid) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/qna`, {
        data: {
          qna_id: qnaid,
          kakao_userid: localStorage.getItem("userid"),
        },
        withCredentials: true,
      })
      .then(() => {
        axios.delete(`${process.env.REACT_APP_API_URL}/comments`, {
          data: {
            qna_id: qnaid,
          },
          withCredentials: true,
        });
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "질문이 성공적으로 삭제되었습니다",
        });
      })
      .then(() => {
        navigate("/");
        navigate(`/mypage/publicprofile`);
      });
  };

  //내가쓴 review 삭제코드
  const handleReviewDelete = (reviewid) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/review`, {
        data: {
          review_id: reviewid,
          kakao_userid: localStorage.getItem("userid"),
        },
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "리뷰가 성공적으로 삭제되었습니다",
        });
      })
      .then(() => {
        navigate("/");
        navigate(`/mypage/publicprofile`);
      });
  };
  const kakao = "kakao.png";

  return (
    <>
      {props.userInfo && myQnaInfo ? (
        <UserContainer>
          {/* 회원정보 시작 */}
          <Title>회원정보</Title>
          {props.userInfo.auth ? (
            <>
              <UserContainerLine>
                <Profilecontainer>
                  <Profile
                    type="file"
                    id="upload_file"
                    style={{
                      display: "none",
                    }}
                    onChange={handleImgChange}
                  />

                  <Box onChange={handleImgChange}>
                    {imgInfo.filepreview !== null ? (
                      <img
                        src={imgInfo.filepreview}
                        alt="uploadimage"
                        style={{
                          width: "100px",
                          height: "90px",
                          objectFit: "scale-down",
                        }}
                      />
                    ) : (
                      <img
                        style={{
                          width: "100px",
                          height: "90px",
                          objectFit: "scale-down",
                        }}
                        src={require(`../../../server/images/uploads/${props.userInfo.profile_img}`)}
                        alt="publicimage"
                      />
                    )}
                  </Box>
                  <ProfileEditing htmlFor="upload_file">편집</ProfileEditing>
                </Profilecontainer>

                <UserTitle>이메일</UserTitle>
                <UserInput
                  type="text"
                  value={props.userInfo.email}
                  name="val"
                  disabled
                />
                <UserTitle>닉네임</UserTitle>
                <UserInput
                  id="닉네임"
                  type="text"
                  defaultValue={props.userInfo.nickname}
                  onChange={handleInputChange("nickname")}
                  maxLength="18"
                />
              </UserContainerLine>
              <Edting onClick={submit}>저장하기</Edting>

              {/* 회원정보 끝 */}
              <br />
              {/* 비밀번호 시작 */}

              <PasswordLine>
                <PassWordTitle>기존비밀번호</PassWordTitle>
                <PassWordInput
                  placeholder="기존"
                  type="password"
                  onChange={handleInputChange("password")}
                ></PassWordInput>
                <PassWordTitle>새로운 비밀번호</PassWordTitle>
                <PassWordInput
                  id="newPassword"
                  placeholder="New"
                  type="password"
                  onChange={handleInputChange("newPassword")}
                ></PassWordInput>
                <Clear />
                <Prosecutor>{errorMessage.newPassword}</Prosecutor>

                <PassWordTitle>비밀번호 확인 </PassWordTitle>
                <PassWordInput
                  id="passwordConfirm"
                  placeholder="New 한번 더"
                  type="password"
                  onChange={handleInputChange("passwordConfirm")}
                ></PassWordInput>
                <Clear />
                <Prosecutor>{errorMessage.passwordConfirm}</Prosecutor>
              </PasswordLine>
              <Box>
                <EditPasswordDeleted onClick={passwordChange}>
                  비밀번호 변경
                </EditPasswordDeleted>
                <EditPasswordDeleted onClick={deleteHandler}>
                  회원탈퇴
                </EditPasswordDeleted>
              </Box>
              {/* 비밀번호 끝 */}
            </>
          ) : (
            //<-- 내가쓴것 시작 --> 카카오 로그인 시
            <UserContainerLine>
              <Profilecontainer>
                <Box>
                  <img
                    style={{
                      width: "100px",
                      height: "90px",
                      objectFit: "scale-down",
                    }}
                    src={require(`../../public/uploads/${kakao}`)}
                    alt="publicimage"
                  />
                </Box>
              </Profilecontainer>

              <UserTitle>이메일</UserTitle>
              <UserInput
                type="text"
                value={props.userInfo.email}
                name="val"
                disabled
              />
              <UserTitle>닉네임</UserTitle>
              <UserInput
                id="닉네임"
                type="text"
                defaultValue={props.userInfo.nickname}
                disabled
              />
            </UserContainerLine>
            //<-- 내가쓴것 끝 -->
          )}
          <hr />
          {/* MY Review 시작*/}
          <MyreviewTitle>My Review</MyreviewTitle>
          {myReviewInfo.map((review) => {
            return (
              <MyreviewContainer key={review.id}>
                <MyreviewLine>
                  <MyreviewTrash>
                    <BsTrash onClick={() => handleReviewDelete(review.id)} />
                  </MyreviewTrash>
                  <TitleHeader>병원명</TitleHeader>
                  <Clear />
                  <MyreviewContent>{review.hospital_name}</MyreviewContent>
                  <TitleHeader>Review</TitleHeader>
                  <MyreviewContent>{review.content}</MyreviewContent>
                </MyreviewLine>
              </MyreviewContainer>
            );
          })}
          {/* MY Review 끝*/}

          {/* MY Review 끝*/}
          <Clear />
          <br></br>
          <hr />

          {/*MY Q&A 시작  */}

          <MyreviewTitle>My Q&A</MyreviewTitle>
          {myQnaInfo.map((qna) => {
            return (
              <MyreviewContainer key={qna.id}>
                <MyreviewLine>
                  {/* <MyreviewNickname>{qna.user.nickname}</MyreviewNickname> */}
                  <MyreviewTrash>
                    <BsTrash onClick={() => handleQnaDelete(qna.id)} />
                  </MyreviewTrash>
                  <TitleHeader>진료과목</TitleHeader>
                  <Clear />
                  <MyreviewContent>{qna.category}</MyreviewContent>
                  <TitleHeader>Q&A</TitleHeader>
                  <MyreviewContent>{qna.title}</MyreviewContent>
                </MyreviewLine>
              </MyreviewContainer>
            );
          })}
          {/*MY Q&A 끝  */}
          <Clear />
        </UserContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default UserMypage;
