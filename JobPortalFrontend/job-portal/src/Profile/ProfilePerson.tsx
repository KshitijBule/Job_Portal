import {
  ActionIcon,
  Divider,
  Textarea,
  TextInput,
  TagsInput,
  Button,
  Card,
  Group,
  Avatar,
  Overlay,
  FileInput,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useRef, useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { DateInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certifications from "./Certifications";
import { useHover } from "@mantine/hooks";

const ProfilePerson = (props: any) => {
  const select = fields;
 

  const [edit, setEdit] = useState([false, false, false, false, false]);

  const handleEdit = (index: number) => {
    const updated = [...edit];
    updated[index] = !updated[index];
    setEdit(updated);
  };
  const dispatch = useDispatch();

  const user = useSelector((state:any)=>state.user);
  const profile = useSelector((state:any)=>state.profile)

useEffect(() => {
  const id = user?.data?.id;
  if (id) {
    getProfile(id)
      .then((data: any) => {
        console.log(data);
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  } else {
    console.log("User ID not available yet");
  }
}, [user]);





  // -------------------- STATE --------------------

  const [basicInfo, setBasicInfo] = useState({
    role: props.role,
    company: props.company,
    location: props.location,
  });

  const [aboutText, setAboutText] = useState(props.about);

  const [skills, setSkills] = useState<string[]>(props.skills || []);

  const [experience, setExperience] = useState<any[]>(
    props.experience || []
  );

  const [certifications, setCertifications] = useState<any[]>(
    props.certifications || []
  );

 const handleSaveAbout = async (text: string) => {
  try {
    const updated = { ...profile, aboutText: text };
    const res = await updateProfile(updated);
    dispatch(setProfile(res));
  } catch (err) {
    console.error("Failed to save about section", err);
  }
};

const handleFileChange = async (file: File) => {
  if (!file) return;

  try {
    const base64 = await getBase64(file);
    const stripped = base64.replace(/^data:image\/\w+;base64,/, "");

    const updatedProfile = {
      ...profile,
      picture: stripped,
    };

    const res = await updateProfile(updatedProfile);
    dispatch(setProfile(res));
  } catch (err) {
    console.error("Image upload failed", err);
  }
};



const getBase64 = (file: any) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = (error) => reject(error);
  });
};


const { hovered, ref } = useHover();
const fileInputRef = useRef<HTMLInputElement | null>(null);



  // -------------------- UI --------------------


  if (!user || !user.data) {
    // User is logged out, render fallback
    return <div className="text-5xl text-red-600 font-bold text-center">Please log in to view your profile</div>;
  }

  return (
    <div className="w-4/5 mx-auto">
      {/* HEADER */}
      <div className="relative">
        {/* Banner */}
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="Profile banner" />

        <div
  ref={ref}
  className="absolute -bottom-1/3 left-3 flex items-center justify-center group cursor-pointer"
  onClick={() => fileInputRef.current?.click()}
>
  <Avatar
    className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
    src={
    profile?.picture
      ? `data:image/png;base64,${profile.picture}`
      : "/Avatar.png"
  }
    alt="Profile avatar"
  />

  {/* Overlay */}
  <Overlay
    className="!rounded-full opacity-0 group-hover:opacity-75 transition-opacity"
    color="#000"
    backgroundOpacity={0.75}
  />

  {/* Edit icon */}
  <IconEdit className="absolute z-[300] !w-16 !h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />

  {/* Hidden File Input */}
  <input
  ref={fileInputRef}
  type="file"
  accept="image/png,image/jpeg"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  }}
/>
</div>

      
       
      </div>


      {/* INFO*/}

      <Info name={user.data.name} />

      <Divider my="xl" />

      {/* ABOUT */}
      <About />

      <Divider my="xl" />

      {/* SKILLS */}
      <Skills />

      <Divider my="xl" />

      {/* EXPERIENCE */}
      <Experience />

      <Divider my="xl" />

      {/* CERTIFICATIONS */}
      <Certifications />
 </div> 
  );
};

export default ProfilePerson;