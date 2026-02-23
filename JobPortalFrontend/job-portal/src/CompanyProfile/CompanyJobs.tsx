import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs=()=>{
  return   <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">



       {
      jobList.map((job: any,index: any)=> <JobCard key={index}{...job}/>)
    }
    </div>

}
export default CompanyJobs;