const signupValidation=(name:string, value:string)=>{
switch(name){
   case "name":
      if (value.length === 0) return "Name is required.";
      return "";

    case "email":
      if (value.length === 0) return "Email is required.";
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
        return "Invalid email format.";
      return "";

    case "password":
  if (value.length === 0) return "Password is required.";

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;

  if (!passwordRegex.test(value))
    return "Password must be 8-15 characters with at least 1 uppercase, 1 lowercase, and 1 special character.";

  return "";

    default:
      return "";

}
}

const loginValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (value.length === 0) return "Email is required.";
      return "";

    case "password":
      if (value.length === 0) return "Password is required.";
      return "";

    default:
      return "";
  }
};


export {signupValidation,loginValidation};