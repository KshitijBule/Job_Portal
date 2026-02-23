import { jobList } from "../Data/JobsData";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";


const Talents=()=>{
  return<div className="p-5">
    <div className="flex justify-between">
      <div className="text-2xl font-semibold">Talents</div>
      <Sort/>
    </div>
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {talents.map((talent,index)=>(<TalentCard key={index} {...talent}/>))}


      
    </div>
   </div>
}
export default Talents;