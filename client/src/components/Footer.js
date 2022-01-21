import { FaGithub } from "react-icons/fa";
import React from "react";
import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: #dee2e6;
  background-color: ${({ theme }) => theme.color.footer};
  padding: 0.5rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 2560px;
  @media ${({ theme }) => theme.device.ipad} {
    max-width: 1230px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 900px;
    width: 100%;
    font-size: 13px;
  }
`;

const Title = styled.div`
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 0.5vw;
  font-size: 18px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 14px;
    padding: 1vw;
  }
`;

const Lines = styled.div`
  height: 2vw;
  text-align: center;
  margin-bottom: 2vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 14vw;
    padding-bottom: 10%;
  }
  @media ${({ theme }) => theme.device.ipad} {
    margin-bottom: 5vw;
  }
`;
const Careeres = styled.div`
  color: #fff;
  padding: 8px;
  font-size: 20px;
  @media ${({ theme }) => theme.device.ipad} {
    display: flex;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 14px;
    padding: 5px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <Title style={{ fontSize: "20px" }}>
        About Us
        <a
          target="_blank"
          href={"https://github.com/codestates/Apang"}
          style={{ textDecoration: "none", color: "#095cd8" }}
          rel="noreferrer"
        >
          {" "}
          Apang
        </a>
      </Title>
      <Title>Careers</Title>
      {/* --------{About Us, Careers title 끝}------------ */}

      <Lines>
        <Careeres>
          <a
            target="_blank"
            href={"https://github.com/sangcode33"}
            style={{ textDecoration: "none", color: "#fff" }}
            rel="noreferrer"
          >
            <FaGithub style={{ verticalAlign: "top" }} /> 권상현 Front end
          </a>
        </Careeres>
        <Careeres>
          <a
            target="_blank"
            href={"https://github.com/gusdnvkfks/"}
            style={{ textDecoration: "none", color: "#fff" }}
            rel="noreferrer"
          >
            <FaGithub style={{ verticalAlign: "top" }} /> 김경훈 Back end
          </a>
        </Careeres>
        <Careeres>
          <a
            target="_blank"
            href={"https://github.com/codedot21/"}
            style={{ textDecoration: "none", color: "#fff" }}
            rel="noreferrer"
          >
            <FaGithub style={{ verticalAlign: "top" }} /> 김장겸 Front end
          </a>
        </Careeres>
        <Careeres>
          <a
            arget="_blank"
            href={"https://github.com/riaoh/"}
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <FaGithub style={{ verticalAlign: "top" }} /> 오예림 Back end
          </a>
        </Careeres>
      </Lines>

      {/* --------{개인 소개 글 끝}------------ */}

      <Title>© Copyright 2022 Apang. The Algoitsm Team</Title>
    </FooterContainer>
  );
}

export default Footer;
