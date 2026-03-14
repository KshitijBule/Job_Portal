import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState<any[]>([]);
  const filter=useSelector((state:any)=>state.filter);
  const [filteredJobs, setFilteredJobs] = useState<any>([]);
  const sort = useSelector((state:any)=>state.sort);

  useEffect(() => {
    dispatch(resetFilter())
    dispatch(resetSort());
    getAllJobs()
      .then((res) => {
        const activeJobs = res.filter((job: any) => job.jobStatus === "OPEN");
        setJobList(activeJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

useEffect(() => {

  if (sort === "Most Recent") {
    setFilteredJobs(
      [...filteredJobs].sort(
        (a: any, b: any) =>
          new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
      )
    );
  }

  else if (sort === "Salary: Low to High") {
    setFilteredJobs(
      [...filteredJobs].sort(
        (a: any, b: any) => a.packageOffered - b.packageOffered
      )
    );
  }

  else if (sort === "Salary: High to Low") {
    setFilteredJobs(
      [...filteredJobs].sort(
        (a: any, b: any) => b.packageOffered - a.packageOffered
      )
    );
  }

}, [sort]);


useEffect(() => {

  let filterTalent = jobList;
  console.log(filter);

  // Job Title
  if (filter["Job Title"] && filter["Job Title"].length > 0) {
    filterTalent = filterTalent.filter((job: any) =>
      filter["Job Title"].some((title: any) =>
        job.jobTitle?.toLowerCase().includes(title.toLowerCase())
      )
    );
  }

  // Location
  if (filter.Location && filter.Location.length > 0) {
    filterTalent = filterTalent.filter((job: any) =>
      filter.Location.some((loc: any) =>
        job.location?.toLowerCase().includes(loc.toLowerCase())
      )
    );
  }

  // Experience
  if (filter.Experience && filter.Experience.length > 0) {
    filterTalent = filterTalent.filter((job: any) =>
      filter.Experience.some((exp: any) =>
        job.experience?.toString().includes(exp.toString())
      )
    );
  }

  // Job Type
  if (filter["Job Type"] && filter["Job Type"].length > 0) {
    filterTalent = filterTalent.filter((job: any) =>
      filter["Job Type"].some((type: any) =>
        job.jobType?.toLowerCase().includes(type.toLowerCase())
      )
    );
  }

  // Salary Range
 if (filter.salary && filter.salary.length > 0) {
  filterTalent = filterTalent.filter(
    (job: any) =>
      job.packageOffered >= filter.salary[0] &&
      job.packageOffered <= filter.salary[1]
  );
}

  setFilteredJobs(filterTalent);

}, [filter, jobList]);


  return (
    <div className="p-5">

      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          filteredJobs.map((job:any, index:any) => (
            <JobCard key={index} {...job} />
          ))
        }
      </div>

    </div>
  );
};

export default Jobs;