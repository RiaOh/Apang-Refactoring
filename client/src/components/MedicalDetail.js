import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Sample from "../images/sample.gif";
import Receipt from "../images/receipt.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaHospital } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiHospitalLine } from "react-icons/ri";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

const DivBox = styled.div`
  width: 27vw;
  height: 24vw;
  display: block;
  margin-right: auto;
  margin-left: auto;
  background-size: 70% 30vw;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60%;
  }
`;

const DetailLine = styled.div`
  border: 3px solid #63b5f6;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  & h1 {
    text-align: left;
    margin: 1vw 0 1vw 1vw;
    color: #37474f;
    font-size: 35px;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 2rem;
      margin: 5vw 0 4vw 1vw;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    border: none;
    border: 2px solid #63b5f6;
    margin-top: 10px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 20.7vw;
  background: #fff;
  objectfit: scale-down;
  margin-right: auto;
  margin-left: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const ImgHospital = styled.img`
  width: 100%;
  height: 20.7vw;
  objectfit: scale-down;
  background: #fff;
  margin-right: auto;
  margin-left: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Profile = styled.input``;

const ProfileEditing = styled.label`
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    color: #320b86;
  }
  width: 50%;
  text-align: center;
  float: left;
  font-size: 15px;
  margin-top: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
      color: #4d2c91;
    }
  }
`;

const SaveButton = styled.button`
  border: none;
  background: white;
  padding: 1px;
  color: black;
  cursor: pointer;
  width: 50%;
  font-size: 14px;
  &:hover {
    color: #320b86;
  }
  margin-top: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
      color: #4d2c91;
    }
  }
`;

const DivBox1 = styled.div`
  // border: 1px solid #63b5f6;
  width: 20%;
  height: 140px;
  float: left;
  margin: 0 10px 10px 25px;
  border-radius: 20px;
  background-size: 100% 148px;
  objectfit: scale-down;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    float: none;
    margin: 0 auto;
  }
`;

const Img2 = styled.img`
  width: 100%;
  border-radius: 20px;
  height: 152px;
  objectfit: scale-down;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const ImgReview = styled.img`
  width: 100%;
  border-radius: 20px;
  height: 152px;
  objectfit: scale-down;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const ProfileEditing2 = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  text-align: center;
  color: #37474f;
  font-weight: bold;
  &:hover {
    color: #4d2c91;
  }
  height: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    font-size: 13px;
  }
`;

const Box = styled.div`
  margin: 0 atuo;
`;

const SmallTitle = styled.h2`
  margin: 1.5vw 0.3vw 0.5vw 1vw;
  padding: 0.5vw;
  color: #37474f;
  float: left;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 7vw 1vw 5vw 1vw;
    padding: 1vw;
    text-align: left;
  }
`;

const Divtag = styled.div`
  margin: 1.8vw 0 1vw 1vw;
  padding: 0.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 9vw 0 5vw 1vw;
    margin-bottom: 3vw;
    text-align: left;
  }
`;

const SmallTitle2 = styled.h2`
  margin: 1vw 0.3vw 0.5vw 1vw;
  padding: 0.5vw;
  color: #37474f;
  float: left;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 1vw 1vw 5vw 1vw;
    padding: 1vw;
    text-align: left;
  }
`;

const Divtag2 = styled.div`
  margin: 1.4vw 0 1vw 1vw;
  padding: 0.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 3vw 0 5vw 1.5vw;
    margin-bottom: 3vw;
    text-align: left;
  }
`;

const Review = styled.h2`
  margin: 2vw 3vw 1vw 3vw;
  color: #37474f;
  text-align: center;
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 25px;
  }
`;

const ReviewLine = styled.div`
  border: 1px solid #37474f;
  width: 27%;
  margin-left: auto;
  margin-right: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
  }
`;

const Button = styled.button`
  // margin: 1.5vw 1vw 1.5vw 1vw;
  border: 1px solid #63b5f6;
  border-radius: 5px;
  background-color: #63b5f6;
  color: #fff;
  padding: 3px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  display: block;
  &:hover {
    background-color: #002171;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 20%;
    float: none;
    font-size: 0.8rem;
    margin-bottom: 5vw;
  }
`;

const ReviewContainer = styled.div`
  padding: 1rem;
  background: #e3f2fd;
  border-radius: 20px;
  width: 98%;
  margin: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 1vw;
    widht: 95%;
  }
`;

const ReviewContainer2 = styled.div`
  padding: 1rem;
  width: 100%;
  margin: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 1vw;
  }
`;

const ReviewNik = styled.input`
  border: none;
  background: #fff;
  color: #095cd8;
  display: block;
  width: 20%;
  height: 2rem;
  margin-bottom: 5px;
  border-radius: 7px;
  left: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 6vw 0 5vw 1vw;
    width: 80%;
    background: none;
    font-size: 13px;
  }
`;

const ReviewTextarea = styled.textarea`
  width: 70%;
  height: 5rem;
  border: 1px solid #63b5f6;
  resize: none;
  border-radius: 5px;
  padding: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 95%;
    height: 5rem;
  }
