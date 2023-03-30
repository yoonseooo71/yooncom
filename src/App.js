import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Header from './routers/Header';
import PostList from './routers/PostList';
import {getRecent,getLike,getBookMark,getMy} from './modules/getFunction';
function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route path='/' element={<PostList getFunc={getRecent} key="recent"/>}/>  {/*컴포넌트 이름이 같아 키값을 각각다르게 추가해줘야 각 path마다 렌더링이됨*/}
            <Route  path='/myposts' element={<PostList getFunc={getMy} isDel={true} key="my"/>}/>
            <Route  path='/bookmark' element={<PostList getFunc={getBookMark} key="bookmark"/>}/>
            <Route  path='/like' element={<PostList getFunc={getLike} key="like"/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
