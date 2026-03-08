import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllJobs } from "../Services/JobService";
import Card from "./Card";

const JobHistory = () => {
  const profile = useSelector((state: any) => state.profile);

  const [activeTab, setActiveTab] = useState<string>("APPLIED");
  const [jobList, setJobList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        console.log("Jobs data:", res);
        setJobList(res);

        const filtered = res.filter((job: any) =>
          job.applicants?.some(
            (applicant: any) =>
              String(applicant.applicantId) === String(profile.id) &&
              applicant.applicationStatus?.toUpperCase() === "APPLIED"
          )
        );

        setShowList(filtered);
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
      });
  }, [profile.id]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    setActiveTab(value);

    if (value === "SAVED") {
      setShowList(
        jobList.filter((job: any) =>
          profile.savedJobs?.map(String).includes(String(job.id))
        )
      );
    } else {
      setShowList(
        jobList.filter((job: any) =>
          job.applicants?.some(
            (applicant: any) =>
              String(applicant.applicantId) === String(profile.id) &&
              applicant.applicationStatus?.toUpperCase() === value
          )
        )
      );
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Job History</div>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="outline"
        radius="lg"
      >
        <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5">
          <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
          <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
          <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
          <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={activeTab}>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {showList.map((item: any, index: number) => (
              <Card
                key={index}
                {...item}
                {...{ [activeTab.toLowerCase()]: true }}
              />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistory;