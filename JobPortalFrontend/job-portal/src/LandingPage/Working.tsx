import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 pb-10 px-4 sm:px-10 lg:px-20">

      {/* Heading */}
      <div className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        How does it <span className="text-bright-sun-400">Work</span>
      </div>

      {/* Subtext */}
      <div className="text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 mx-auto text-mine-shaft-300 text-center w-full sm:w-3/4 lg:w-1/2">
        Explore diverse job opportunities tailored to your skills. Start your career journey today!
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Image */}
        <div className="flex justify-center w-full lg:w-1/2">
          <img
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[30rem]"
            src="/Working/Girl.png"
            alt="girl"
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full lg:w-1/2">

          {work.map((item, index) => (
            <div key={index} className="flex items-start gap-4">

              {/* Icon */}
              <div className="p-2 sm:p-3 bg-bright-sun-300 rounded-full flex-shrink-0">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12"
                  src={`/Working/${item.name}.png`}
                  alt={item.name}
                />
              </div>

              {/* Text */}
              <div>
                <div className="text-mine-shaft-200 text-base sm:text-lg lg:text-xl font-semibold">
                  {item.name}
                </div>
                <div className="text-mine-shaft-300 text-sm sm:text-base">
                  {item.desc}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Working;