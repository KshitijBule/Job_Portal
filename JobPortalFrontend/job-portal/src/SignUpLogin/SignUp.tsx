import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, icons, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form={
    name:"",
    email:"",
    password: "",
    confirmPassword: "",
    accountType:"APPLICANT",

  }

const SignUp=()=>{
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const [formError, setFormError] = useState<{[key:string]:string}>(form);


  const [data,setData] = useState<{[key:string]:string}>(form);
    const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
      return;
    } 
    let name=event.target.name, value=event.target.value
      setData({ ...data, [name]: value });
      setFormError({...formError,[name]:signupValidation(name,value)})

      // thoda extra checking ki agar confirm pasword k baad password edit hua to validate karna chahiye
      if(name==="password" && data.confirmPassword!==""){
        let err="";
        if(data.confirmPassword!==value) err="Passwords do not match";
          
              
              setFormError({...formError,[name]:signupValidation(name,value),confirmPassword:err})

          
      }

      // normal confirm password and password checking
      if(name==="confirmPassword"){
        if(data.password!==value)setFormError({...formError,[name]:"Passwords do not match"})
          else{
            setFormError({...formError,confirmPassword:""});
          }
      }
    
  };

  const handleSubmit = () => {
    
  let valid = true, newFormError: { [key: string]: string } = {};

  for (let key in data) {
    if (key === "accountType") continue;

    if (key !== "confirmPassword")
      newFormError[key] = signupValidation(key, data[key]);
    else if (data[key] !== data["password"])
      newFormError[key] = "Password do not match.";

    if (newFormError[key]) valid = false;
  }

  setFormError(newFormError);
  console.log(valid);

  if (valid === true) {
    setLoading(true);
    console.log("Submitting:", data);

    registerUser(data)
      .then((res) => {
        console.log(res);
        setData(form);

        notifications.show({
          title: "Registered Succesfully",
          message: "Redirecting to Login Page...",
          color: "green",
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          withCloseButton: true,
        });

        setTimeout(()=>{
          setLoading(false);
            navigate("/login");
        },3000)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);

        notifications.show({
          title: "Registration Failed",
          message: err.response.data.errorMessage,
          color: "red",
          icon:<IconX style={{width:"90%",height:"90%"}}/>,
          withCloseButton: true,
        });
      });
  }
};
  

  const [value, setValue] = useState('react');
  
  return<> <LoadingOverlay
            visible={loading}
            zIndex={1000}
            className="translate-x-1/2"
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'yellow.4', type: 'bars' }}
          /> <div className="w-1/2 px-20 sm-mx:w-full bs-ms:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
        withAsterisk
        label="Name"
        value={data.name}
        name="name"
        error={formError.name}
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
        error={formError.email}
        onChange={handleChange}
        placeholder="Your email"
        />
        <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
       } label="Password" value={data.password} name="password" error={formError.password} onChange={handleChange} placeholder="Enter password"/>
        <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        } label="Confirm Password" value={data.confirmPassword} name="confirmPassword" error={formError.confirmPassword} onChange={handleChange} placeholder="Enter confirmed password"/>

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
       <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">SignUp</Button>
       <div className="mx-auto">Have an account ? <span
          className="text-bright-sun-400 hover:underline cursor-pointer"
          onClick={() => { navigate("/login"); setFormError(form); setData(form); }}>Login</span></div>



  </div>
  </>
}
export default SignUp;