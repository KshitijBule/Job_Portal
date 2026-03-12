import { Divider } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.profile);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?.id) {
      getJobPostedBy(user.id)
        .then((res) => {
          setJobList(res);
          if(res && res.length>0 &&Number(id)==0) navigate(`/posted-job/${res[0].id}`);
          const selectedJob = res.find((item: any) => item.id === Number(id));
          setJob(selectedJob || null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, user]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <Divider size="xs" />
      <div className="flex gap-5 mt-3">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;