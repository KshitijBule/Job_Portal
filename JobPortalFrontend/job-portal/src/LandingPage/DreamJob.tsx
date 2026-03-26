import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 min-h-screen py-10 md:py-0 gap-10 md:gap-0">

      {/* Left Text Section */}
      <div className="flex flex-col justify-center w-full md:w-[45%] gap-6 items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-mine-shaft-100">
          Find your{" "}
          <span className="text-bright-sun-400">dream job</span>{" "}
          with us
        </h1>

        <p className="text-mine-shaft-200 text-base md:text-lg leading-relaxed">
          Good life begins with a good company. Start explore thousands of jobs in one place.
        </p>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 flex-1"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
          />

          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 flex-1"
            variant="unstyled"
            label="Location"
            placeholder="New York, USA"
          />

          <div className="flex items-center justify-center bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-3 hover:bg-bright-sun-500 cursor-pointer sm:self-end sm:mb-1 sm:h-10 sm:w-12 w-full h-10">
            <IconSearch className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full md:w-[55%] flex items-center justify-center">
        <img
          src="/Boy.png"
          alt="Dream Job"
          className="w-[18rem] sm:w-[24rem] md:w-[30rem] object-contain"
        />
        <div className="absolute right-4 md:right-10 bottom-4 md:top-[50%] md:bottom-auto w-fit border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
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