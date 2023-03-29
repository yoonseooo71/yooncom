import styled from "styled-components";
import { Link } from "react-router-dom";
function PopUser({ userName, logoutHandler }) {
  return (
    <>
      <UserContainer>
        <UserName>{userName}</UserName>
        <PopNavs>
          <Link to="/myposts">
            <PopNav>내가쓴글</PopNav>
          </Link>
          <Link to="/bookmark">
            <PopNav>북마크</PopNav>
          </Link>
        </PopNavs>
        <Logout onMouseDown={logoutHandler}>로그아웃</Logout>
      </UserContainer>
    </>
  );
}

const UserContainer = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  right: 60px;
  border: 3px gray solid;
  background-color: white;
  padding: 15px;
`;
const UserName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
`;
const PopNavs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  height: 70px;
`;
const PopNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;
const Logout = styled(PopNav)`
  font-size: 17px;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default PopUser;
