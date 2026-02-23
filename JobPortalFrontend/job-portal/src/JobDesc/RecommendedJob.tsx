import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const RecommendedJob = () => {
  return (
    <div className="w-1/3">
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList.map(
          (job, index) => index < 5 && <JobCard key={index} {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJob;
