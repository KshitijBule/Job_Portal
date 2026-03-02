import {
  ActionIcon,
  Divider,
  Textarea,
  TextInput,
  TagsInput,
  Button,
  Card,
  Group,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { DateInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";

const ProfilePerson = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();

  const [edit, setEdit] = useState([false, false, false, false, false]);

  const handleEdit = (index: number) => {
    const updated = [...edit];
    updated[index] = !updated[index];
    setEdit(updated);
  };

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

  // -------------------- UI --------------------


  if (!user || !user.data) {
    // User is logged out, render fallback
    return <div className="text-5xl text-red-600 font-bold text-center">Please log in to view your profile</div>;
  }

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

      <Info name={user.data.name} userId={user.data.id} />

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
            {profile?.aboutText}
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
            {profile?.skills?.map((skill: any, index: number) => (
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

  {edit[3] && (
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
    {profile?.experiences?.map((exp: any, index: number) =>
      edit[3] ? (
        <Card key={index} shadow="sm" radius="md" withBorder>
          <Group grow>
            <TextInput
              label="Job Title"
              value={exp.title}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].title = e.currentTarget.value;
                setExperience(updated);
              }}
            />

            <TextInput
              label="Company"
              value={exp.company}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].company = e.currentTarget.value;
                setExperience(updated);
              }}
            />
          </Group>

          <TextInput
            mt="md"
            label="Location"
            value={exp.location}
            onChange={(e) => {
              const updated = [...experience];
              updated[index].location = e.currentTarget.value;
              setExperience(updated);
            }}
          />

          <Group grow mt="md">
            <DateInput
              label="Start Date"
              value={exp.startDate}
              onChange={(value) => {
                const updated = [...experience];
                updated[index].startDate = value;
                setExperience(updated);
              }}
            />

            <DateInput
              label="End Date"
              value={exp.endDate}
              onChange={(value) => {
                const updated = [...experience];
                updated[index].endDate = value;
                setExperience(updated);
              }}
            />
          </Group>

          <Textarea
            mt="md"
            label="Description"
            autosize
            minRows={3}
            value={exp.description}
            onChange={(e) => {
              const updated = [...experience];
              updated[index].description =
                e.currentTarget.value;
              setExperience(updated);
            }}
          />

          <Button
            color="red"
            variant="light"
            mt="md"
            leftSection={<IconTrash size={16} />}
            onClick={() => {
              const updated = experience.filter(
                (_, i) => i !== index
              );
              setExperience(updated);
            }}
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

  {edit[4] && (
    <Button
      leftSection={<IconPlus size={16} />}
      mb="md"
      onClick={() =>
        setCertifications([
          ...certifications,
          {
            title: "",
            issuer: "",
            issueDate: null,
            credentialId: "",
          },
        ])
      }
    >
      Add Certification
    </Button>
  )}

  <div className="flex flex-col gap-6">
    {profile?.certifications?.map((cert: any, index: number) =>
      edit[4] ? (
        <Card key={index} shadow="sm" radius="md" withBorder>
          <TextInput
            label="Certification Title"
            value={cert.title}
            onChange={(e) => {
              const updated = [...certifications];
              updated[index].title = e.currentTarget.value;
              setCertifications(updated);
            }}
          />

          <TextInput
            mt="md"
            label="Issuer"
            value={cert.issuer}
            onChange={(e) => {
              const updated = [...certifications];
              updated[index].issuer = e.currentTarget.value;
              setCertifications(updated);
            }}
          />

          <DateInput
            mt="md"
            label="Issue Date"
            value={cert.issueDate}
            onChange={(value) => {
              const updated = [...certifications];
              updated[index].issueDate = value;
              setCertifications(updated);
            }}
          />

          <TextInput
            mt="md"
            label="Credential ID"
            value={cert.credentialId}
            onChange={(e) => {
              const updated = [...certifications];
              updated[index].credentialId =
                e.currentTarget.value;
              setCertifications(updated);
            }}
          />

          <Button
            color="red"
            variant="light"
            mt="md"
            leftSection={<IconTrash size={16} />}
            onClick={() => {
              const updated = certifications.filter(
                (_, i) => i !== index
              );
              setCertifications(updated);
            }}
          >
            Remove
          </Button>
        </Card>
      ) : (
        <CertiCard key={index} {...cert} />
      )
    )}
  </div>
  </div>
 </div> 
  );
};

export default ProfilePerson;