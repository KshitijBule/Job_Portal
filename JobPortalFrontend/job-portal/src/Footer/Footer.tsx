import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconHierarchy2 } from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="pt-12 sm:pt-16 lg:pt-20 pb-6 flex flex-col lg:flex-row gap-10 lg:gap-5 justify-between px-4 sm:px-10 lg:px-20 bg-mine-shaft-950 font-['poppins']">

      {/* Left Section */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4 text-center lg:text-left">

        <div className="flex gap-3 items-center justify-center lg:justify-start text-bright-sun-400">
          <IconHierarchy2 className="h-7 w-7" stroke={2.5} />
          <div className="text-xl font-serif">HireMe</div>
        </div>

        <div className="text-sm text-mine-shaft-300">
          Job Portal with user profiles, skills updates, certifications, work experience and admin job postings.
        </div>

        <div className="flex gap-3 text-bright-sun-400 justify-center lg:justify-start [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full cursor-pointer hover:[&>div]:bg-mine-shaft-700">
          <div><IconBrandFacebook /></div>
          <div><IconBrandInstagram /></div>
          <div><IconBrandX /></div>
        </div>
      </div>

      {/* Links Section */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-around gap-8">

        {footerLinks.map((item, index) => (
          <div key={index} className="text-center lg:text-left">

            <div className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-bright-sun-400">
              {item.title}
            </div>

            {item.links.map((link, i) => (
              <div
                key={i}
                className="text-mine-shaft-300 text-xs sm:text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out"
              >
                {link}
              </div>
            ))}

          </div>
        ))}

      </div>

    </div>
  ) : null;
};

export default Footer;