import { useState, useEffect } from "react";
import {
  ActionIcon,
  Button,
  Card,
  TextInput,
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
import CertiCard from "./CertiCard";

const Certifications = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);
  const [certifications, setCertifications] = useState<any[]>([]);

  // Sync redux profile → local state
  useEffect(() => {
    if (profile) {
      setCertifications(profile.certifications || []);
    }
  }, [profile]);

  // Update a field safely
  const updateField = (index: number, field: string, value: any) => {
    setCertifications((prev) =>
      prev.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    );
  };

  const handleEdit = async () => {
    if (edit) {
      try {
        // Format certifications before saving
        const formattedCert = certifications.map((cert) => ({
          ...cert,
          issueDate: cert.issueDate
            ? new Date(cert.issueDate).toISOString()
            : null,
          credentialId: cert.credentialId?.trim() || null,
        }));

        const updatedProfile = {
          ...profile,
          certifications: formattedCert,
        };

        const res = await updateProfile(updatedProfile);
        dispatch(setProfile(res));

        console.log("Certifications saved successfully");
      } catch (error) {
        console.error("Failed to update certifications", error);
      }
    }

    setEdit(!edit);
  };

  const addCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        title: "",
        issuer: "",
        issueDate: null,
        credentialId: "",
      },
    ]);
  };

  const removeCertification = (index: number) => {
    setCertifications((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certifications

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
          onClick={addCertification}
        >
          Add Certification
        </Button>
      )}

      <div className="flex flex-col gap-6">
        {certifications?.map((cert: any, index: number) =>
          edit ? (
            <Card key={index} shadow="sm" radius="md" withBorder>
              <TextInput
  label="Certification Title"
  value={cert.name || ""}
  onChange={(e) => updateField(index, "name", e.currentTarget.value)}
/>


              <TextInput
                mt="md"
                label="Issuer"
                value={cert.issuer || ""}
                onChange={(e) =>
                  updateField(index, "issuer", e.currentTarget.value)
                }
              />

              <DateInput
                mt="md"
                label="Issue Date"
                value={cert.issueDate ? new Date(cert.issueDate) : null}
                onChange={(value) =>
                  updateField(index, "issueDate", value)
                }
              />

              <TextInput
  mt="md"
  label="Credential ID"
  value={cert.certificateId || ""}
  onChange={(e) => updateField(index, "certificateId", e.currentTarget.value)}
/>


              <Button
                color="red"
                variant="light"
                mt="md"
                leftSection={<IconTrash size={16} />}
                onClick={() => removeCertification(index)}
              >
                Remove
              </Button>
            </Card>
          ) : (
            <CertiCard
                key={index}
                name={cert.name || "Untitled"}
                issuer={cert.issuer || "Unknown"}
                issueDate={
                cert.issueDate
                ? new Date(cert.issueDate).toLocaleDateString()
                : "No date"
                }
                certificateId={cert.certificateId || "N/A"}
                />
          )
        )}
      </div>
    </div>
  );
};

export default Certifications;