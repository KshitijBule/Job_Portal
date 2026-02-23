import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconHierarchy2, IconSettings, IconUsers} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Header =()=>{
  const location = useLocation();

  return location.pathname!="/signup" && location.pathname!="/login"?<div className="w-full h-20 bg-mine-shaft-950 font-['poppins'] px-6 text-white flex justify-between items-center">
    <div className="flex gap-3 items-center text-bright-sun-400 ">
      <IconHierarchy2 className="h-9 w-10" stroke={2.5}/>
      <div className="text-4xl font-bold font-['poppins']">HireME</div>
    </div>

    {NavLinks()}


    <div className="flex gap-5 items-center">
      
      <ProfileMenu/>
      <div className="bg-mine-shaft-900 p-1.5 rounded-full">
        <IconSettings stroke={1.5}/>
        </div>

        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="yellow" offset={5} processing size={9}>
            <IconBell stroke={1.5}/>
          </Indicator>
        
        </div>
      
      
      
      
    </div>
  </div>:<></>

}
export default Header;