import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 300]);
  const dispatch = useDispatch();

  const handleChangeEnd = (val: [number, number]) => {
    dispatch(updateFilter({ salary: val }));
  };

  return (
    <div className="flex flex-wrap gap-4 px-4 sm:px-6 md:px-10 py-6">

      {/* Dropdown Filters */}
      {dropdownData.map((item, index) => (
        <div
          key={index}
          className="
            w-full 
            sm:w-[48%] 
            md:w-[30%] 
            lg:w-[18%] 
            flex items-center
          "
        >
          <div className="w-full">
            <MultiInput {...item} />
          </div>

          {/* Divider only on large screens */}
          {index !== dropdownData.length - 1 && (
            <Divider
              size="xs"
              orientation="vertical"
              className="hidden lg:block mx-2"
            />
          )}
        </div>
      ))}

      {/* Salary Filter */}
      <div
        className="
          w-full 
          sm:w-[48%] 
          md:w-[30%] 
          lg:w-[18%]
        "
      >
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
          <div className="ml-1">Salary</div>
          <div>
            ₹{value[0]} LPA - ₹{value[1]} LPA
          </div>
        </div>

        <RangeSlider
          size="xs"
          value={value}
          onChange={setValue}
          onChangeEnd={handleChangeEnd}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
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