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
    <div className="flex px-5 py-8">

      {dropdownData.map((item, index) => (
        <div key={index} className="flex w-1/5">
          <div className="w-full">
            <MultiInput {...item} />
          </div>
          {index !== dropdownData.length - 1 && (
            <Divider size="xs" orientation="vertical" />
          )}
        </div>
      ))}

      <div className="w-1/5">

        <div className="flex justify-between text-sm">
          <div className="ml-2">Salary</div>
          <div>₹{value[0]} LPA - ₹{value[1]} LPA</div>
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
            thumb: { borderColor: "#FCC419" }
          }}
        />

      </div>

    </div>
  );
};

export default SearchBar;