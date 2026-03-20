import axiosInstance from "../Interceptor/AxiosInterceptor";

const base_url="http://localhost:8080/users/"



const registerUser=async (user:any)=>{
  return axiosInstance.post(`/users/register`,user)
  .then((res)=>{
  console.log(res);        // full axiosInstanceInstance response
  console.log(res.data);   // backend message
  console.log(res.status); // 200
})
  .catch(error=>{throw error;});
}

const loginUser=async (login:any)=>{
  return axiosInstance.post(`/users/login`,login)
  .then((res)=>{
  console.log(res);        // full axiosInstance response
  console.log(res.data);   // backend message
  console.log(res.status);
   return res;
})
  .catch(error=>{throw error;});
}

const sendOtp = async(email:any)=>{
  return axiosInstance.post(`/users/sendOtp/${email}`)
  .then(result=>result.data)
  .catch(error=>{throw error;});
}


const verifyOtp = async(email:any, otp:any)=>{
  return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
  .then(result=>result.data)
  .catch(error=>{throw error;});
}


const changePass = async(email:string, password:string)=>{
  return axiosInstance.post(`/users/changePass`,{email, password})
  .then(result=>result.data)
  .catch(error=>{throw error;});
}

export{registerUser, loginUser,sendOtp,verifyOtp,changePass};