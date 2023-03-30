import styled from "styled-components";

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
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
const styleComponents = { 
  CenterContainer,
  PostList
}


export default styleComponents 











