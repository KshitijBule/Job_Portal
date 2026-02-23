import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock, icons } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/UserService";

const form={
    name:"",
    email:"",
    password: "",
    confirmPassword: "",
    accountType:"APPLICANT",

  }

const SignUp=()=>{

  const [data,setData] = useState(form);
    const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = () => {
    console.log("Submitting:", data);

    registerUser(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  

  const [value, setValue] = useState('react');
  
  return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
        withAsterisk
        label="Name"
        value={data.name}
        name="name"
        onChange={handleChange}
        placeholder="Your name"
        />
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
        <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        } label="Confirm Password" value={data.confirmPassword} name="confirmPassword" onChange={handleChange} placeholder="Enter confirmed password"/>

        <Radio.Group 
          value={data.accountType}
          onChange={handleChange}
          label="You are?"
          description="This is anonymous"
          withAsterisk
        >
          <Group mt="xs">
        <Radio className="px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
        <Radio className="px-6 py-4 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />
        
        </Group>
      </Radio.Group>


       <Checkbox autoContrast label={<>Accept{' '}<Anchor>terms and condition</Anchor>
        </>
        }
       />
       <Button onClick={handleSubmit} autoContrast variant="filled">SignUp</Button>
       <div className="mx-auto">Have an account ? <Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>



  </div>
}
export default SignUp;