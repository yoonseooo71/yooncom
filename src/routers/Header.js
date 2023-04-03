import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase, { db } from "../firebase/config";
import styleComponents from "../assets/styles/StyleComponents";
import PostAdd from "../components/PostAdd";
import PopUser from "../components/PopUser";
function Header() {
  const navigate = useNavigate();
  const [isPostAdd, setIsPostAdd] = useState(false); //글추가창 state
  const [addPostInfo, setAddPostInfo] = useState(undefined); //새로운 포스트 추가 값 전달 state
  const [isPopUser, setIsPopUser] = useState(false); //유저 팝업창 state
  const [userLoginInfo, setUserLoginInfo] = useState({}); //유저 정보 state
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin")); //로컬스토리지에 로그인이 되었있는지 확인
  useEffect(() => {
    //처음 브라우져 켰을때 로그인 유지할지 확인
    if (isLogin === "true") {
      const userId = localStorage.getItem("userId");
      getUserInfo(userId);
      setIsLogin(true); //state값도 바꿔주기
    }
  }, []);
  const getUserInfo = async (userId) => {
    //user uid가지고 데이터베이스에서 정보가져와서 state에 저장
    db.collection("user")
      .doc(userId)
      .get()
      .then((doc) => setUserLoginInfo({ ...doc.data() }))
      .catch((error) => console.log("error:", error));
  };
  const loginEvent = () => {
    //구글로그인 함수
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const info = {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };
        db.collection("user")
          .doc(user.uid)
          .set(info)
          .then(() => {
            localStorage.setItem("isLogin", true); //로컬스토리지에 로그인 현황 저장
            localStorage.setItem("userId", user.uid); //로컬스토리지에 유저 아이디 저장
          })
          .then(() => window.location.reload()) //창 새로고침 새로고침할떄 데이터가 다전송된디에 보내야함
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const logoutEvent = () => {
    //로그아웃 함수
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userId");
    navigate("/"); //로그아웃할때 홈으로 이동 그이유는 로그인전에 이동못하는 창이있기때문
    window.location.reload(); //창 새로고침
  };
  return (
    <>
      {isPostAdd && (
        <PostAdd
          toglePostAddHandler={() => setIsPostAdd(!isPostAdd)}
          userName={userLoginInfo.name}
          addPostInfo={setAddPostInfo}
        />
      )}
      <HeaderContainer>
        <Title>yooncom</Title>
        <NavContainer>
          <Link to="/">
            <Nav>최신</Nav>
          </Link>
          <Link to="/like">
            <Nav>트렌드</Nav>
          </Link>
          {isLogin && (
            <Nav onMouseDown={() => setIsPostAdd(!isPostAdd)}>글쓰기</Nav>
          )}
        </NavContainer>
        {isLogin ? (
          <>
            <UserImg
              src={userLoginInfo.photoURL}
              referrerPolicy="no-referrer"
              onMouseDown={() => {
                setIsPopUser(!isPopUser);
              }}
            />
            {isPopUser && (
              <PopUser
                userName={userLoginInfo.name}
                logoutHandler={logoutEvent}
              />
            )}
          </>
        ) : (
          <Login onClick={loginEvent}>로그인</Login>
        )}
      </HeaderContainer>
      <Line />
      {!isPostAdd && <Outlet context={{ isLogin, addPostInfo, setAddPostInfo }} />}
    </>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  padding: 0 70px 0 70px;
`;
const Title = styled(styleComponents.CenterContainer)`
  font-size: 64px;
`;
const NavContainer = styled.div`
  display: flex;
  align-items: end;
  margin-left: 100px;
`;
const Nav = styled(Title)`
  flex-basis: auto;
  font-size: 36px;
  margin: 0 20px 0 20px;
  cursor: pointer;
`;
const Login = styled(Nav)`
  margin: 0;
  margin-left: auto;
  align-self: flex-end;
  cursor: pointer;
`;
const Line = styled.div`
  width: 98%;
  border: 2px black solid;
  margin: 29px 0 29px;
`;
const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-self: flex-end;
  margin-left: auto;
  cursor: pointer;
`;
export default Header;
