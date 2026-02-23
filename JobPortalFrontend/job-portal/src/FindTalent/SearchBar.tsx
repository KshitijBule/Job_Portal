import { Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([1, 100]);

  return (
    <div className="flex items-center px-5 py-8 gap-4">
      
      
      <div className="flex items-center w-1/5 rounded-full px-3 py-2">
        <IconUserCircle size={20} className="text-bright-sun-400 mr-2" />

    <Input
  variant="default"
  placeholder="Talent Name"
  className="flex-1 [&_input]:placeholder-mine-shaft-400"
/>

      </div>

      {searchFields.map((item, index) => (
        <div key={index} className="flex items-center w-1/5">
          <MultiInput {...item} />
          <Divider size="xs" orientation="vertical" className="ml-4" />
        </div>
      ))}

      
      <div className="w-1/5">
        <div className="flex justify-between text-sm">
          <div className="ml-2">Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>

        <RangeSlider
          size="xs"
          value={value}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
          styles={{
            bar: { backgroundColor: "#FCC419" },
            thumb: { borderColor: "#FCC419" },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
