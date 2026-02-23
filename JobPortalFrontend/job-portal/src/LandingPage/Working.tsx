import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        How does it <span className="text-bright-sun-400">Works</span>
      </div>

      <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">
        Explore diverse job opportunities tailored to your skills. Start your career journey today!
      </div>

      <div className="flex  px-16 justify-between items-center">
        <div>
          <img className ="w-[30rem]" src="/Working/Girl.png" alt="girl" />
         

        </div>
        <div className=" flex flex-col gap-10">
          {
            work.map((item,index) =><div className="flex items-center gap-4">
            <div className="p-2 bg-bright-sun-300 rounded-full">
              <img className="h-12 w-12" src={`/Working/${item.name}.png`} alt={item.name} />

            </div>
            <div>
                <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                <div className="text-mine-shaft-300">{item.desc}</div>
            </div>

          </div>)
          }
        </div>
      </div>
    </div>   
  );
};

export default Working;
