import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../styles";
import Swal from "sweetalert2";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { message } from "../modules/message";
import { valid } from "../modules/validator";

export const DocContainer = styled(Container)`
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

const DocContainerLine = styled.div`
  border: 1px solid #b5afaf;
  padding: 2rem;
  height: 220px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 15px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 30rem;
  }
`;

const Profilecontainer = styled.div`
  float: left;
  width: 40%;
  text-align: center;
  height: 80%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 40%;
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

const DocLine = styled.div`
  width: 60%;
  float: right;
  height: 13vw;
  @media ${({ theme }) => theme.device.mobile} {
    float: none;
    width: 100%;
    height: 30%;
  }
`;

const DocTitle = styled.div`
  float: left;
  padding: 1rem;
  font-weight: bold;
  width: 30%;
  height: 23%;
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
    width: 100%;
    font-size: 15px;
    padding: 1px;
  }
`;

const DocInput = styled.input`
  float: left;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 30px;
  width: 50%;
  margin-bottom: 10px;
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
  margin-right: auto;
  margin-left: auto;
  width: 7vw;
  clear: both;

  @media ${({ theme }) => theme.device.ipad} {
    width: 15%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 10rem;
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

// 대답 시작

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
  width: 21%;
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

const UserTitle = styled.div`
  margin: 0.5vw 1vw 1vw 0.5vw;
  border-bottom: 1px solid #b5afaf;
  padding: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0vw 1.5vw 1.5vw 1.5vw;
  }
`;

const TitleHeader = styled.h4`
  margin: 1vw 0 0.5vw 0.5vw;
  color: #007ac1;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 2vw 1.5vw 1.5vw 2vw;
  }
`;

// 대답 끝

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

function DocMypage(props) {
  const navigate = useNavigate();
  const [imgInfo, setImgInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    hospital: "",
    password: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    newPassword: "",
    passwordConfirm: "",
  });

  const [myCommentInfo, setmyCommentInfo] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/info`,
        { page: "doctormypage" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setmyCommentInfo(res.data.myCommentInfo);
      });
  }, []);

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

  const submit = () => {
    if (!imgInfo.filepreview) {
      delete userInfo.password;
      delete userInfo.newPassword;
      delete userInfo.passwordConfirm;
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/doctor/profile`,
          { onlyName: userInfo },

          {
            withCredentials: true,
          }
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
          });
        });
    } else {
      const formdata = new FormData();
      formdata.append("apang", imgInfo.file);
      formdata.append("name", userInfo.name);
      formdata.append("hospital", userInfo.hospital);
      axios
        .post(`${process.env.REACT_APP_API_URL}/doctor/profile`, formdata, {
          headers: { "Content-type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
            showConfirmButton: false,
            timer: 1000,
          });
        });
    }
    window.location.reload();
  };

  // 비밀번호 변경
  const passwordChange = () => {
    delete userInfo.name;
    delete userInfo.hospital;
    // console.log(userInfo);
    axios
      .post(`${process.env.REACT_APP_API_URL}/doctor/profile`, userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.errorPassword,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Apang 정보수정",
            text: message.changeSuccess,
            showConfirmButton: false,
            timer: 1000,
          });
          props.handleLogout();
        }
      });
  };

  // 회원탈퇴
  const deleteHandler = () => {
    Swal.fire({
      icon: "info",
      title: "모든 정보가 삭제됩니다",
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
          .then((res) => {
            props.handleLogout();
            navigate("/");
          });
      }
    });
  };

  //내가 적은 댓글 삭제
  const handleCommentDelete = (commentid) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments`, {
        data: {
          comment_id: commentid,
        },
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "댓글이 성공적으로 삭제되었습니다",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .then(() => {
        navigate("/");
        navigate(`/mypage/doctorprofile`);
      });
  };

  return (
    <>
      {props.userInfo ? (
        <DocContainer>
          {/* 회원정보 시작 */}
          <Title>회원정보</Title>
          <DocContainerLine>
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
                    src={require(`../../public/uploads/${props.userInfo.profile_img}`)}
                    alt="publicimage"
                  />
                )}
              </Box>
              <ProfileEditing htmlFor="upload_file">편집</ProfileEditing>
              {/* <input
              type="file"
              id="upload_file"
              onChange={handleImgChange}
            ></input> */}
            </Profilecontainer>
            <DocLine>
              <DocTitle>이메일</DocTitle>
              <DocInput
                type="text"
                name="val"
                value={props.userInfo.email}
                disabled
              />

              <DocTitle>이름</DocTitle>
              <DocInput
                type="text"
                placeholder="이름"
                maxLength="5"
                defaultValue={props.userInfo.name}
                onChange={handleInputChange("name")}
              />
              <DocTitle>병원명</DocTitle>
              <DocInput
                type="text"
                placeholder="병원명"
                defaultValue={props.userInfo.hospital}
                onChange={handleInputChange("hospital")}
              />
            </DocLine>
          </DocContainerLine>
          <Edting onClick={submit}>저장하기</Edting>

          {/* 회원정보 끝 */}
          <br />

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

            <PassWordTitle>비밀번호 확인</PassWordTitle>
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

          <hr />
          {/* MY Answer 시작*/}
          <MyreviewTitle>MY Answer</MyreviewTitle>
          {myCommentInfo.map((comment) => {
            return (
              <MyreviewContainer key={comment.id}>
                <MyreviewLine>
                  {/* <MyreviewNickname>{qna.user.nickname}</MyreviewNickname> */}
                  <MyreviewTrash>
                    <BsTrash onClick={() => handleCommentDelete(comment.id)} />
                  </MyreviewTrash>

                  <TitleHeader>Q&A 질문</TitleHeader>
                  <Clear />
                  <UserTitle>
                    {comment.qna ? comment.qna.title : "삭제된질문"}
                  </UserTitle>
                  <TitleHeader>Answer</TitleHeader>
                  <MyreviewContent>{comment.content}</MyreviewContent>
                </MyreviewLine>
              </MyreviewContainer>
            );
          })}
          {/* MY Answer 끝*/}
          <Clear />
        </DocContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default DocMypage;
