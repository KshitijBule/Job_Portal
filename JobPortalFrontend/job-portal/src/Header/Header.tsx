import { Avatar, Button, Indicator } from "@mantine/core";
import { IconBell, IconHierarchy2, IconSettings, IconUsers} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";

const Header =()=>{
  const location = useLocation();
  const user =useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  const profile = useSelector((state:any)=>state.profile)
const navigate = useNavigate();

useEffect(() => {
  setupResponseInterceptor(navigate,dispatch);
  const token = localStorage.getItem("token");

  if (!token) return;

  const decoded: any = jwtDecode(token);

  dispatch(setUser({
    id: decoded.id,
    email: decoded.sub
  }));

}, []);
useEffect(() => {
  if (!user?.id) return;

  getProfile(user.id)
    .then((data: any) => {
      dispatch(setProfile(data));
    })
    .catch((error: any) => {
      console.log(error);
    });

}, [user]);

  return location.pathname!="/signup" && location.pathname!="/login"?<div className="w-full h-20 bg-mine-shaft-950 font-['poppins'] px-6 text-white flex justify-between items-center">
    <div className="flex gap-3 items-center text-bright-sun-400 ">
      <IconHierarchy2 className="h-9 w-10" stroke={2.5}/>
      <div className="text-4xl font-bold font-['poppins']">HireME</div>
    </div>

    {NavLinks()}


    <div className="flex gap-5 items-center">
      
     {user?.id ? (
  <div className="flex items-center gap-3">
    
    {/* Name */}
    <span className="text-white font-medium">
      {profile?.name || "User"}
    </span>

    {/* Avatar + dropdown */}
    <ProfileMenu />

  </div>
) : (
  <Link to="/login">
    <Button variant="subtle" color="yellow.5">Login</Button>
  </Link>
)}
      {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <IconSettings stroke={1.5}/>
        </div> */}

      {user ? <NotiMenu/>:<></>}

        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="yellow" offset={5} processing size={9}>
            <IconBell stroke={1.5}/>
          </Indicator>
        
        </div> */}
      
      
      
      
    </div>
  </div>:<></>

}
export default Header;