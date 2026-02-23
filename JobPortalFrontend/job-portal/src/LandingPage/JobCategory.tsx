import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";

const JobCategory=()=>{
  return(
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        Browse <span className="text-bright-sun-400">Job</span> Categories
      </div>
      <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">Explore diverse job opportunities tailored to your skills. Start your career journey today!</div>

       <Carousel slideSize="22%" slideGap="md" draggable>
      {
        jobCategory.map((category,index)=><Carousel.Slide>
            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
        <div className ="p-2 bg-bright-sun-300 rounded-full">
            <img className="h-8 w-8" src={`/Category/${category.name}.png`} alt={category.name}/>

        </div>
        <div className="text-xl font-semibold text-mine-shaft-200">{category.name}</div>
        <div className="text-sm text-mine-shaft-300 text-center">{category.desc}</div>
        <div className="text-lg text-bright-sun-300">{category.jobs}+ new jobs posted</div>
      </div>
        </Carousel.Slide>)
      }
    </Carousel>

    
      </div>
  )
}
export default JobCategory;