
function getDate() {
  const date = new Date() ; 
  const year = date.getFullYear() ; 
  const month = date.getMonth().toString().padStart(2,'0'); 
  const day = date.getDate().toString().padStart(2,'0'); 
  return year+'-'+month+'-'+day; 
}

function getTime() {
  const date = new Date() ; 
  const hours = date.getHours().toString().padStart(2,'0');  
  const minutes = date.getMinutes().toString().padStart(2,'0'); 
  const seconds = date.getSeconds().toString().padStart(2,'0');  
  return hours+'-'+minutes+'-'+seconds; 
}
export default {getDate,getTime} ; 
