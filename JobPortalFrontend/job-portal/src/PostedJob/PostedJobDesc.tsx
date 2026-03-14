import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";


const PostedJobDesc =(props:any)=>{
  return <div className="mt-5 w-3/4 px-5">
      {props.jobTitle?<><div className="text-2xl font-semibold flex items-center">{props.jobTitle}<Badge size="sm" ml="sm" variant="light" color="brightSun.4">{props.jobStatus}</Badge> </div>

      <div className="font-medium text-mine-shaft-300 mb-5">{props.location}</div>

      <div>
         <Tabs variant="outline" radius="lg" defaultValue="overview">
            <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
              <Tabs.Tab value="invited">Invited</Tabs.Tab>
              <Tabs.Tab value="offered">Offered</Tabs.Tab>
              <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
            </Tabs.List>

           <Tabs.Panel value="overview" className="[&>div]:w-full"><JobDesc {...props} edit={true} closed={props.jobStatus=="CLOSED"} /></Tabs.Panel>

            <Tabs.Panel value="applicants">
              <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {
  props.applicants
    ?.filter((x: any) => x.applicationStatus === "APPLIED")
    .map((talent: any, index: any) =>
      index < 6 && <TalentCard key={index} {...talent} posted />
    )
}


      
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="invited">
              <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {props.applicants
    ?.filter((x: any) => x.applicationStatus === "INTERVIEWING")
    .map((talent: any, index: any) =>index<6&&(<TalentCard key={index} {...talent} invited/>))}


      
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="offered">
  <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    {props.applicants
      ?.filter((x: any) => x.applicationStatus === "OFFERED")
      .map((talent: any, index: any) =>
        index < 6 && <TalentCard key={index} {...talent} invited />
      )}
  </div>
</Tabs.Panel>

<Tabs.Panel value="rejected">
  <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    {props.applicants
      ?.filter((x: any) => x.applicationStatus === "REJECTED")
      .map((talent: any, index: any) =>
        index < 6 && <TalentCard key={index} {...talent} invited />
      )}
  </div>
</Tabs.Panel>
          </Tabs>
      </div>
      </>:<div className="text-2xl font-semibold flex justify-center item-center">No Job Selected</div>}
  </div>
}
export default PostedJobDesc;