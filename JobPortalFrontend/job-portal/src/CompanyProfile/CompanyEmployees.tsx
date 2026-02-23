import { jobList } from "../Data/JobsData";
import { talents } from "../Data/TalentData";
import JobCard from "../FindJobs/JobCard";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees=()=>{
  return   <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {talents.map((talent,index)=>index<6&&(<TalentCard key={index} {...talent}/>))}


      
    </div>

}
export default CompanyEmployees;