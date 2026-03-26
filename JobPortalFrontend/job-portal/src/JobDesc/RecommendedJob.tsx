import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

const RecommendedJob = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="w-1/3">
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex bs:flex-col flex-wrap gap-5 bs-mx:justify-start">
        {jobList?.map((job: any, index: number) =>
          index < 5 && id != job.id ? <JobCard key={index} {...job} /> : null
        )}
      </div>
    </div>
  );
};

export default RecommendedJob;