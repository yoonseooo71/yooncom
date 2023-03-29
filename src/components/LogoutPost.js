import styled from "styled-components";
import bookmarkIcon from "../assets/images/bookmarkIcon.svg";
import likeIcon from "../assets/images/likeIcon.svg";
import trashcanIcon from "../assets/images/trashcanIcon.svg";
function LogoutPost({ id, title, user, text, isDel = null }) {
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
                postId={id}
              />
            ) /* 본인 포스트에서 삭제버튼 띄우기 */
          }
          <Logo src={likeIcon}/>
          <Logo src={bookmarkIcon}  />
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

export default LogoutPost;
