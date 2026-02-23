import { IconBookmark, IconCalendarMonth, IconClockHour3, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { DateInput, DateValue, TimeInput } from "@mantine/dates";

const TalentCard =(props:any)=>{
  const [opened, {open,close}] = useDisclosure(false);
  const [value, setValue] = useState<DateValue>(null);
  const ref = useRef<HTMLInputElement>(null);

   
  return <div className="bg-mine-shaft-900 p-4 w-full flex flex-col gap-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(252,196,25,0.35)] cursor-pointer">



        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-full">
                <Avatar size="lg" src={`/${props.image}.png`} alt="" />
              </div>
              <div>
                <div className="font-semibold text-lg">{props.name}</div>
                <div className="text-sm text-mine-shaft-300">{props.role} &#x2022; {props.company}</div>
              </div>
            </div>
            
              <IconHeart className="text-mine-shaft-300 cursor-pointer"/>
            
        </div>
        
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
          {
            props.topSkills?.map((skill:any,index:any)=><div key={index} >{skill}</div>)
          }
        
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
  {props.about}
</Text>
        <Divider  size="xs" color="mineShaft.7"/>
       {
  props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
    <IconCalendarMonth stroke={1.5}/> Interview : August 27, 2024 10:00 AM
  </div>:<div className="flex justify-between">
  <div className="font-semibold text-mine-shaft-200">{props.expectedCtc}</div>
  <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
    <IconMapPin className="h-5 w-5" stroke={1.5} /> {props.location}
  </div>
</div>
}





        
        <Divider color="mineShaft.7" size="xs"/>
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">

        {
          !props.invited && <>
          <Link to="/talent-profile">
         <Button color="yellow.5" variant="outline" fullWidth>Profile</Button>

          </Link>

          <div>
           {props.posted?<Button onClick= {open} rightSection={<IconCalendarMonth className="w-5 h-5"/>} color="yellow.5" variant="light" fullWidth>Schedule</Button>:<Button color="yellow.5" variant="light" fullWidth>Message</Button>}




          </div>
          </>
        }

        {
          props.invited && <>
          <div><Button color="yellow.5" variant="outline" fullWidth>Accept</Button></div>
          <div><Button color="yellow.5" variant="light" fullWidth>Reject</Button></div>
          </>
        }

          
          
          
        </div>
        <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
          <div className="flex flex-col gap-4">
             <DateInput
              value={value}
              minDate={new Date()}
              onChange={setValue}
              label="Date"
              placeholder="Enter Date"
              />
              <TimeInput
               label="Time"
               ref={ref}
               onClick={() => ref.current?.showPicker()}
  
              />
              <Button color="yellow.5" variant="light" fullWidth>Schedule</Button>

          </div>
        </Modal>

    </div>
  
}
export default TalentCard;