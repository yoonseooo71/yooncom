import {LoginPost,LogoutPost} from "../components/Post";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styleComponents from "../assets/styles/StyleComponents";
function PostList({getFunc,isDel=null}) { 
  const {isLogin,addPostInfo,setAddPostInfo} = useOutletContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    getFunc(setPostList) ; //path별 데이터를 불러오는함수 
    setAddPostInfo(undefined); //페이지 이동하면 데이터베이스에서 로드하기에 추가할 데이터초기화 
  }, []);
  useEffect(()=>{ //포스트 추가하면 추가한 데이터 가져워서 postList 에 넣어주기
    if (addPostInfo) { //값이 들어있는지 체크 
      setPostList((postList)=>[addPostInfo,...postList])
    }
  },[addPostInfo])
  return (
    <>
        <styleComponents.PostList>
          {postList.map((i,key) => {
            if(isLogin === true) return <LoginPost key={key} {...i} isDel={isDel}/> //로그인됬을때는 기능이 추간된 포스트
            else return <LogoutPost key={key} {...i}/> //로그인 안됬을때는 기능이 없는 포스트 
          })}
        </styleComponents.PostList>
    </>
  );
}



export default PostList;
