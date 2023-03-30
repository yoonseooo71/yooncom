import {LoginPost,LogoutPost} from "../components/Post";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styleComponents from "../assets/styles/StyleComponents";
function PostList({getFunc,isDel=null}) { 
  const {isLogin} = useOutletContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    getFunc(setPostList) ; //path별 데이터를 불러오는함수 
  }, []);
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
