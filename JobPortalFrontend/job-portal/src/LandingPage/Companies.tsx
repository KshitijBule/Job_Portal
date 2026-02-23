import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";
import { ClassNames } from "@emotion/react";



const Companies = () => {
  return (
    <div className="-mt-19 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-10">
        Trusted By <span className="text-bright-sun-400">1000+</span> Companies
      </div>

      <Marquee pauseOnHover={true}>
        {companies.map((company, index)=> (
          <div key={index} className="mx-10 hover:bg-mine-shaft-900 rounded-xl cursor-pointer">
            <img
              src={`/Companies/${company}.png`}
              alt={company}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;