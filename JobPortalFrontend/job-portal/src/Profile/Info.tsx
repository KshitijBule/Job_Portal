import { useState, useEffect } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";

interface InfoProps {
  name: string;
}

const Info = ({ name }: InfoProps) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    jobTitle: "",
    company: "",
    location: "",
  });

  // Sync with Redux profile
  useEffect(() => {
    if (profile) {
      setBasicInfo({
        jobTitle: profile.jobTitle || "",
        company: profile.company || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleEdit = async () => {
    if (edit) {
      try {
        const updatedProfile = {
          ...profile,
          jobTitle: basicInfo.jobTitle,
          company: basicInfo.company,
          location: basicInfo.location,
        };

        const res = await updateProfile(updatedProfile);

        dispatch(setProfile(res));

        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Failed to update profile", error);
      }
    }

    setEdit(!edit);
  };

  return (
    <div className="px-3 mt-20">
      {/* NAME + EDIT */}
      <div className="text-3xl font-semibold flex justify-between">
        {name}
        <ActionIcon
          onClick={handleEdit}
          size="lg"
          color="yellow.5"
          variant="subtle"
        >
          {edit ? (
            <IconDeviceFloppy className="h-4/5 w-4/5" />
          ) : (
            <IconPencil className="h-4/5 w-4/5" />
          )}
        </ActionIcon>
      </div>

      {/* BASIC INFO */}
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2 mt-4">
            <SelectInput
              {...select[0]}
              value={basicInfo.jobTitle}
              onChange={(val) =>
                setBasicInfo({ ...basicInfo, jobTitle: val || "" })
              }
            />

            <SelectInput
              {...select[1]}
              value={basicInfo.company}
              onChange={(val) =>
                setBasicInfo({ ...basicInfo, company: val || "" })
              }
            />
          </div>

          <TextInput
            mt="md"
            label="Location"
            value={basicInfo.location}
            onChange={(e) =>
              setBasicInfo({
                ...basicInfo,
                location: e.currentTarget.value,
              })
            }
          />
        </>
      ) : (
        <>
          <div className="text-xl flex gap-1 items-center mt-4">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {basicInfo.jobTitle} &bull; {basicInfo.company}
          </div>

          <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {basicInfo.location}
          </div>
        </>
      )}
    </div>
  );
};

export default Info;