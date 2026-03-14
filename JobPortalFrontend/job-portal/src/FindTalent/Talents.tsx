import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import { talents } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useSelector } from "react-redux";

// filter are here search filter algorithm
const Talents=()=>{
  const [talents,setTalents] = useState<any>([]);
  const filter=useSelector((state:any)=>state.filter);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);

  useEffect(()=>{
    getAllProfiles().then((res)=>{
      setTalents(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

 useEffect(() => {
  let filterTalent = talents;
  console.log(filter);

  
  if (filter.name) {
    filterTalent = filterTalent.filter((talent: any) =>
      talent.name?.toLowerCase().includes(filter.name.toLowerCase())
    );
  }

  
  if (filter["Job Title"] && filter["Job Title"].length > 0) {
    filterTalent = filterTalent.filter((talent: any) =>
      filter["Job Title"].some((title: any) =>
        talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
      )
    );
  }

  
  if (filter.Location && filter.Location.length > 0) {
    filterTalent = filterTalent.filter((talent: any) =>
      filter.Location.some((loc: any) =>
        talent.location?.toLowerCase().includes(loc.toLowerCase())
      )
    );
  }

  
  if (filter.Skills && filter.Skills.length > 0) {
    filterTalent = filterTalent.filter((talent: any) =>
      talent.skills?.some((skill: any) =>
        filter.Skills.includes(skill)
      )
    );
  }

  setFilteredTalents(filterTalent);

}, [filter, talents]);


  return <div className="p-5">
    <div className="flex justify-between">
      <div className="text-2xl font-semibold">Talents</div>
      
    </div>
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTalents.map((talent:any,index:any)=>(<TalentCard key={index} {...talent}/>))}


      
    </div>
   </div>
}
export default Talents;