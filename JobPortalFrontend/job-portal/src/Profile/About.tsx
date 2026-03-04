import { useState, useEffect } from "react";
import { ActionIcon, Textarea } from "@mantine/core";
import { IconDeviceFloppy, IconPencil } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";

const About = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState("");

  // Sync local state with redux profile
  useEffect(() => {
    if (profile) {
      setAbout(profile.about || "");
    }
  }, [profile]);

  // Save when exiting edit
  const handleEdit = async () => {
    if (edit) {
      try {
        const updatedProfile = {
          ...profile,
          about: about,
        };

        const res = await updateProfile(updatedProfile);

        dispatch(setProfile(res));

        console.log("About updated successfully");
      } catch (error) {
        console.error("Failed to update about", error);
      }
    }

    setEdit(!edit);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <ActionIcon
          onClick={handleEdit}
          size="lg"
          color="yellow.5"
          variant="subtle"
        >
          {edit ? <IconDeviceFloppy /> : <IconPencil />}
        </ActionIcon>
      </div>

      {edit ? (
        <Textarea
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
          autosize
          minRows={4}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {about || "No about info yet."}
        </div>
      )}
    </div>
  );
};

export default About;