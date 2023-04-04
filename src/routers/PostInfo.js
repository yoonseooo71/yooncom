import styled from "styled-components";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
function PostInfo() {
  const params = useParams();
  const productId = params.id;
  const [postData, setPostData] = useState(undefined);
  useEffect(() => {
    db.collection("posts")
      .doc(productId)
      .get()
      .then((res) => setPostData(res.data()))
      .catch((error) => console.error("error:", error));
  }, []);
  console.log(postData);
  return (
    <>
      {postData &&
      (
        <Container>
          <Title>{postData.title}</Title>
          <User>{postData.user} </User>
          <Text>{postData.text}</Text>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 60%;
  min-height:400px;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 20px;

`;
const Title = styled.div`
  font-size: 40px;
  text-align: start;
`;
const User = styled.div`
  font-size: 15px;
  text-align: start;
  margin: 10px 0 20px 0; 
`;
const Text = styled.div`
  font-size: 25px;
  text-align: start;
  word-break:break-all;
`;

export default PostInfo;
