import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";



const JobDescPage = () => {
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

      <div className="flex gap-5 justify-around">
        <JobDesc/>
        <RecommendedJob/>
      </div>
    </div>
  );
};

export default JobDescPage;
