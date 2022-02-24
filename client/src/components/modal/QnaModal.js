import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { category } from "../../modules/category";
import Swal from "sweetalert2";
import { message } from "../../modules/message";

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
  max-width: 40rem;
  max-height: 45rem;
  border-radius: 1rem;
  background-color: #fbf3ed;
  overflow: hidden;
`;

export const QnaHeader = styled.div`
  position: relative;
  padding: 1.5rem 3.5rem 1rem 18rem;
  background-color: #fbf3ed;
  font-weight: 500;
  color: black;
  font-size: 1.5rem;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    padding: 1.5rem 1.5rem 1rem 10rem;
  }

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

export const QnaBody = styled.div`
  padding: 1rem;
  color: black;
  background-color: #fbf3ed;
  border-radius: 10px;
  &:focus {
    outline: 0.1rem solid #63b5f6;
  }

  & > div {
    padding: 0.3rem 0.7rem 0.7rem 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
    }
  }

  & > div > input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    width: 30rem;
    height: 2.5rem;
    font-size: 0.8rem;
    border: 0.1rem solid #dee2e6;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
    }
  }

  .select {
    color: gray;
    font-size: 0.8rem;
    width: 30rem;
    height: 2.5rem;
    border-radius: 10px;
    background: white;
    border: 0.1rem solid #dee2e6;
    &:focus {
      outline: 0.1rem solid #63b5f6;
    }
    .option {
    }
  }
  .textarea {
    padding-bottom: 15rem;
    padding-top: 1.2rem;
  }
`;

export const QnaFooter = styled.div`
  padding: 0.1rem 1rem 1rem 1rem;
  background-color: #fbf3ed;
`;

export const Button = styled.button`
  margin: 0.7rem 4rem;
  background: #6ec5ff;
  white-space: nowrap;
  padding: 0.6rem 14.3rem;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: #fff;
    background-color: #002171;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    padding: 0.5rem 9rem 0.5rem 9rem;
    margin-left: 1rem;
  }
`;

export const TagsInput = styled.div`
  margin-left: 3.2rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 1rem;
  width: 31.6rem;
  padding: 0 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-left: 0;
    width: 21.5rem;
  }

  > ul {
    display: flex;
    flex-wrap: wrap;

    > .tag {
      width: auto;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.color.white};
      padding: 0 0.5rem;
      font-size: 0.8rem;
      list-style: none;
      border-radius: 10px;
      margin: 1rem 1rem 0 0;
      background: ${({ theme }) => theme.color.button};
      > .tag-close-icon {
        display: block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.8rem;
        margin-left: 0.5rem;
        color: ${({ theme }) => theme.color.button};
        border-radius: 50%;
        background: ${({ theme }) => theme.color.white};
        cursor: pointer;
      }
    }
  }
  > input {
    display: block;
    border: none;
    height: 2rem;
    font-size: 0.8rem;
  }
`;

export const TextArea = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 30em;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-left: 0;
    width: 21.5rem;
  }

  > textarea {
    overflow: hidden;
    resize: none;
    display: block;
    outline: none;
    border: none;
    width: 100%;
    height: 10rem;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    border: 0.1rem solid #dee2e6;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
    }
  }
`;

function QnaModal({ open, close, tagHandler }) {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  // 해시태그 띄워주기 위한거임 삭제하지마세요.
  let qnaId;

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((el, index) => index !== indexToRemove));
  };

  const addTags = (event) => {
    const result = [];
    for (let el of tags) {
      if (el === event.target.value) result.push(event.target.value);
    }
    if (result.length === 0 && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const [qnaInfo, setqnaInfo] = useState({
    category: "",
    title: "",
    content: "",
  });

  const qnaChange = (key) => (e) => {
    setqnaInfo({
      ...qnaInfo,
      [key]: e.target.value,
    });
  };

  const handleUpload = () => {
    const { category, title, content } = qnaInfo;
    if (category === "" || title === "" || content === "") {
      Swal.fire({
        icon: "info",
        text: message.emptyMessage,
      });
      return;
    }
    axios
      .post(
        process.env.REACT_APP_API_URL + "/qna/upload",
        { ...qnaInfo, kakao_userid: localStorage.getItem("userid") },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log("질문등록후 res : ", res);
        qnaId = res.data.data.id;
        let payload = { tags: tags };
        axios(
          {
            url: `${process.env.REACT_APP_API_URL}/hashtag/upload`,
            method: "post",
            data: payload,
          },
          {
            withCredentials: true,
          }
        ).then((res) => {
          // console.log("qna_hashtag요청보낼거임 : ", qnaId);
          // console.log("해시태그아이디들 : ", res.data.data);
          // console.log("해시태그 : ", res.data.data);
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/hashtag/qnahashtag`,
              { qnaId: qnaId, hashtag: res.data.data },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              // console.log("성공?");
            })
            .then(() => {
              close();
              navigate("/");
              navigate("/qna");
            });
        });
      });
    Swal.fire({
      icon: "success",
      text: "담당 선생님의 답변을 기다려주세요",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return open ? (
    <ModalBackGround onClick={close}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <QnaHeader>
          {/* 질문하기 */}
          <button onClick={close}> &times; </button>
        </QnaHeader>
        <QnaBody>
          <div>
            <select className="select" onChange={qnaChange("category")}>
              <option className="option" value="">
                카테고리를 선택해주세요
              </option>
              {category.map((category, i) => {
                return <option key={i}>{category}</option>;
              })}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={qnaChange("title")}
            />
          </div>

          <TagsInput>
            <input
              type="text"
              placeholder="Enter로 해시태그를 입력할 수 있어요"
              onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
            />
            <ul id="tags">
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </li>
              ))}
            </ul>
          </TagsInput>

          <div>
            <TextArea>
              <textarea
                className="textarea"
                type="textarea"
                placeholder="내용을 입력해주세요"
                maxLength="177"
                onChange={qnaChange("content")}
              />
            </TextArea>
          </div>
        </QnaBody>
        <QnaFooter>
          <Button
            onClick={() => {
              handleUpload();
            }}
          >
            등록
          </Button>
        </QnaFooter>
      </ModalBox>
    </ModalBackGround>
  ) : null;
}

export default QnaModal;
