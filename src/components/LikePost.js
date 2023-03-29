import styled from "styled-components";
import LoginPost from "./LoginPost";
import LogoutPost from "./LogoutPost";
import { useEffect, useState } from "react";
import {db} from "../firebase/config";
import { useOutletContext } from "react-router-dom";
function LikePost() {
  const {isLogin} = useOutletContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    db.collection("posts").orderBy("like","desc").get()
      .then((querySnapshot)=>{
        const newPost = []; 
        querySnapshot.forEach((doc) => newPost.push({...doc.data() , id:doc.id}));
        setPostList(newPost);
      })
      .catch((error) => console.error("error:", error));
  }, []);
  return (
    <>
        <PostList>
          {postList.map((i,key) => {
            if(isLogin === true) return <LoginPost key={key} {...i} />
            else return <LogoutPost key={key} {...i}/> 
          })}
        </PostList>
    </>
  );
}


const PostList = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  width: 90%;
  min-width: 500px;
  height: 767px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y:scroll;
`;
export default LikePost;