`;

const Clear = styled.div`
  clear: both;
`;

const MedicalDetail = ({ medicalInfo, userInfo, isLogin, auth }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]); //해당 병원 review 가져오기
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review/info`,
        { hospital_name: medicalInfo.place_name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("whatwhat?", res);
        setReviews(res.data.reviewInfo);
      });
  }, [medicalInfo]);

  const [medicalPhoto, setMedicalPhoto] = useState({
    hospital_img: "",
  });
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/hospital/info`,
        { hospital_name: medicalInfo.place_name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === 400) {
          setMedicalPhoto({ hospital_img: "" });
        } else {
          setMedicalPhoto({ hospital_img: res.data.hospital_img });
        }
      });
  }, [medicalInfo]);

  const [reviewInfo, setreviewInfo] = useState({
    content: "",
  });

  const reviewChange = (key) => (e) => {
    setreviewInfo({
      ...reviewInfo,
      [key]: e.target.value,
    });
  };

  const handleClick = () => {
    Swal.fire({
      icon: "error",
      title: "로그인이 필요해요",
      text: "회원이 아니시면 회원가입 해주세요",
    });
    setImgInfo({
      file: [],
      filepreview: null,
    });
    setreviewInfo({
      content: "",
    });
  };

  const handleDocClick = () => {
    Swal.fire({
      icon: "error",
      title: "의사선생님 또는 관리자인가요?",
      text: "일반 이용자만 리뷰를 작성하실 수 있어요",
    });
    setImgInfo({
      file: [],
      filepreview: null,
    });
    setreviewInfo({
      content: "",
    });
  };

  const submit = () => {
    const formdata = new FormData();
    formdata.append("content", reviewInfo.content);
    formdata.append("kakao_userid", localStorage.getItem("userid"));
    // formdata.append("users_id", userInfo.id);
    formdata.append("receipts_img", imgInfo.file);
    formdata.append("hospital_name", medicalInfo.place_name);
    axios
      .post(`${process.env.REACT_APP_API_URL}/review/upload`, formdata, {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 400) {
          Swal.fire({
            icon: "error",
            text: "영수증 사진, 리뷰내용 모두 올려주세요!",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "리뷰가 성공적으로 등록되었습니다",
          });
        }
      })
      .then(() => {
        setImgInfo({
          file: [],
          filepreview: null,
        });
        setreviewInfo({
          content: "",
        });
      });
  };

  //<-- 병원 이미지 저장 시작 -->
  const [fileImage, setFileImage] = useState({
    file: [],
    filepreview: null,
  });

  const saveFileImage = (e) => {
    setFileImage({
      ...fileImage,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  //<--다시 봐야할것 -->
  const uploadhospital = () => {
    const formdata = new FormData();
    formdata.append("hospital_name", medicalInfo.place_name);
    formdata.append("hospital_img", fileImage.file);
    axios
      .post(`${process.env.REACT_APP_API_URL}/hospital/upload`, formdata, {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "병원사진이 성공적으로 등록되었습니다",
        });
      });
    setFileImage({
      file: [],
      filepreview: null,
    });
    // .then(() => {
    //   setReload(!reload);
    // });
  };

  const noPhotoSave = () => {
    Swal.fire({
      icon: "error",
      title: "병원 관계자인가요?",
      text: "병원 관계자만 사진을 저장하실 수 있어요",
    });
    setFileImage({
      file: [],
      filepreview: null,
    });
  };

  //<-- 병원 이미지 저장 끝 -->

  //<-- 영수증 저장 시작 -->
  const [imgInfo, setImgInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleImgChange = (e) => {
    setImgInfo({
      ...imgInfo,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };
  //<-- 영수증 저장 끝 -->

  const handleReviewDelete = (reviewid) => {
    axios
      .delete("https://localhost:80/review", {
        data: {
          review_id: reviewid,
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
        navigate("/medicallist");
      });
  };

  return (
    <>
      <DetailLine>
        <h1>
          <RiHospitalLine style={{ verticalAlign: "top" }} />{" "}
          {medicalInfo.place_name}
        </h1>
        {/* 사진업로드 시작 */}
        {/* 수정하는것 시작 */}
        {medicalPhoto.hospital_img !== "" ? (
          <>
            <DivBox>
              <Box onChange={saveFileImage}>
                <ImgHospital
                  src={require(`../../public/hospitals/${medicalPhoto.hospital_img}`)}
                  alt="uploadimage"
                />
              </Box>
              <Profile
                type="file"
                id="upload-hospital"
                style={{
                  display: "none",
                }}
                onChange={saveFileImage}
              />
            </DivBox>
          </>
        ) : (
          <>
            <DivBox>
              <Box onChange={saveFileImage}>
                {fileImage.filepreview !== null ? (
                  <Img src={fileImage.filepreview} alt="uploadimage" />
                ) : (
                  <ImgHospital src={Sample} alt="uploadimage" />
                )}
              </Box>
              <Profile
                type="file"
                id="upload-hospital"
                style={{
                  display: "none",
                }}
                onChange={saveFileImage}
              />
              <ProfileEditing
                htmlFor="upload-hospital"
                onChange={saveFileImage}
              >
                <AiTwotoneFolderOpen
                  style={{ verticalAlign: "top", fontSize: "17px" }}
                />{" "}
                병원사진
              </ProfileEditing>

              {isLogin === false ? (
                <SaveButton onClick={handleClick}>
                  <FaSave style={{ verticalAlign: "top", fontSize: "15px" }} />{" "}
                  저장
                </SaveButton> //로그인 후 사진을 저장하실 수 있습니다.
              ) : auth === 1 && medicalInfo.place_name === userInfo.hospital ? (
                <SaveButton onClick={uploadhospital}>
                  <FaSave style={{ verticalAlign: "top", fontSize: "15px" }} />{" "}
                  저장
                </SaveButton>
              ) : (
                <SaveButton onClick={noPhotoSave}>
                  <FaSave style={{ verticalAlign: "top", fontSize: "15px" }} />{" "}
                  저장
                </SaveButton> //병원 관계자만 사진저장 가능합니다.
              )}
            </DivBox>
            <Clear />
          </>
        )}

        {/* 사진업로드 끝 */}
        {/* 수정하는것 끝 */}

        {/* 리스트 */}

        <SmallTitle>
          <FaHospital style={{ verticalAlign: "top" }} /> 병원주소:
        </SmallTitle>
        <Divtag>{medicalInfo.address_name} </Divtag>
        <Clear />
        <SmallTitle2>
          <BsFillTelephoneFill style={{ verticalAlign: "top" }} /> 전화:
        </SmallTitle2>
        <Divtag2>{medicalInfo.phone} </Divtag2>
        <Clear />
        {/* 리스트 끝 */}
        <div
          style={{
            border: "1px solid #63b5f6",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>

        {/* 리뷰작성 시작 */}

        <>
          <Review>
            Reviews <MdOutlineRateReview />
            <ReviewLine />
          </Review>

          <ReviewContainer2>
            <DivBox1>
              <Profile
                type="file"
                id="upload-file"
                style={{
                  display: "none",
                }}
                onChange={handleImgChange}
              />

              <Box onChange={handleImgChange}>
                {imgInfo.filepreview !== null ? (
                  <Img2 src={imgInfo.filepreview} alt="uploadimage" />
                ) : (
                  <ImgReview src={Receipt} alt="publicimage" />
                )}
              </Box>

              <ProfileEditing2 htmlFor="upload-file" onChange={handleImgChange}>
                <AiTwotoneFolderOpen
                  style={{ verticalAlign: "top", fontSize: "17px" }}
                />{" "}
                영수증 업로드
              </ProfileEditing2>
            </DivBox1>

            <ReviewNik
              type="text"
              disabled

              // value={userInfo.nickname}
            />

            <ReviewNik
              placeholder="병원명"
              type="text"
              disabled
              value={medicalInfo.place_name}
            />

            <ReviewTextarea
              onChange={reviewChange("content")}
              placeholder="'내용' 입력 후 '리뷰' 버튼을 눌러주세요."
              value={reviewInfo.content}
            />

            {isLogin === false ? (
              <Button onClick={handleClick}>리뷰</Button>
            ) : auth === 1 || auth === 0 ? (
              <Button onClick={handleDocClick}>리뷰</Button>
            ) : (
              <Button onClick={submit}>리뷰</Button>
            )}
            <Clear />
          </ReviewContainer2>

          <br></br>
          {/* 리뷰작성 끝 */}
          {reviews.map((review, i) => {
            return (
              <ReviewContainer key={i}>
                <DivBox1>
                  <Box>
                    <ImgReview
                      src={require(`../../public/receipts/${review.receipts_img}`)}
                      alt="uploadimg"
                    />
                  </Box>
                </DivBox1>
                <ReviewNik
                  disabled
                  placeholder="닉네임"
                  type="text"
                  value={
                    review.user
                      ? review.user.nickname
                      : review.users_id.toString().length >= 6
                      ? "Kakao"
                      : "탈퇴한 유저"
                  }
                  style={{ background: "#e3f2fd", border: "none" }}
                />

                <ReviewNik
                  disabled
                  value={medicalInfo.place_name}
                  style={{ background: "#e3f2fd", border: "none" }}
                />
                <ReviewTextarea value={review.content} />

                {auth === 0 ? (
                  <Button style={{ padding: "3px", fontSize: "15px" }}>
                    {" "}
                    <BsTrash onClick={() => handleReviewDelete(review.id)} />
                  </Button>
                ) : (
                  ""
                )}
              </ReviewContainer>
            );
          })}
        </>

        {/* 리뷰 끝 */}
      </DetailLine>
    </>
  );
};

export default MedicalDetail;
