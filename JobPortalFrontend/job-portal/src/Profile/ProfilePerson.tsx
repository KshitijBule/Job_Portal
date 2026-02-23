import {
  ActionIcon,
  Divider,
  Textarea,
  TextInput,
  TagsInput,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";

const ProfilePerson = (props: any) => {
  const select = fields;

  const [edit, setEdit] = useState([false, false, false, false, false]);

  const handleEdit = (index: number) => {
    const updated = [...edit];
    updated[index] = !updated[index];
    setEdit(updated);
  };

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

  // -------------------- UI --------------------

  return (
    <div className="w-4/5 mx-auto">
      {/* HEADER */}
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="/avatar.png"
          alt=""
        />
      </div>

      <div className="px-3 mt-20">
        {/* NAME + EDIT */}
        <div className="text-3xl font-semibold flex justify-between">
          {props.name}
          <ActionIcon
            onClick={() => handleEdit(0)}
            size="lg"
            color="yellow.5"
            variant="subtle"
          >
            {edit[0] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>

        {/* BASIC INFO */}
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2 mt-4">
              <SelectInput
                {...select[0]}
                value={basicInfo.location}
                onChange={(val) =>
                  setBasicInfo({ ...basicInfo, location: val })
                }
              />

              <SelectInput
                {...select[1]}
                value={basicInfo.role}
                onChange={(val) =>
                  setBasicInfo({ ...basicInfo, role: val })
                }
              />
            </div>

            <TextInput
              mt="md"
              label="Company"
              value={basicInfo.company}
              onChange={(e) =>
                setBasicInfo({
                  ...basicInfo,
                  company: e.currentTarget.value,
                })
              }
            />
          </>
        ) : (
          <>
            <div className="text-xl flex gap-1 items-center mt-4">
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {basicInfo.role} &bull; {basicInfo.company}
            </div>

            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              {basicInfo.location}
            </div>
          </>
        )}
      </div>

      <Divider my="xl" />

      {/* ABOUT */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <ActionIcon
            onClick={() => handleEdit(1)}
            size="lg"
            color="yellow.5"
            variant="subtle"
          >
            {edit[1] ? (
              <IconDeviceFloppy />
            ) : (
              <IconPencil />
            )}
          </ActionIcon>
        </div>

        {edit[1] ? (
          <Textarea
            value={aboutText}
            onChange={(e) =>
              setAboutText(e.currentTarget.value)
            }
            autosize
            minRows={4}
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {aboutText}
          </div>
        )}
      </div>

      <Divider my="xl" />

      {/* SKILLS */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills
          <ActionIcon
            onClick={() => handleEdit(2)}
            size="lg"
            color="yellow.5"
            variant="subtle"
          >
            {edit[2] ? (
              <IconDeviceFloppy />
            ) : (
              <IconPencil />
            )}
          </ActionIcon>
        </div>

        {edit[2] ? (
          <TagsInput
            value={skills}
            onChange={setSkills}
            placeholder="Add skills"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, index: number) => (
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

      <Divider my="xl" />

      {/* EXPERIENCE */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <ActionIcon
            onClick={() => handleEdit(3)}
            size="lg"
            color="yellow.5"
            variant="subtle"
          >
            {edit[3] ? <IconDeviceFloppy /> : <IconPencil />}
          </ActionIcon>
        </div>

        <div className="flex flex-col gap-8">
          {experience.map((exp: any, index: number) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>

      <Divider my="xl" />

      {/* CERTIFICATIONS */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <ActionIcon
            onClick={() => handleEdit(4)}
            size="lg"
            color="yellow.5"
            variant="subtle"
          >
            {edit[4] ? <IconDeviceFloppy /> : <IconPencil />}
          </ActionIcon>
        </div>

        <div className="flex flex-col gap-8">
          {certifications.map((certi: any, index: number) => (
            <CertiCard key={index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePerson;