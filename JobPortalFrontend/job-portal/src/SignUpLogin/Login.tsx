import { Anchor, Button, Checkbox, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPasword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";

const form={
    email:"",
    password: "",
    }

const Login=()=>{

  const [loading,setLoading] = useState(false);

  const dispatch=useDispatch();


const [data,setData] =useState<{[key:string]:string}>(form);
    const handleChange = (event: any) => {
     
      setData({ ...data, [event.target.name]: event.target.value });
    
  };

const [opened, { open, close }] = useDisclosure(false);
  

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
    setLoading(true);
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
                  setLoading(false);
                  dispatch(setUser(res));
                  navigate("/");
              },3000)
            })
      
      .catch((err) => {
        setLoading(false);
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







  return <><LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'yellow.4', type: 'bars' }}
        />
  <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
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
       
       <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
       <div className="mx-auto">Don't have an account ? <span onClick={() => { navigate("/signup"); setFormError(form); setData(form); }} className="text-bright-sun-400 hover:underline cursor-pointer">SignUp</span></div>

        <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>

  </div>
  <ResetPassword opened={opened} close={close}/>
  </>
}
export default Login;