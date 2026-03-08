import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { ApplyJob } from "../Services/JobService";
import { useSelector } from "react-redux";



const ApplicationForm=()=>{
  const {id} = useParams();
  const profile = useSelector((state:any)=>state.profile);
  const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const navigate = useNavigate();

  const handlePreview = () => {
    form.validate();
    window.scrollTo({top:0, behavior:'smooth'})
    if(!form.isValid()) return;
    setPreview(!preview);
    console.log(form.getValues());
  };

const handleSubmit = async () => {
  setSubmit(true);

  try {
    const resumeFile = form.getValues().resume;
    if (!resumeFile) {
      errorNotification("Error", "Please upload a resume before submitting");
      setSubmit(false);
      return;
    }

    const resumeBase64: string = await getBase64(resumeFile);
    const resumeContent = resumeBase64.includes(",")
      ? resumeBase64.split(",")[1]
      : resumeBase64;

    const applicant = {
  ...form.getValues(),
  applicantId: profile.id,
  resume: resumeContent
};

    await ApplyJob(id, applicant);   

    setSubmit(false);
    successNotification("Success", "Application Submitted Successfully");
    navigate("/job-history")
  } catch (err: any) {
    setSubmit(false);
    errorNotification("Error", err?.response?.data?.errorMessage || "Something went wrong");
  }
};

  const form = useForm({
  initialValues: {
    name:'',
    email:'',
    phone: '',
    // website: '',
    resume: null,
    coverLetter: ''
  },
  validate: {
    name: isNotEmpty('Name cannot be empty'),
    email: isNotEmpty('Email cannot be empty'),
    phone: isNotEmpty('Phone cannot be empty'),
    // website: isNotEmpty('Website cannot be empty'),
    resume: isNotEmpty('Resume cannot be empty'),
  }
});

  return <div>
    <LoadingOverlay
    className="!fixed"
     visible={submit}
     zIndex={1000}
     overlayProps={{ radius: "sm", blur: 2 }}
     loaderProps={{ color: "yellow", type: "bars" }}
     />
    <div className="text-xl font-semibold mb-5">
        Submit Your Application
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-200 font-semibold" : ""}
            label="Full Name"
            withAsterisk
            placeholder="Enter Full Name"
          />
          <TextInput
          {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-200 font-semibold" : ""}
            label="Email"
            withAsterisk
            placeholder="Enter Email"
          />
        </div>

        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
          {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-200 font-semibold" : ""}
            label="Phone Number"
            withAsterisk
            placeholder="Enter Phone Number"
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
          />
          <TextInput
          {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-200 font-semibold" : ""}
            label="Personal Portfolio"
            placeholder="Enter URL"
          />
        </div>

        <FileInput
        {...form.getInputProps("resume")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={preview ? "text-mine-shaft-200 font-semibold" : ""}
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          withAsterisk
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        />

        <Textarea
        {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={preview ? "text-mine-shaft-200 font-semibold" : ""}
          placeholder="Enter something about yourself"
          label="Cover Letter"
          withAsterisk
          autosize
          minRows={4}
        />

        {!preview && (
          <Button
           type="button"
           onClick={handlePreview}
           color="yellow.5"
           variant="light"
            >
           Preview
          </Button>
        )}

        {preview && 
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
            type="button"
            fullWidth
            onClick={handlePreview}
            color="yellow.5"
            variant="light"
            >
            Edit
           </Button>

            <Button 
            fullWidth 
            color="yellow.2"  
            variant="outlined"
            onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        }
      </div>
  </div>
}
export default ApplicationForm;


