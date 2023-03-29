import { useEffect, useState } from "react";
import styled from "styled-components";
import bookmarkIcon from "../assets/images/bookmarkIcon.svg";
import bookmarkIconFill from "../assets/images/bookmarkIcon-fill.svg";
import likeIcon from "../assets/images/likeIcon.svg";
import likeIconFill from "../assets/images/likeIcon-fill.svg";
import trashcanIcon from "../assets/images/trashcanIcon.svg";
import { db } from "../firebase/config";
function LoginPost({ id, title, user, text, isDel = null }) {
  const [isBook, setIsBook] = useState(false);
  const [isLike,setIsLike] = useState(false); 
  useEffect(()=>{ // 유저가 북마크 해논거 표시하기 위해 값 비교해봄
    db.collection("user").doc(localStorage.getItem("userId")).collection("bookMark").doc(id).get()
    .then((doc)=>{if (doc.data() && doc.data().isBook) setIsBook(true)})
    .catch((error) => console.error("error:", error));
    
    db.collection("user").doc(localStorage.getItem("userId")).collection("like").doc(id).get()
    .then((doc)=>{if (doc.data() && doc.data().isLike) setIsLike(true)})
    .catch((error) => console.error("error:", error));
  },[])
  const removePostEvent = () => {//포스트 아예 삭제
    //포스트 지우기 이벤트
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() =>
        db
          .collection("user")
          .doc(localStorage.getItem("userId"))
          .collection("myPosts")
          .doc(id)
          .delete()
      )
      .catch((error) => console.error("error:", error));
  };
  const addBookMarkEvent =  () => { //유저컬렉션에 북마크 포스트 추가 
    setIsBook(!isBook);
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        db.collection("user")
          .doc(localStorage.getItem("userId"))
          .collection("bookMark")
          .doc(id)
          .set({...doc.data(),isBook : true});
      })
      .catch((error) => console.error("error:", error));
  };
  const removeBookMarkEvent = () => { //유저컬렉션에서 북마크 포스트 제거
    setIsBook(!isBook);
    db.collection("user").doc(localStorage.getItem("userId")).collection("bookMark").doc(id).delete()
    .catch((error) => console.error("error:", error));
  };
  const addLikeEvent = () => {
    setIsLike(!isLike); 
    db.collection("user").doc(localStorage.getItem("userId")).collection("like").doc(id).set({isLike : true})
      .catch((error) => console.error("error:", error));
    db.collection("posts").doc(id).get()
      .then((doc)=>{
        const data = doc.data() ; 
        data.like += 1 ;  
        db.collection("posts").doc(id).set(data); 
      })
      .catch((error) => console.error("error:", error));
    
  }
  const removeLikeEvent= ()=>{
    setIsLike(!isLike); 
    db.collection("user").doc(localStorage.getItem("userId")).collection("like").doc(id).delete()
      .catch((error) => console.error("error:", error));
    db.collection("posts").doc(id).get()
      .then((doc)=>{
        const data = doc.data() ; 
        data.like -= 1 ;  
        db.collection("posts").doc(id).set(data); 
      })
      .catch((error) => console.error("error:", error));
    
  }
  return (
    <>
      <Container>
        <TitleBox>
          <Title>{title}</Title>
          <User>{user}</User>
        </TitleBox>
        <TextBox>{text}</TextBox>
        <div id="logobox">
          {
            isDel && (
              <Logo
                src={trashcanIcon}
                onMouseDown={removePostEvent}
                postId={id}
              />
            ) /* 본인 포스트에서 삭제버튼 띄우기 */
          }
          {!isLike ? <Logo src={likeIcon} onMouseDown={addLikeEvent} /> : <Logo src={likeIconFill} onMouseDown={removeLikeEvent}/>}
          
          {!isBook ? (
            <Logo src={bookmarkIcon} onMouseDown={addBookMarkEvent} />
          ) : (
            <Logo src={bookmarkIconFill} onMouseDown={removeBookMarkEvent} />
          )}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 350px;
  height: 250px;
  padding: 20px;
  border-radius: 20px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin: 0 30px 30px 30px;
  #logobox {
    align-self: flex-end;
  }
`;
const TitleBox = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h2`
  width: 200px;
  font-weight: 700;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const User = styled.div`
  width: 100px;
  font-weight: 700;
  font-size: 15px;
  align-self: flex-end;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: end;
`;
const TextBox = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 17px;
  font-weight: 700;
  font-size: 16px;
  word-break: break-all;
  overflow: hidden;
`;
const Logo = styled.img`
  width: 40px;
`;

export default LoginPost;
