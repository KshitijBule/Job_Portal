import {
  Button,
  Divider,
  FileInput,
  LoadingOverlay,
  NumberInput,
  rem,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { Notification } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { useForm } from "@mantine/form";
import { timeAgo } from "../Services/Utilities";



const ApplyJobComp = (props:any) => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();

  // const handlePreview = () => {
  //   setPreview(!preview);
  //   window.scrollTo({top:0, behavior:'smooth'})
  // };

  // const handleSubmit=()=>{
  //   setSubmit(true);
  //   let x = 5;
  //   setInterval(()=>{
  //       x--;
  //       setSec(x);
  //       if(x==0){
  //         navigate('/find-jobs')
  //       }

  //   },1000)
  // }

  

  return  <div className="w-2/3 mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants?props.applicants.length:0}  Applicants
            </div>
          </div>
        </div>
      </div>

      <Divider my="xl" />
      <ApplicationForm/>

      
    </div>
   
};

export default ApplyJobComp;
