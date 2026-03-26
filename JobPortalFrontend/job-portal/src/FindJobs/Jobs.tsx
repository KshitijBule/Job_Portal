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
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());

    getAllJobs()
      .then((res) => {
        const activeJobs = res.filter(
          (job: any) => job.jobStatus === "OPEN"
        );
        setJobList(activeJobs);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ FILTER LOGIC
  useEffect(() => {
    let filtered = jobList;

    if (filter["Job Title"]?.length) {
      filtered = filtered.filter((job: any) =>
        filter["Job Title"].some((title: any) =>
          job.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location?.length) {
      filtered = filtered.filter((job: any) =>
        filter.Location.some((loc: any) =>
          job.location?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    if (filter.Experience?.length) {
      filtered = filtered.filter((job: any) =>
        filter.Experience.some((exp: any) =>
          job.experience?.toString().includes(exp.toString())
        )
      );
    }

    if (filter["Job Type"]?.length) {
      filtered = filtered.filter((job: any) =>
        filter["Job Type"].some((type: any) =>
          job.jobType?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (filter.salary?.length) {
      filtered = filtered.filter(
        (job: any) =>
          job.packageOffered >= filter.salary[0] &&
          job.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(filtered);
  }, [filter, jobList]);

  // ✅ SORT LOGIC (Fix: use jobList instead of filteredJobs dependency bug)
  useEffect(() => {
    let sorted = [...filteredJobs];

    if (sort === "Most Recent") {
      sorted.sort(
        (a, b) =>
          new Date(b.postTime).getTime() -
          new Date(a.postTime).getTime()
      );
    } else if (sort === "Salary: Low to High") {
      sorted.sort((a, b) => a.packageOffered - b.packageOffered);
    } else if (sort === "Salary: High to Low") {
      sorted.sort((a, b) => b.packageOffered - a.packageOffered);
    }

    setFilteredJobs(sorted);
  }, [sort]);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xl sm:text-2xl font-semibold">
          Recommended Jobs
        </div>
        <Sort />
      </div>

      {/* JOB GRID */}
      <div className="mt-8 sm:mt-10 grid gap-5 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      xl:grid-cols-4">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job: any, index: number) => (
            <JobCard key={index} {...job} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No jobs found
          </div>
        )}

      </div>

    </div>
  );
};

export default Jobs;