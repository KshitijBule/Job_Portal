import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [openTab, setOpenTab] = useState<string | null>("OPEN");

  useEffect(() => {
    if (props.job?.jobStatus) {
      setOpenTab(props.job.jobStatus);
    }
  }, [props.job?.jobStatus]);

  return (
    <div className="w-1/6 mt-4 max-sm:w-full max-sm:px-4">
      <div className="text-2xl font-semibold mb-5">Posted Jobs</div>

      <Tabs autoContrast variant="pills" value={openTab} onChange={setOpenTab}>
        <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium max-sm:grid max-sm:grid-cols-3">
          <Tabs.Tab value="OPEN" className="max-sm:text-xs max-sm:px-1 max-sm:justify-center">
            Open [{props.jobList?.filter((job: any) => job?.jobStatus?.toUpperCase() === "OPEN").length}]
          </Tabs.Tab>
          <Tabs.Tab value="DRAFT" className="max-sm:text-xs max-sm:px-1 max-sm:justify-center">
            Drafts [{props.jobList?.filter((job: any) => job?.jobStatus?.toUpperCase() === "DRAFT").length}]
          </Tabs.Tab>
          <Tabs.Tab value="CLOSED" className="max-sm:text-xs max-sm:px-1 max-sm:justify-center">
            Closed [{props.jobList?.filter((job: any) => job?.jobStatus?.toUpperCase() === "CLOSED").length}]
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className="flex flex-col mt-5 gap-5">
        {props.jobList
          ?.filter((job: any) => job?.jobStatus?.toUpperCase() === openTab)
          .map((item: any, index: number) => (
            <PostedJobCard key={index} {...item} />
          ))}
      </div>
    </div>
  );
};

export default PostedJob;