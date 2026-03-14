import { Divider, Input } from "@mantine/core";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch =useDispatch();
  const [name,setName]=  useState('');
  const handleChange = (field: any, event: any) => {
  const value = event.currentTarget.value;

  setName(value);
  dispatch(updateFilter({ [field]: value }));
};
  return (
    <div className="flex items-center px-5 py-8 gap-4">

      
      <div className="flex items-center flex-1 rounded-full px-3 py-2">
        <IconUserCircle size={20} className="text-bright-sun-400 mr-2" />

        <Input
        value={name}
        onChange={(e)=>handleChange("name",e)}
        variant="default"
        placeholder="Talent Name"
        className="flex-1 h-10 [&_input]:h-10 [&_input]:placeholder-mine-shaft-400"
        />
      </div>

      <Divider size="xs" orientation="vertical" />

      
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div  className="flex items-center flex-1">
            <MultiInput {...item} />
          </div>
          {index < searchFields.length - 1 && (
            <Divider size="xs" orientation="vertical" />
          )}
        </React.Fragment>
      ))}

    </div>
  );
};

export default SearchBar;