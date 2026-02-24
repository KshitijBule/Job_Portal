import axios from "axios"
const base_url="http://localhost:8080/users/"



const registerUser=async (user:any)=>{
  return axios.post(`${base_url}register`,user)
  .then((res)=>{
  console.log(res);        // full axios response
  console.log(res.data);   // backend message
  console.log(res.status); // 200
})
  .catch(error=>{throw error;});
}

const loginUser=async (login:any)=>{
  return axios.post(`${base_url}login`,login)
  .then((res)=>{
  console.log(res);        // full axios response
  console.log(res.data);   // backend message
  console.log(res.status); // 200
})
  .catch(error=>{throw error;});
}

export{registerUser, loginUser};