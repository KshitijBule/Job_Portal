import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import { changeProfile } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../Services/Utilities";

const Card =(props:any)=>{

   const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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

  return <div className="bg-mine-shaft-900 p-4 w-full flex flex-col gap-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(252,196,25,0.35)] cursor-pointer">



        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-md">
                <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div>
                <div className="font-semibold">{props.jobTitle}</div>
                <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants?props.applicants.length:0} applicants</div>
              </div>
            </div>
            
             {profile.savedJobs?.includes(props.id) ? (
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
            
        </div>
        
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
          <div>{props.experience}</div>
          <div>{props.jobType}</div>
          <div>{props.location}</div>
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
  {props.about}
</Text>
        <Divider  size="xs" color="mineShaft.7"/>
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">{props.packageOffered} LPA</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
           <IconClockHour3 className="h-5 w-5" stroke={1.5}/>{props.applied || props.interviewing?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)} 
          </div>
        </div>
        {
          props.offered && <div className="flex gap-3">
            <Button color="yellow.5" variant="outline" fullWidth>Accept</Button>
            <Button color="yellow.5" variant="light" fullWidth>Reject</Button>
          </div>
        }

        {
          props.interviewing && <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
    <IconCalendarMonth className="text-bright-sun-400 w-5 h-5" stroke={1.5}/> July 27, 2024 10:00 AM
  </div>
        }
        <Button
        size="xs"
        variant="light"
        color="yellow.5"
        className=""
        onClick={() => navigate(`/jobs/${props.id}`)}
      >
        View Job
      </Button>

    </div>
  
}
export default Card;