import styled from "styled-components";
import bookmarkIcon from "../assets/images/bookmarkIcon.svg";
import likeIcon from "../assets/images/likeIcon.svg";
function LogoutPost({ id, title, user, text, isDel = null }) {
  const alertLogin = ()=>alert("로그인을 하셔야 이용하실수있습니다.");
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <TextBox>{text}</TextBox>
        <div id="box">
          <User>
            <span>by </span>
            {user}
          </User>
          <LogoBox id="logobox">
            <Logo src={likeIcon} onMouseDown={alertLogin}/>
            <Logo src={bookmarkIcon} onMouseDown={alertLogin}/>
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
export default LogoutPost;
