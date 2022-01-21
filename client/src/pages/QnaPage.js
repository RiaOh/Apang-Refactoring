import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../styles";
import { Link } from "react-router-dom";
import Doc from "../images/doc.png";
import QnaModal from "../components/modal/QnaModal.js";
import Swal from "sweetalert2";
import axios from "axios";
import { category } from "../modules/category";
import Qna from "../components/Qna.js";
import Pagination from "../components/Pagination.js";
import noData from "../images/no.png";
import Loading from "../components/Loading.js";

export const QnaContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 4rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const QnaListContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 0rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CategoryWrap = styled.div`
  @media ${({ theme }) => theme.device.ipad} {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const QnaTextContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const QnaWrap = styled.div`
  width: 100%;
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    margin-left: 0;
    margin-right: 0;
  }
`;
export const Img = styled.img`
  width: 36rem;
  @media ${({ theme }) => theme.device.ipad} {
    width: 70rem;
    max-width: 40rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 60rem;
    max-width: 20rem;
  }
`;
export const ImgWrap = styled.div`
  display: block;
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.main};
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 2.9rem;
    text-align: center;
    margin-bottom: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
    text-align: center;
    margin-left: 0.5rem;
    margin-bottom: 0.4rem;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.main};
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    text-align: center;
    margin-left: 1rem;
    margin-bottom: 0rem;
  }
`;

export const QnaTextWrap = styled.div`
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const Category = styled.button`
  background: ${({ theme }) => theme.color.white};
  cursor: pointer;
  border-radius: 10px;
  border: none;
  width: 7.9rem;
  height: 2rem;
  margin: 1.2rem;
  font-size: 0.9rem;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.color.button};
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  width: 5rem;
  height: 2rem;
  margin: 1rem;
  margin-left: 72rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  @media ${({ theme }) => theme.device.ipad} {
    width: 4rem;
    margin-left: 40rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 4rem;
    margin-left: 15rem;
  }
`;

export const Linked = styled(Link)`
  text-decoration: none;
`;

export const QnaBox = styled.div`
  border: 0.1rem solid #63b5f6;
  color: black;
  border-radius: 10px;
  max-width: 1300px;
  width: 100%;
  height: 10rem;
  margin-bottom: 2rem;
  :hover {
    box-shadow: #63b5f6 0.1rem 0.1rem 0.1rem 0.1rem;
    text-decoration: none;
  }
`;

export const ContentWrap = styled.div`
  margin: 1rem 1rem 1rem 1rem;
  .content-info-last {
    display: flex;
    justify-content: space-between;
  }
`;

export const Profile = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  .Id {
    margin-left: 0.5rem;
  }
`;

export const ContentTitle = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ContentText = styled.div`
  display: flex;
  height: 2.2rem;
  font-size: 0.8rem;
`;

export const Tag = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  .tag {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    width: auto;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.white};
    padding: 0 0.5rem;
    font-size: 0.5rem;
    list-style: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.color.button};
  }
`;

export const ContentComment = styled.div`
  display: flex;
  height: 2.2rem;
  font-size: 0.8rem;
  margin-right: 1rem;
`;

export const Nodata = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  margin-top: 0;
  padding: 0 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .Img {
    width: 65rem;
    @media ${({ theme }) => theme.device.mobile} {
      width: 23rem;
    }
  }
`;

function QnaPage({ isLogin, auth }) {
  const [QuestionOpen, setQuestionOpen] = useState(false);
  const [qnaInfo, setqnaInfo] = useState([]); //qna 전부 가져오는것
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;
  const [isLoading, setIsLoading] = useState(true);
  // console.log(parseInt(localStorage.getItem("auth")));
  //qna 전부 불러오기
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/qna/info`,
        { kakao_userid: localStorage.getItem("userid") },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("res.data.qnaInfo는모야?", res.data.qnaInfo);
        setqnaInfo(res.data.qnaInfo);
        setIsLoading(false);
      });
  }, []);

  const openQuestionModal = () => {
    console.log("질문하기 모달 오픈되었나요?");
    setQuestionOpen(!QuestionOpen);
  };

  const handleClick = () => {
    Swal.fire({
      icon: "error",
      title: "로그인이 필요해요",
      text: "회원이 아니시면 회원가입 해주세요",
    });
  };

  const handleDocClick = () => {
    Swal.fire({
      icon: "error",
      title: "의사선생님이신가요?",
      text: "선생님은 댓글만 작성하실 수 있어요",
    });
  };
  // 카테고리 필터하기
  const filterHandler = (e) => {
    const filter = e.target.value;
    // console.log(filter);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/qna/info`,
        { filter: filter },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log("filter : ", res.data.qnaInfo);
        setqnaInfo(res.data.qnaInfo);
      });
  };
  // console.log("큐엔에이페이지qnaInfo : ", qnaInfo);

  return (
    <>
      <QnaContainer>
        <ImgWrap>
          <Img src={Doc}></Img>
        </ImgWrap>
        <CategoryWrap>
          {category.map((category, i) => {
            return (
              <Category
                key={i}
                value={category}
                onClick={(e) => filterHandler(e)}
              >
                {category}
              </Category>
            );
          })}
        </CategoryWrap>
      </QnaContainer>

      <QnaTextContainer>
        <QnaTextWrap>
          <Title>궁금한 사항을 물어봐주세요</Title>
          <Text>담당 선생님들이 답변을 주실거에요</Text>
        </QnaTextWrap>
      </QnaTextContainer>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <QnaListContainer>
            {qnaInfo ? (
              <>
                <QnaWrap>
                  <QnaWrap>
                    {isLogin === false ? (
                      <Button onClick={handleClick}>질문하기</Button>
                    ) : auth === 1 ? (
                      <Button onClick={handleDocClick}>질문하기</Button>
                    ) : (
                      <Button onClick={openQuestionModal}>질문하기</Button>
                    )}
                  </QnaWrap>
                  {qnaInfo.slice(offset, offset + 5).map((qna, i) => {
                    return (
                      <Linked to={`/qna/detail/${qna.id}`} key={i}>
                        <Qna
                          // key={i}
                          title={qna.title}
                          content={qna.content}
                          nickname={
                            qna.user
                              ? qna.user.nickname
                              : qna.users_id.toString().length >= 6
                              ? "Kakao"
                              : "탈퇴한 유저"
                          }
                          profile_img={
                            qna.user
                              ? qna.user.profile_img
                              : qna.users_id.toString().length >= 6
                              ? "kakao.png"
                              : "publicprofile.jpeg"
                          }
                          tags={qna}
                          commentsCount={qna.comments.length}
                          auth={auth}
                          qnaId={qna.id}
                        />
                      </Linked>
                    );
                  })}
                </QnaWrap>
              </>
            ) : null}
          </QnaListContainer>

          {qnaInfo.length >= 1 ? (
            <Pagination length={qnaInfo.length} page={page} setPage={setPage} />
          ) : (
            <Nodata>
              <Nodata>
                <img className="Img" src={noData} alt="noData" />
              </Nodata>
            </Nodata>
          )}

          <QnaModal
            // forceUpdate={forceUpdate}
            open={QuestionOpen}
            close={openQuestionModal}
          />
        </>
      )}
    </>
  );
}

export default QnaPage;
