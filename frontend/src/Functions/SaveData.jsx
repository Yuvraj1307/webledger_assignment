import axios from "axios";

function SaveData(el){
  axios
  .post('https://webledgerassignment.onrender.com/recipie', el,{
    headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }
})
  .then((res) =>{
    console.log(res)
    
  })
  .catch((err) =>{
     console.log(err)});
  console.log(el)
}

export default SaveData