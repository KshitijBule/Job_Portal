import { Button, TextInput } from "@mantine/core";

const Subsribe = () => {
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-10 lg:px-20">
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-mine-shaft-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-10 rounded-xl">

        {/* Text */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full lg:w-2/5 text-center lg:text-left font-semibold text-mine-shaft-100">
          Never miss any{" "}
          <span className="text-bright-sun-400">Job News</span>
        </div>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-mine-shaft-800 px-3 py-3 items-center rounded-xl w-full lg:w-auto">

          <TextInput
            className="w-full sm:w-64 [&_input]:!text-mine-shaft-100 font-semibold"
            variant="unstyled"
            placeholder="abc@gmail.com"
            size="md"
          />

          <Button
            className="!rounded-lg w-full sm:w-auto"
            variant="filled"
            styles={{
              root: {
                backgroundColor: "#FACC15",
                color: "#000",
              },
            }}
          >
            Subscribe
          </Button>

        </div>

      </div>
    </div>
  );
};

export default Subsribe;