import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentpage=()=>{
  return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
           <Divider  size="xs" />
           <SearchBar/>
           <Divider  size="xs" />
           <Talents/>
          
          </div>
          
        
      )
}
export default FindTalentpage ;