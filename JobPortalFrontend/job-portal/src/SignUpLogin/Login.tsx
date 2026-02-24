import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form={
    email:"",
    password: "",
    }

const Login=()=>{


const [data,setData] =useState<{[key:string]:string}>(form);
    const handleChange = (event: any) => {
     
      setData({ ...data, [event.target.name]: event.target.value });
    
  };

  

const [formError, setFormError] = useState<{[key:string]:string}>(form);

const navigate = useNavigate();


  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};

  for (let key in data) {
    if (key === "accountType") continue;

    if (key !== "confirmPassword")
      newFormError[key] = loginValidation(key, data[key]);
    

    if (newFormError[key]) valid = false;
  }

  setFormError(newFormError);
  if(valid){
    console.log("Submitting:", data);


    // yaha problem ho skti hai 
    loginUser(data)
      .then((res) => {
              console.log(res);
              
      
              notifications.show({
                title: "Login Succesfull",
                message: "Redirecting to Home Page...",
                color: "green",
                icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                withCloseButton: true,
              });
      
              setTimeout(()=>{
                  navigate("/");
              },3000)
            })
      
      .catch((err) => {
        console.log(err);

        notifications.show({
          title: "Login Failed",
          message: err.response.data.errorMessage,
          color: "red",
          icon:<IconX style={{width:"90%",height:"90%"}}/>,
          withCloseButton: true,
        });
      });
  }
    
  };







  return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login</div>
        
        <TextInput
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />
        }
        label="Email"
        value={data.email}
        name="email"
        error={formError.email}
        onChange={handleChange}
        placeholder="Your email"
        />
        <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
       } label="Password" value={data.password} name="password"   error={formError.password} onChange={handleChange} placeholder="Enter password"/>
       
       <Button onClick={handleSubmit} autoContrast variant="filled">Login</Button>
       <div className="mx-auto">Don't have an account ? <span onClick={() => { navigate("/signup"); setFormError(form); setData(form); }} className="text-bright-sun-400 hover:underline cursor-pointer">SignUp</span></div>



  </div>
}
export default Login;