import { Divider } from "@mantine/core";
import MultiInput from "../FindJobs/MultiInput";
import SearchBar from "../FindJobs/SearchBar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Jobs from "../FindJobs/Jobs";

const FindJobs=()=>{
  return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
           <Divider  size="xs" />
          <SearchBar/>
          <Divider  size="xs" />
          <Jobs/>
          
          </div>
          
        
      )
}
export default FindJobs;