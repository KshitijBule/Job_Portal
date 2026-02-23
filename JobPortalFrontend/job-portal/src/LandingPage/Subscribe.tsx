import { Button, TextInput } from "@mantine/core";

const Subsribe =()=>{
  return <div className="mt-20 flex item-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-evenly">
          <div className="text-4xl w-2/5 text-center font-semibold text-mine-shaft-100 mt-4 mb-4">
        Never miss any <span className="text-bright-sun-400">Job News</span> 
      </div>
      <div className="flex gap-4 bg-mine-shaft-800 px-3 py-2 items-center rounded-xl">
        <TextInput className="[&_input] : text-mine-shaft-100 font-semibold"
        variant="unstyled"
        placeholder="abc@gmail.com"
        size="xl"
        />
        <Button className="!rounded-lg"
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
}
export default Subsribe;