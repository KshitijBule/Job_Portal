import { IconBookmark, IconCalendarMonth, IconClockHour3, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { DateInput, DateValue, TimeInput } from "@mantine/dates";
import { useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard =(props:any)=>{
  const {id} = useParams();
  const [opened, {open,close}] = useDisclosure(false);
  const [date, setDate] = useState<DateValue>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [profile, setProfile] = useState<any>(null);
  // const profile=useSelector((state:any)=>state.profile);

const handleOffer = (status: string) => {

  let interview:any = {
    id,
    applicantId: profile?.id,
    applicationStatus: status
  };

  if(status === "INTERVIEWING"){

    if(!date || !time){
      errorNotification("Missing Data","Please select date and time");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const interviewDate = new Date(date);
    interviewDate.setHours(hours, minutes);

    interview = {
      ...interview,
      interviewTime: interviewDate
    };
  }

  changeAppStatus(interview)
    .then((res)=>{

      if(status === "INTERVIEWING"){
        successNotification("Interview Scheduled","Interview scheduled successfully");
      }
      else if(status === "OFFERED"){
        successNotification("Candidate Accepted","Offer marked successfully");
      }
      else if(status === "REJECTED"){
        successNotification("Candidate Rejected","Application rejected successfully");
      }

      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
      errorNotification("Error", err.response.data.errorMessage);
    });
};

  useEffect(() => {
  if (props.applicantId !== undefined && props.applicantId !== null) {
    getProfile(props.applicantId)
      .then((res) => {
        console.log("PROFILE RESPONSE:", res);
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setProfile(props);
  }
}, [props]);



   
  return <div className="bg-mine-shaft-900 p-4 w-full flex flex-col gap-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(252,196,25,0.35)] cursor-pointer">



        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-full">
                <Avatar size="lg" src={
    profile?.picture
      ? `data:image/png;base64,${profile?.picture}`
      : "/Avatar.png"
  } alt="" />
              </div>
              <div>
                <div className="font-semibold text-lg">{profile?.name}</div>
                <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &#x2022; {profile?.company}</div>
              </div>
            </div>
            
              <IconHeart className="text-mine-shaft-300 cursor-pointer"/>
            
        </div>
        
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
          {
            profile?.skills?.map((skill:any,index:any)=>index<4 &&<div key={index} >{skill}</div>)
          }
        
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
  {profile?.about}
</Text>
        <Divider  size="xs" color="mineShaft.7"/>
       {
  props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
    <IconCalendarMonth stroke={1.5}/> Interview : {formatInterviewTime(props.interviewTime)}
  </div>:<div className="flex justify-between">
  {/* <div className="font-semibold text-mine-shaft-200">{props.expectedCtc}</div> */}
  <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
    <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}
  </div>
</div>
}





        
        <Divider color="mineShaft.7" size="xs"/>
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">

        {
          !props.invited && <>
          <Link to={`/talent-profile/${profile?.id}`}>
         <Button color="yellow.5" variant="outline" fullWidth>Profile</Button>

          </Link>

          <div>
           {props.posted?<Button onClick= {open} rightSection={<IconCalendarMonth className="w-5 h-5"/>} color="yellow.5" variant="light" fullWidth>Schedule</Button>:<Button color="yellow.5" variant="light" fullWidth>Message</Button>}




          </div>
          </>
        }

        {
          props.invited && <>
          <div><Button color="yellow.5"
          onClick={()=>handleOffer("OFFERED")} 
          variant="outline" fullWidth>Accept</Button></div>
          <div><Button color="yellow.5"
           onClick={()=>handleOffer("REJECTED")}  variant="light" fullWidth>Reject</Button></div>
          </>
        }

          
          
          
        </div>

         {(props.invited || props.posted)&&<Button color="yellow.5" variant="filled" fullWidth onClick={openApp} autoContrast>View  Application</Button>}
          <Modal opened={app} onClose={closeApp} title="Schedule Interview" centered>
          <div className="flex flex-col gap-4">
            <div>
  Email: &emsp;
  <a
    className="text-bright-sun-400 hover:underline cursor-pointer text-center"
    href={`mailto:${profile?.email || props.email}`}
  >
    {profile?.email || props.email}
  </a>
</div>

<div>
  Website: &emsp;
  <a
    target="_blank"
    className="text-bright-sun-400 hover:underline cursor-pointer text-center"
    href={props.website}
  >
    {props.website}
  </a>
</div>

<div>
  Resume: &emsp;
  <span
    
    className="text-bright-sun-400 hover:underline cursor-pointer text-center"
    onClick={()=>openBase64PDF(props.resume)}>{props.name}
   
  
    View Resume
  </span>
</div>
            

          </div>
        </Modal>



        <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
          <div className="flex flex-col gap-4">

          




             <DateInput
              value={date}
              minDate={new Date()}
              onChange={setDate}
              label="Date"
              placeholder="Enter Date"
              />
              <TimeInput
               label="Time"
               ref={ref}
               value = {time}
               onChange={(event)=>setTime(event.currentTarget.value)}
               onClick={() => ref.current?.showPicker()}
  
              />
              <Button onClick={()=>handleOffer("INTERVIEWING")} color="yellow.5" variant="light" fullWidth>Schedule</Button>

          </div>
        </Modal>

    </div>
  
}
export default TalentCard;