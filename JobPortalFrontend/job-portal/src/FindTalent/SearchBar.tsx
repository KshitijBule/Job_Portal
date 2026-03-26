import { Divider, Input } from "@mantine/core";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChange = (field: any, event: any) => {
    const value = event.currentTarget.value;
    setName(value);
    dispatch(updateFilter({ [field]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center px-5 py-4 md:py-8 gap-4">

      {/* Name Input */}
      <div className="flex items-center flex-1 rounded-full px-3 py-2">
        <IconUserCircle size={20} className="text-bright-sun-400 mr-2" />

        <Input
          value={name}
          onChange={(e) => handleChange("name", e)}
          variant="default"
          placeholder="Talent Name"
          className="flex-1 h-10 [&_input]:h-10 [&_input]:placeholder-mine-shaft-400"
        />
      </div>

      {/* Divider (hidden on mobile) */}
      <Divider size="xs" orientation="vertical" className="hidden md:block" />

      {/* Dynamic Fields */}
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center flex-1 w-full">
            <MultiInput {...item} />
          </div>

          {/* Divider only for desktop */}
          {index < searchFields.length - 1 && (
            <Divider
              size="xs"
              orientation="vertical"
              className="hidden md:block"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchBar;