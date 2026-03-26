import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";



const JobDescPage = () => {
  const {id}=useParams();
  const [job,setJob]=useState<any>(null);
  useEffect(()=>{
      window.scrollTo(0,0);
      getJob(Number(id)).then((res)=>{
        setJob(res);
      }).catch((err)=>{
        console.log(err);
      })
  }, [id])
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" />
      <Link className="my-5 inline-block" to="/find-jobs">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="yellow.5"
          variant="light"
        >
          Back
        </Button>
      </Link>

      <div className="flex gap-5 justify-around bs-mx:flex-wrap">
        <JobDesc {...job}/>
        <RecommendedJob/>
      </div>
    </div>
  );
};

export default JobDescPage;
