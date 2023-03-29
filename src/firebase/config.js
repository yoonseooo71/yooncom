import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore() ; 
export const getFireStore = async (colName,docName,order=null,childColName=null,childDocName=null) => { //데이터 불러오는 함수 order는 order조건 적음 
  try {
    let doc ;
    if (childDocName) {
      doc = await db.collection(colName).doc(docName).collection(childColName).doc(childDocName).get();
    } else if(childColName){
      if (order) {
        doc = await db.collection(colName).doc(docName).collection(childColName).orderBy(order[0],order[1]).get();
      } else {
        doc = await db.collection(colName).doc(docName).collection(childColName).get();
      }
    } else if (docName) {
      doc = await db.collection(colName).doc(docName).get();
    } else {
      if (order) {
        doc = await db.collection(colName).orderBy(order[0],order[1]).get();
      } else {
        doc = await db.collection(colName).get();
      }
    }
    return doc ; 
  } catch (error) {
    console.error("error:", error);
  }
};

export async function setFireStore(colName,docName,data,childColName=null,childDocName=null) { //데이터 저장함수
  try {
    if(childDocName){ //문서 안의 컬렉션안의 문서 이름정할때 
      db.collection(colName).doc(docName).collection(childColName).doc(childDocName).set(data);
    }else  if (childColName) {//문서안의 컬렉션안의 문서이름 자동으로 (자동으로 정한 문서이름 반환)
      return db.collection(colName).doc(docName).collection(childColName).add(data);
    }else if (docName) {//문서이름 정함
      db.collection(colName).doc(docName).set(data);
    } else { //문서이름 자동 (자동으로 정한 문서이름 반환)
      return db.collection(colName).add(data);
    } 
  } catch (error) {
    console.log("error:", error);
  }
}

export async function removeFirStore(docName,childDocName){
  try {
    db.collection("posts").doc(childDocName).delete();
    db.collection("user").doc(docName).collection("myPosts").doc(childDocName).delete();
  } catch(error) {
    console.log("error:",error)
  }
}
export default firebase;