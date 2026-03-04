import { useState, useEffect } from "react";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconDeviceFloppy, IconPencil } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";

const Skills = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);

  // Sync skills with redux profile
  useEffect(() => {
    if (profile) {
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const handleEdit = async () => {
    if (edit) {
      try {
        const updatedProfile = {
          ...profile,
          skills: skills,
        };

        const res = await updateProfile(updatedProfile);

        dispatch(setProfile(res));

        console.log("Skills updated successfully");
      } catch (error) {
        console.error("Failed to update skills", error);
      }
    }

    setEdit(!edit);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills

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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skills"
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill: string, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;