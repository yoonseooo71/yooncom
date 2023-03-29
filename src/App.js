import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import RecentPost from './components/RecentPosts';
import MyPosts from './components/MyPosts';
import BookMarkPost from './components/BookMarkPost';
import LikePost from './components/LikePost';
function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route path='/' element={<RecentPost/>}/>
            <Route path='/myposts' element={<MyPosts/>}/>
            <Route path='/bookmark' element={<BookMarkPost/>}/>
            <Route path='/like' element={<LikePost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
