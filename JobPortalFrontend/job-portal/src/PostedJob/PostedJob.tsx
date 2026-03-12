import { Tabs } from "@mantine/core";
import { activeJobs, drafts } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [openTab, setOpenTab] = useState<string | null>("OPEN");
  console.log("jobList:", props.jobList); 

useEffect(() => {
  if (props.job?.jobStatus) {
    setOpenTab(props.job.jobStatus);
  }
}, [props.job?.jobStatus]);

  return (
    <div className="w-1/6 mt-4">
      <div className="text-2xl font-semibold mb-5">Posted Jobs</div>

      <Tabs autoContrast variant="pills" value={openTab} onChange={setOpenTab}>
        <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
          <Tabs.Tab value="OPEN">Open [{props.jobList
    ?.filter((job: any) => job?.jobStatus?.toUpperCase() === "OPEN").length}]</Tabs.Tab>
          <Tabs.Tab value="DRAFT">Drafts [{props.jobList
    ?.filter((job: any) => job?.jobStatus?.toUpperCase() === "DRAFT").length}]</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className="flex flex-col flex-wrap mt-5 gap-5">
    {
  props.jobList
    ?.filter((job: any) => job?.jobStatus?.toUpperCase() === openTab)
    .map((item: any, index: number) => (
      <PostedJobCard key={index} {...item} />
    ))
}
      </div>
    </div>
  );
};

export default PostedJob;