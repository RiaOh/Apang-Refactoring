import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../styles";
import axios from "axios";
import Swal from "sweetalert2";

export const QnaUserContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 0 1rem 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: #9bbbd4;
  width: 71.5rem;
  @media ${({ theme }) => theme.device.ipad} {
    width: 45.8rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 21.4rem;
  }
`;

export const QnaBox = styled.div`
  margin-top: 1rem;
  color: black;
  border-radius: 10px;
  background: #fef01b;
  margin-left: 30rem;
  @media ${({ theme }) => theme.device.ipad} {
    margin-left: 20rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 6rem;
  }
`;

export const ContentWrap = styled.div`
  margin: 1rem 1rem 1rem 1rem;
  .content-info-last {
    display: flex;
    justify-content: space-between;
  }
`;
export const ContentProfileWrap = styled.div`
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
  @media ${({ theme }) => theme.device.mobile} {
    // margin-left: 7rem;
  }
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
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 26rem;

  @media ${({ theme }) => theme.device.ipad} {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 12rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 12rem;
  }
`;

function QnaUserPost({ isLogin }) {
  let url = document.location.href;
  let qna_id = url.split("/");
  qna_id = qna_id[qna_id.length - 1];
  console.log(qna_id);

  const [qnaDetail, setqnaDetail] = useState("");

  useEffect(() => {
    if (!isLogin) {
      Swal.fire({
        icon: "info",
        text: "의료법상 가입한 회원들만 내용을 볼 수 있어요",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/qna/info`,
        { qna_id: qna_id, page: "qnaDetail" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("whatwhat?", res);
        setqnaDetail(res.data.qnaDetail);
      });
  }, []);

  // console.log(qnaDetail);

  return (
    <>
      {qnaDetail ? (
        <QnaUserContainer>
          <QnaBox>
            <ContentWrap>
              <Profile>
                <img
                  src={require(`../../public/uploads/${
                    qnaDetail.user ? qnaDetail.user.profile_img : "kakao.png"
                  }`)}
                  width="20rem"
                  alt="doctor"
                />
                <div className="Id">
                  {qnaDetail.user ? qnaDetail.user.nickname : "Kakao"}
                </div>
              </Profile>
              <ContentTitle>{qnaDetail.title}</ContentTitle>
              <ContentText>{qnaDetail.content}</ContentText>
            </ContentWrap>
          </QnaBox>
        </QnaUserContainer>
      ) : null}
    </>
  );
}

export default QnaUserPost;
