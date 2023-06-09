import { useEffect, useState } from "react";
import styled from "styled-components";
import bookmarkIcon from "../assets/images/bookmarkIcon.svg";
import bookmarkIconFill from "../assets/images/bookmarkIcon-fill.svg";
import likeIcon from "../assets/images/likeIcon.svg";
import likeIconFill from "../assets/images/likeIcon-fill.svg";
import trashcanIcon from "../assets/images/trashcanIcon.svg";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
function LoginPost({ id, title, user, text, isDel = null }) {
  const navigate = useNavigate() ; 
  const [isBook, setIsBook] = useState(false);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    // 유저가 북마크 해논거 표시하기 위해 값 비교해봄
    db.collection("user")
      .doc(localStorage.getItem("userId"))
      .collection("bookMark")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.data() && doc.data().isBook) setIsBook(true);
      })
      .catch((error) => console.error("error:", error));

    db.collection("user")
      .doc(localStorage.getItem("userId"))
      .collection("like")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.data() && doc.data().isLike) setIsLike(true);
      })
      .catch((error) => console.error("error:", error));
  }, []);
  const removePostEvent = (e) => {
    //포스트 아예 삭제
    //포스트 지우기 이벤트
    e.stopPropagation(); //부모 이벤트 버블링 방지(이벤트 겹치는것)
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
      .then(() => window.location.reload()) //창새로고침
      .catch((error) => console.error("error:", error));
  };
  const addBookMarkEvent = (e) => {
    //유저컬렉션에 북마크 포스트 추가
    e.stopPropagation();
    setIsBook(!isBook);
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        db.collection("user")
          .doc(localStorage.getItem("userId"))
          .collection("bookMark")
          .doc(id)
          .set({ ...doc.data(), isBook: true });
      })
      .catch((error) => console.error("error:", error));
  };
  const removeBookMarkEvent = (e) => {
    //유저컬렉션에서 북마크 포스트 제거
    e.stopPropagation();
    setIsBook(!isBook);
    db.collection("user")
      .doc(localStorage.getItem("userId"))
      .collection("bookMark")
      .doc(id)
      .delete()
      .catch((error) => console.error("error:", error));
  };
  const addLikeEvent = (e) => {
    e.stopPropagation();
    setIsLike(!isLike);
    db.collection("user")
      .doc(localStorage.getItem("userId"))
      .collection("like")
      .doc(id)
      .set({ isLike: true })
      .catch((error) => console.error("error:", error));
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        data.like += 1;
        db.collection("posts").doc(id).set(data);
      })
      .catch((error) => console.error("error:", error));
  };
  const removeLikeEvent = (e) => {
    e.stopPropagation();
    setIsLike(!isLike);
    db.collection("user")
      .doc(localStorage.getItem("userId"))
      .collection("like")
      .doc(id)
      .delete()
      .catch((error) => console.error("error:", error));
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        data.like -= 1;
        db.collection("posts").doc(id).set(data);
      })
      .catch((error) => console.error("error:", error));
  };
  const goPostInfo = () => {
    navigate(`/post/${id}`)
  }
  return (
    <>
      <Container onMouseDown={goPostInfo}> 
        <Title>{title}</Title>
        <TextBox>{text}</TextBox>
        <div id="box">
          <User>
            <span>by </span>
            {user}
          </User>
          <LogoBox id="logobox" isDel={isDel}>
            {
              isDel && (
                <Logo
                  src={trashcanIcon}
                  onMouseDown={removePostEvent}
                  postId={id}
                />
              ) /* 본인 포스트에서 삭제버튼 띄우기 */
            }
            {!isLike ? (
              <Logo src={likeIcon} onMouseDown={addLikeEvent} />
            ) : (
              <Logo src={likeIconFill} onMouseDown={removeLikeEvent} />
            )}

            {!isBook ? (
              <Logo src={bookmarkIcon} onMouseDown={addBookMarkEvent} />
            ) : (
              <Logo src={bookmarkIconFill} onMouseDown={removeBookMarkEvent} />
            )}
          </LogoBox>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 350px;
  height: 250px;
  padding: 20px;
  border-radius: 5px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin: 0 30px 30px 30px;
  #box {
    display: flex;
    justify-content: space-between;
  }
`;
const LogoBox = styled.div`
  width: ${({ isDel }) => (isDel ? "30%" : "20%")};
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
`;
const Title = styled.h2`
  width: 100%;
  font-size: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const User = styled.div`
  width: 70%;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TextBox = styled.div`
  width: 100%;
  height: 130px;
  margin-top: 17px;
  font-weight: 700;
  font-size: 16px;
  word-break: break-all;
  overflow: hidden;
`;
const Logo = styled.img`
  width: 30px;
`;

export default LoginPost;
