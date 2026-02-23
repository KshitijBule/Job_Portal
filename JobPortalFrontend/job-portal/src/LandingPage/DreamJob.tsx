import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex items-center justify-between px-20 min-h-screen -mt-10">

      {/* Left Text Section */}
      <div className="flex flex-col justify-center w-[45%] gap-6">
        <h1 className="text-6xl font-bold leading-tight text-mine-shaft-100">
          Find your{" "}
          <span className="text-bright-sun-400">dream job</span>{" "}
          with us
        </h1>

        <p className="text-mine-shaft-200 text-lg leading-relaxed">
          Good life begins with a good company. Start explore thousands of jobs in one place.
        </p>

        {/* Inputs BELOW text */}
        <div className="flex gap-6 mt-5">
          <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label = "Job Title"
            placeholder="Software Engineer"
            />

          <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label = "Job Title"
            placeholder="Software Engineer"
            
          />
          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-1 hover:bg-bright-sun-500 cursor-pointer">
            <IconSearch className ="h-[85%] w-[85%]"/>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-[55%] flex items-center justify-center">
        <img
          src="/Boy.png"
          alt="Dream Job"
          className="w-[30rem] object-contain"
        />
        <div className="absolute right-20 w-fit top-[50%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
          <div className="text-center text-mine-shaft-100 mb-1 text-sm">10K+ got jobs</div>
          <Avatar.Group spacing="sm">
      <Avatar src="avatar.png" radius="xl" />
      <Avatar src="avatar1.png" radius="xl" />
      <Avatar src="avatar2.png" radius="xl" />
      <Avatar radius="xl">+9k</Avatar>
      </Avatar.Group>
        </div>
      </div>

    </div>
  );
};

export default DreamJob;
