import React from "react";
import styled from "styled-components";
import { Container } from "../styles";
import question from "../images/question.png";
import QnaUserPost from "../components/QnaUserPost.js";
import QnaPost from "../components/QnaPost.js";

export const QnaContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 2rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.img`
  width: 23rem;
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

function QnaDetail({ isLogin, auth, userInfo }) {
  return (
    <>
      <QnaContainer>
        <ImgWrap>
          <Img src={question}></Img>
        </ImgWrap>
      </QnaContainer>

      <QnaUserPost isLogin={isLogin} />

      <QnaPost isLogin={isLogin} userInfo={userInfo} auth={auth} />
    </>
  );
}

export default QnaDetail;
