import { useState, useEffect } from "react";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import ExpCard from "./ExpCard";

const Experience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    if (profile) {
      setExperience(profile.experiences || []);
    }
  }, [profile]);

  const handleEdit = async () => {
    if (edit) {
      try {
        const formattedExp = experience.map((exp) => ({
          ...exp,
          startDate: exp.startDate
            ? new Date(exp.startDate).toISOString()
            : null,
          endDate: exp.endDate
            ? new Date(exp.endDate).toISOString()
            : null,
        }));

        const updatedProfile = {
          ...profile,
          experiences: formattedExp,
        };

        const res = await updateProfile(updatedProfile);

        dispatch(setProfile(res));

        console.log("Experience saved");
      } catch (error) {
        console.error("Failed to update experience", error);
      }
    }

    setEdit(!edit);
  };

  const updateField = (index: number, field: string, value: any) => {
    setExperience((prev) =>
      prev.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Experience

        <ActionIcon
          onClick={handleEdit}
          size="lg"
          color="yellow.5"
          variant="subtle"
        >
          {edit ? <IconDeviceFloppy /> : <IconPencil />}
        </ActionIcon>
      </div>

      {edit && (
        <Button
          leftSection={<IconPlus size={16} />}
          mb="md"
          onClick={() =>
            setExperience([
              ...experience,
              {
                title: "",
                company: "",
                location: "",
                startDate: null,
                endDate: null,
                description: "",
              },
            ])
          }
        >
          Add Experience
        </Button>
      )}

      <div className="flex flex-col gap-6">
        {experience?.map((exp: any, index: number) =>
          edit ? (
            <Card key={index} shadow="sm" radius="md" withBorder>
              <Group grow>
                <TextInput
                  label="Job Title"
                  value={exp.title}
                  onChange={(e) =>
                    updateField(index, "title", e.currentTarget.value)
                  }
                />

                <TextInput
                  label="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateField(index, "company", e.currentTarget.value)
                  }
                />
              </Group>

              <TextInput
                mt="md"
                label="Location"
                value={exp.location}
                onChange={(e) =>
                  updateField(index, "location", e.currentTarget.value)
                }
              />

              <Group grow mt="md">
                <DateInput
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(value) =>
                    updateField(index, "startDate", value)
                  }
                />

                <DateInput
                  label="End Date"
                  value={exp.endDate}
                  onChange={(value) =>
                    updateField(index, "endDate", value)
                  }
                />
              </Group>

              <Textarea
                mt="md"
                label="Description"
                autosize
                minRows={3}
                value={exp.description}
                onChange={(e) =>
                  updateField(index, "description", e.currentTarget.value)
                }
              />

              <Button
                color="red"
                variant="light"
                mt="md"
                leftSection={<IconTrash size={16} />}
                onClick={() =>
                  setExperience((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                Remove
              </Button>
            </Card>
          ) : (
            <ExpCard key={index} {...exp} />
          )
        )}
      </div>
    </div>
  );
};

export default Experience;