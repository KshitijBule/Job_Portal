import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../Services/UserService";

const form={
    email:"",
    password: "",
    }

const Login=()=>{


const [data,setData] = useState(form);
    const handleChange = (event: any) => {
     
      setData({ ...data, [event.target.name]: event.target.value });
    
  };

  const handleSubmit = () => {
    console.log("Submitting:", data);

    loginUser(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
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
        onChange={handleChange}
        placeholder="Your email"
        />
        <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
       } label="Password" value={data.password} name="password" onChange={handleChange} placeholder="Enter password"/>
       
       <Button onClick={handleSubmit} autoContrast variant="filled">SignUp</Button>
       <div className="mx-auto">Don't have an account ? <Link to="/signup" className="text-bright-sun-400 hover:underline">SignUp</Link></div>



  </div>
}
export default Login;