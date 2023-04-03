import { db } from "../firebase/config";
function getRecent(setState) {
  db.collection("posts").orderBy("date","desc").get()
      .then((querySnapshot)=>{
        const newPost = [];
        querySnapshot.forEach((doc) => newPost.push({...doc.data() , id:doc.id}));
        setState(newPost) ;
      })
      .catch((error) => console.error("error:", error));
}
function getLike(setState) {
  db.collection("posts").orderBy("like","desc").get()
      .then((querySnapshot)=>{
        const newPost = []; 
        querySnapshot.forEach((doc) => newPost.push({...doc.data() , id:doc.id}));
        setState(newPost);
      })
      .catch((error) => console.error("error:", error));
}
function getBookMark(setState) {
  db.collection("user").doc(localStorage.getItem("userId")).collection("bookMark").orderBy("date","desc").get()
    .then((querySnapshot)=>{
      const newPost = []; 
      querySnapshot.forEach((doc) => newPost.push({...doc.data() , id:doc.id}));
      setState(newPost);
    })
    .catch((error) => console.error("error:", error));
}
function getMy(setState){
  db.collection("user").doc(localStorage.getItem("userId")).collection("myPosts").orderBy("date","desc").get()
      .then((querySnapshot)=>{
        const newPost = []; 
        querySnapshot.forEach((doc) => newPost.push({...doc.data() , id:doc.id}));
        setState(newPost);
      })
      .catch((error) => console.error("error:", error));
}

export {getRecent,getLike,getBookMark,getMy} ; 