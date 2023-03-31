import { useState } from "react";
import styled from "styled-components";
import {db} from "../firebase/config";
function PostAdd({ toglePostAddHandler,userName }) {
  const [postInfo, setPostInfo] = useState({
    title: "",
    text: "",
    user: userName,//로그인 기능 미구현이라 임시로 적어둠
    date: new Date()
  });
  function savePostInfo() { //input 값 바뀔때마다 state 저장 함수
    setPostInfo({
      title: document.getElementById("post-title").value,
      text: document.getElementById("post-text").value,
      user: userName,//로그인 기능 미구현이라 임시로 적어둠
      like: 0,
      date: new Date()
    });
  }
  async function setPosts(e) { //firebase 데이더 추가 함수 
    if (postInfo.text !== "" && postInfo.title !== "" && postInfo.user !== "") {
      db.collection("posts").add(postInfo)//전체 문서에 추가 
        .then((Doc)=>db.collection("user").doc(localStorage.getItem("userId")).collection("myPosts").doc(Doc).set(postInfo))
        .catch((error)=>console.error("error",error))
      toglePostAddHandler(e);
    }
  }
  return (
    <Background >
      <InputBox>
        <InputTitle
          id="post-title"
          type="text"
          placeholder="제목"
          required
          onChange={savePostInfo}
        />
        <InputText
          id="post-text"
          type="text"
          placeholder="내용"
          required
          onChange={savePostInfo}
        />
        <Btnbox>
          <CancleBtn onMouseDown={toglePostAddHandler}>취소</CancleBtn>
          <MakeBtn onMouseDown={setPosts}>완료</MakeBtn>
        </Btnbox>
      </InputBox>
    </Background>
  );
}
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50px;
  padding: 30px;
  background-color: white;
`;
const InputTitle = styled.input`
  width: 100%;
  height: 70px;
  font-size: 32px;
  font-weight: 700;
  outline: none;
  border: none;
  padding: 10px;
`;
const InputText = styled.textarea`
  width: 100%;
  height: 400px;
  font-size: 20px;
  font-weight: 700;
  outline: none;
  border: none;
  padding: 10px;
  resize: none;
`;
const Btnbox = styled.div`
  display: flex;
  margin-left: auto;
  width: 240px;
  justify-content: space-between;
`;
const MakeBtn = styled.button`
  width: 100px;
  height: 50px;
  background-color: #06d6a0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  margin-left: auto;
`;
const CancleBtn = styled(MakeBtn)`
  background-color: #ef476f;
`;
export default PostAdd;
