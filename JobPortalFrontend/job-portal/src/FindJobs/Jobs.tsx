import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";

const Jobs=()=>{
  const [jobList, setJobList] = useState([{}]);
  useEffect(()=>{
    getAllJobs().then((res)=>{
      setJobList(res);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  return<div className="p-5">
    <div className="flex justify-between">
      <div className="text-2xl font-semibold">Recommended Jobs</div>
      <Sort/>
    </div>
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">



       {
      jobList.map((job,index)=> <JobCard key={index}{...job}/>)
    }
    </div>
   </div>
}
export default Jobs;