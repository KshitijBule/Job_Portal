import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      {/* <Link className="my-5 inline-block" to="/jobs"> */}
      <Divider size="xs"/>
        <Button
        my="md"
        onClick={()=>navigate(-1)}
          leftSection={<IconArrowLeft size={20} />}
          color="yellow.5"
          variant="light"
        >
          Back
        </Button>
      {/* </Link> */}

      <ApplyJobComp {...job}/>
    </div>
  );
};

export default ApplyJobPage;