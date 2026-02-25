import { Button, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { errorNotification, successNotification } from "../Services/NotificationService";

const ResetPassword=(props:any)=>{
  const [email,setEmail]=useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending,setOtpSending]=useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");

  const resetState = () => {
  setEmail("");
  setOtpSent(false);
  setOtpSending(false);
  setVerified(false);
  setPassword("");
  setPassErr("");
};

  const handleResetPassword=()=>{
    changePass(email,password).then((res)=>{
      console.log(res);
      successNotification("Password Changed","Login with new password");
      props.close()
      resetState(); 
    }).catch((err)=>{
      console.log(err);
      errorNotification("Password Reset Failed",err.response.data.errorMessage);
    })
  }

  const handleVerifyOTP=(otp:string)=>{
    console.log(otp);
    verifyOtp(email,otp).then((res)=>{
      console.log(res);
      successNotification("OTP Verified","Enter new Password");
      setVerified(true);

    }).catch((err)=>{
      console.log(err);
      errorNotification("OTP verification Failed",err.response.data.errorMessage);
    })
  }

  const resendOtp=()=>{
    handleSendOtp();
  }

  const changeEmail=()=>{
    setOtpSent(false);
  }

  const handleSendOtp = () => {
  setOtpSending(true);

  sendOtp(email)
    .then((res) => {
      successNotification("OTP sent Succesfully","Enter OTP to reset password");
      setOtpSent(true);
      setOtpSending(false);   //stop loading
    })
    .catch((err) => {
      console.log(err);
      errorNotification("OTP Sending Failed",err.response.data.errorMessage);
      setOtpSending(false);   //stop loading on error too
    });
};

// otp close krne vali dikkat yaha se resolve hogi
  return <Modal opened={props.opened} onClose={() => {
    resetState();      
    props.close();
  }}
  title="Reset Password">
    <div className="flex flex-col gap-6">
      <TextInput
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />
        }
        rightSection={<Button loading={otpSending} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email===""|| otpSent} variant="filled">Send</Button>}
        rightSectionWidth="xl"
        label="Email"
        value={email}
        name="email"
        size="md"
        
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Your email"
        />
        {otpSent && <PinInput onComplete={handleVerifyOTP} length={6} size="md" gap="lg" className="mx-auto" type="number"/>}
        {
          otpSent && !verified && 
          <div className="flex gap-2">
            <Button fullWidth loading={otpSending} color="yellow.4" onClick={resendOtp} autoContrast  variant="light">Resend</Button>

            <Button fullWidth onClick={changeEmail} autoContrast  variant="filled">Change Email</Button>
          </div>
        }
        {
          verified && <PasswordInput withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
       } label="Password" value={password} name="password"   error={passErr} onChange={(e)=>{setPassword(e.target.value);setPassErr(signupValidation("password",e.target.value))}} placeholder="Enter password"/>
       }


       {
        verified && <Button fullWidth onClick={handleResetPassword} autoContrast  variant="filled">Change Password</Button>
       }
    </div>

    </Modal>
}
export default ResetPassword;


