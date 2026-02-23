import { Avatar, AvatarGroup, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
  
  return (

    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="w-36 h-36 border-mine-shaft-950 border-8 absolute -bottom-1/4 left-5 rounded-3xl bg-mine-shaft-950 p-2"
          src="/Icons/Google.png"
          alt=""
        />
      </div>

      <div className="px-3 mt-14">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <AvatarGroup>
            <Avatar src="avatar.png"/>
            <Avatar src="avatar1.png"/>
            <Avatar src="avatar2.png"/>
            <Avatar>+10K</Avatar>
          </AvatarGroup>
        </div>


        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          New York, USA
        </div>
      

      <Divider my="xl" />

        <div>
          <Tabs variant="outline" radius="lg" defaultValue="about">
            <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5">
              <Tabs.Tab value="about">About</Tabs.Tab>
              <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
              <Tabs.Tab value="employees">Employees</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
            <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
            <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
          </Tabs>

        </div>

      </div>
    </div>
  );
};

export default Company;
