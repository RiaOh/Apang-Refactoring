import React from "react";
import styled from "styled-components";
import { Container } from "../styles";
import Hospital from "../images/hospital.png";
import Qna from "../images/qna.png";
import Review from "../images/review.png";
import Find from "../images/searchdoc.png";
import Doc from "../images/doc.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiClick } from "react-icons/gi";

export const MainContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  height: 55rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    text-align: center;
    margin-top: 20%;
    height: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    text-align: center;
    margin-top: 30%;
    height: 100%;
  }
`;

export const MainWrap = styled.div`
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const ImgWrap = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-size: 4.3rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.device.ipad} {
    font-size: 2.9rem;
    text-align: center;
    margin-bottom: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
    text-align: center;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
  text-align: center;

  @media ${({ theme }) => theme.device.ipad} {
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 1.3rem;
    margin-left: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    text-align: center;
    margin-left: 1.8rem;
    margin-bottom: 1.3rem;
  }
`;

export const Img = styled.img`
  width: 56rem;
  @media ${({ theme }) => theme.device.ipad} {
    width: 70rem;
    max-width: 40rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 0.7rem;
    width: 60rem;
    max-width: 20rem;
  }
`;

export const Search = styled.div`
  & form {
    position: relative;
    text-align: center;
    width: 21rem;
    margin: 0 auto;
    margin-top: 3rem;
    margin-left: 0;
    @media ${({ theme }) => theme.device.ipad} {
      width: 25rem;
      margin: 1rem auto;
    }
    @media ${({ theme }) => theme.device.mobile} {
      width: 15rem;
      margin: 1rem auto;
    }
    margin-top: 2rem;
    & input {
      outline: none;
      border: none;
      width: 24rem;
      height: 3.5rem;
      font-size: 1.5rem;
      padding-left: 0.5rem;
      border: 0.2rem solid #63b5f6;
      border-radius: 10px;
      @media ${({ theme }) => theme.device.ipad} {
        margin: 1rem auto;
      }
      @media ${({ theme }) => theme.device.mobile} {
        margin: 1rem auto;
      }
    }
    & button {
      background: #6ec5ff;
      padding: 0.7rem 2.5rem;
      color: white;
      outline: none;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      font-size: 1.5rem;
      text-decoration: none;
      &:hover {
        background: #fff;
        background-color: #002171;
      }
      @media ${({ theme }) => theme.device.ipad} {
      }
      @media ${({ theme }) => theme.device.mobile} {
        font-size: 0.8rem;
        padding: 0.4rem 1.7rem;
      }
    }
    & img {
      width: 2rem;
      @media ${({ theme }) => theme.device.ipad} {
        width: 2.3rem;
      }
      @media ${({ theme }) => theme.device.mobile} {
        width: 2rem;
      }
    }
  }
`;

export const MainWrapQna = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    margin-left: 1.5rem;
    margin-bottom: 5rem;
  }
`;

export const ContentWrapReview = styled.div`
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const ContentWrapQna = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const ContentWrapFind = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const BoxWrapReview = styled.div`
  text-align: center;
  margin-bottom: 3.9rem;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const BoxWrapQna = styled.div`
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const BoxWrapFind = styled.div`
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
  }
`;

export const ContentTitle = styled.p`
  font-size: 2rem;
  margin-bottom: 0.7rem;
  font-weight: 500;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const ContentText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  font-weight: 400;
  border: 0.2rem solid white;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 1.3rem;
  }
`;

export const ImgThree = styled.img`
  width: 26rem;
  margin-bottom: 2rem;

  @media ${({ theme }) => theme.device.mobile} {
    width: 15rem;
    max-width: 20rem;
    align-items: center;
    margin: auto;
  }
`;

export const Button = styled(Link)`
  margin: 4rem 4.7rem 0.1rem 4rem;
  background: #6ec5ff;
  white-space: nowrap;
  padding: 0.5rem 3rem;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.5rem;
  text-decoration: none;
  &:hover {
    background: #fff;
    background-color: #002171;
  }
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 1.5rem;
    margin: 2rem auto;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    margin-left: 4.3rem;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
`;

export const SubTitle = styled.h1`
  font-size: 3.4rem;
  font-weight: 600;
  margin-top: 8rem;

  @media ${({ theme }) => theme.device.ipad} {
    font-size: 2.9rem;
    text-align: center;
    margin: auto;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
    text-align: center;
    margin-right: 2rem;
    margin-bottom: 1rem;
  }
`;

const SerchButton = styled.button`
  cursor: pointer;
`;

// map을 위한 테스트
function Main() {
  const navigate = useNavigate();

  return (
    <>
      <MainContainer>
        <MainWrap>
          <Title>어디가 아팡?</Title>
          <Text>진료과목을 선택해보세요</Text>
          <Search>
            <form>
              <SerchButton onClick={() => navigate("/medicallist")}>
                Click <GiClick style={{ verticalAlign: "middle" }} />
              </SerchButton>
            </form>
          </Search>
        </MainWrap>
        <ImgWrap>
          <Img src={Hospital}></Img>
        </ImgWrap>
      </MainContainer>
      <MainContainer>
        <ContentWrapFind>
          <ImgThree src={Find}></ImgThree>
          <BoxWrapFind>
            <ContentTitle>병원을 검색해보세요</ContentTitle>
            <ContentText>내 근처의 병원을 쉽게 찾을 수 있어요</ContentText>
          </BoxWrapFind>
        </ContentWrapFind>
        <ContentWrapReview>
          <ImgThree src={Review}></ImgThree>
          <BoxWrapReview>
            <ContentTitle>솔직한 리뷰를 만나보세요</ContentTitle>
            <ContentText>
              영수증을 인증한 실방문자만 작성이 가능해요
            </ContentText>
          </BoxWrapReview>
        </ContentWrapReview>
        <ContentWrapQna>
          <ImgThree src={Qna}></ImgThree>
          <BoxWrapQna>
            <ContentTitle>전문가에 질문하세요</ContentTitle>
            <ContentText>
              Q&A를 통해 담당 선생님들이 답변을 주실거에요
            </ContentText>
          </BoxWrapQna>
        </ContentWrapQna>
      </MainContainer>
      <MainContainer>
        <Img src={Doc}></Img>
        <MainWrapQna>
          <SubTitle>
            전문가의 조언을
            <br />
            들을 수 있어요
          </SubTitle>
          <Button to="/qna">Q&A 가기</Button>
        </MainWrapQna>
      </MainContainer>
    </>
  );
}

export default Main;
