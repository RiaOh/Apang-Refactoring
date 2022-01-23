import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  padding: 4rem 2rem;
  flex-direction: row;
  align-items: left;
`;
const Auth = styled.h1`
  text-align: left;
  margin: 0 0 20px 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

const Tools = styled.table`
  border: 3px solid #3b7de0;
  width: 100%;
  text-align: center;
`;
const Tools2 = styled.thead``;

const TitleHeader = styled.th`
  border-bottom: 1px solid #3b7de0;
  border-left: 1px solid #3b7de0;
  padding: 0.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 10px;
    width: 5%;
    padding: 3px;
  }
`;

const Tbody = styled.tbody`
  color: #494949;
`;

const AgreeBtn = styled.button`
  border: 1px solid #63b5f6;
  background-color: #63b5f6;
  border-radius: 10px;
  color: #fff;
  padding: 3px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 10px;
  }
`;

function AuthPage() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doctor/userinfo`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.doctorList);
        setDoctors(res.data.doctorList);
      });
  }, []);

  const agreeHandler = (params, e) => {
    // console.log(params);
    axios
      .post(`${process.env.REACT_APP_API_URL}/doctor/profile`, params.id, {
        withCredentials: true,
      })
      .then(() => {
        // 이메일js
        console.log("이메일 js");
        axios.post("https://api.emailjs.com/api/v1.0/email/send", {
          service_id: "service_3qi21lj",
          template_id: "template_dm416d4",
          user_id: "user_UBc4aJnCt4Xpy1fbk83EK",
          // 신청 의사들의 데이터들 넣는자리
          template_params: {
            from_name: `${params.name}`, // ${c.name}
            message:
              "의사 회원가입 신청 승인이 완료되었습니다. 이후부터는 로그인을 통해 활동을 하실 수 있으며, Q&A질문글에 답변도 하실 수 있습니다. 많은 활동 부탁드립니다.",
            email: `${params.email}`, // ${c.email}
          },
        });
        navigate("/");
        navigate("/authpage");
      });
  };

  return (
    <>
      <AuthContainer>
        <Auth>관리자</Auth>
        <Tools>
          <Tools2>
            <tr>
              <TitleHeader>Number</TitleHeader>
              <TitleHeader>Email</TitleHeader>
              <TitleHeader>이름</TitleHeader>
              <TitleHeader>병원명</TitleHeader>
              <TitleHeader>의사면허번호</TitleHeader>
              <TitleHeader>AGREE</TitleHeader>
              <TitleHeader>승낙여부</TitleHeader>
            </tr>
          </Tools2>
          {doctors.map((doctors) => (
            <Tbody key={doctors.id}>
              <tr>
                <TitleHeader>{doctors.id}</TitleHeader>
                <TitleHeader>{doctors.email}</TitleHeader>
                <TitleHeader>{doctors.name}</TitleHeader>
                <TitleHeader>{doctors.hospital}</TitleHeader>
                <TitleHeader>{doctors.license}</TitleHeader>
                <TitleHeader>{doctors.agree}</TitleHeader>
                <TitleHeader>
                  <AgreeBtn onClick={(e) => agreeHandler(doctors, e)}>
                    승낙
                  </AgreeBtn>
                </TitleHeader>
              </tr>
            </Tbody>
          ))}
        </Tools>
      </AuthContainer>
    </>
  );
}

export default AuthPage;
