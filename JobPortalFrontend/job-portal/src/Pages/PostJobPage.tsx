import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import PostJob from "../PostJob/PostJob";



const PostJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <Divider size="xs" />
      <PostJob/>
    </div>
  );
};

export default PostJobPage;
