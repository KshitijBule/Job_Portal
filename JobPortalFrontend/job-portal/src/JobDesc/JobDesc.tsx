import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconAdjustments, IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
import  DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
//@ts-ignore

const JobDesc =(props:any)=>{
  const [applied, setApplied] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const data = DOMPurify.sanitize(props.description);
  const user = useSelector((state:any)=>state.user);

  const handleSave = (id: string) => {
    
    let savedJobs: string[] = Array.isArray(profile.savedJobs) ? profile.savedJobs : [];
  
    if (savedJobs.includes(id)) {
      
      savedJobs = savedJobs.filter((jobId) => jobId !== id);
      console.log("Unsaved job:", id);
    } else {
      
      savedJobs = [...savedJobs, id];
      console.log("Saved job:", id);
    }
  
    const updatedProfile = { ...profile, savedJobs };
    dispatch(changeProfile(updatedProfile));
  };
  
    const handleUnsave = (id: string) => {
      let savedJobs = profile.savedJobs || [];
      savedJobs = savedJobs.filter((jobId: string) => jobId !== id);
  
      const updatedProfile = { ...profile, savedJobs };
      dispatch(changeProfile(updatedProfile));
  
      console.log("Unsaved job:", id);
    };

    const handleClose = () => {
      postJob({ ...props, jobStatus: "CLOSED" }).then((res)=>{
        successNotification("Success","Job Closed Successfully");
      }).catch((err)=>{
        errorNotification("Error","Failed to close job");
      })
  
    }

    useEffect(()=>{
        if(props.applicants?.filter((applicant:any)=>applicant.applicantId==user.id).length>0){
          setApplied(true);
        }
        else setApplied(false);
    },[props])

  return <div className="w-2/3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div>
                <div className="font-semibold text-xl">{props.jobTitle}</div>
                <div className="text-lg text-mine-shaft-300">{props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants?props.applicants.length:0} Applicants</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              {props.edit && !props.closed? <Button color="red.5" size="sm" variant="outline" onClick={handleClose}>Close</Button>:profile.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            className="cursor-pointer text-bright-sun-400"
            onClick={() => handleUnsave(props.id)}
          />
        ) : (
          <IconBookmark
            className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
            onClick={() => handleSave(props.id)}
          />
        )}

              {(props.edit || !applied) &&<Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
              <Button color="yellow.5" size="sm" variant="light">{props.closed?"Reopen":props.edit?"Edit":"Apply"}</Button>
              </Link>}
              {
                applied &&<Button color="green.8" size="sm" variant="light">Applied</Button>
              }

            </div>
            
              
            
        </div> 
        <Divider my="xl"/>
        
        <div className="flex justify-between">
          {
             card.map((item:any, index:number)=><div key ={index}className="flex flex-col items-center gap-1">
            <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
            <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">{props?props[item.id]:"NA"} {item.id=="packageOffered" && <>LPA</>}</div>

          </div>)
          }
          </div>
          <Divider my="xl"/>
          <div>
            <div className="text-xl font-semibold mb-5">Required Skills</div>
            <div className="flex flex-wrap gap-2">
              {
                props?.skillRequired?.map((skill:any,index:number)=><ActionIcon key={index} color="brightSun.4" className="!h-fit !text-sm !font-medium !w-fit" variant="light" p="xs" radius="xl" aria-label="Settings">{skill}
            </ActionIcon>)
              }
              
            </div>
            </div>  

            <Divider my="xl"/>
            <div className="[&_h4]:text-xl  [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:mb-1 [&_li]:marker:text-bright-sun-400" dangerouslySetInnerHTML={{__html:data}}>

            </div>
            <Divider my="xl"/>

            <div>
              <div className="text-xl font-semibold mb-5">{props.company}</div>
              <div>
                <div className="flex justify-between mb-3">
            <div className="flex gap-3 items-center">
              <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div>
                <div className="font-medium text-lg">{props.company}</div>
                <div className="text-sm text-mine-shaft-300">10K+ Employees</div>
              </div>
            </div>
            
              
              {/* <Link to={`/company/${props.company}`}>
              <Button color="yellow.5" size="sm" variant="light">Company Page</Button>
              </Link> */}
              </div> 
              <div className="text-mine-shaft-300 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quos fugit aliquid corrupti debitis natus quaerat ut iste veniam a temporibus est qui deserunt animi ipsa saepe, dolor assumenda velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, maxime?</div>
              </div>
            </div>

  </div>
}
export default JobDesc;