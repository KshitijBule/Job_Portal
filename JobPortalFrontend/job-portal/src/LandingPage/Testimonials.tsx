import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 pb-10 px-4 sm:px-10 lg:px-20">

      {/* Heading */}
      <div className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        What <span className="text-bright-sun-400">users</span> say about us?
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        {testimonials.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 border border-bright-sun-400 p-4 rounded-xl bg-mine-shaft-900 hover:scale-105 transition duration-300"
          >
            {/* User Info */}
            <div className="flex gap-3 items-center">
              <Avatar
                className="!h-12 !w-12 sm:!h-14 sm:!w-14"
                src="avatar.png"
                alt={data.name}
              />
              <div>
                <div className="text-sm sm:text-base lg:text-lg text-mine-shaft-100 font-semibold">
                  {data.name}
                </div>
                <Rating value={data.rating} fractions={2} readOnly size="sm" />
              </div>
            </div>

            {/* Review */}
            <div className="text-xs sm:text-sm text-mine-shaft-300 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
              mollitia.
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Testimonials;