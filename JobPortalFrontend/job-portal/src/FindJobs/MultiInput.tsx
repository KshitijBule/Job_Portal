import { useEffect, useState } from "react";
import {
  Combobox,
  CheckIcon,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";



const  MultiInput=(props:any)=> {
  const dispatch = useDispatch();
  useEffect(()=>{
      setData(props.options);
  },[])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () =>
      combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    if (val === "$create") {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({[props.title]:[...value,search]}));
    } else {
      dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v)=>v!==val):[...value,val]}));
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val]
          
      );
    }

    setSearch("");
  };

  const handleValueRemove = (val: string) =>{
    dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
    setValue((current) => current.filter((v) => v !== val));}

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput variant="unstyled" rightSection={<Combobox.Chevron />} leftSection={
          <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
          <props.icon size={16} />
          </div>
          }
           onClick={() => combobox.openDropdown()}   className="border border-mine-shaft-700 rounded-md px-2 py-1 hover:border-mine-shaft-500 focus-within:border-bright-sun-400 transition">


          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field 
               placeholder={props.title}
                value={search}
                
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                  combobox.updateSelectedOptionIndex();
                }}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search value={search} onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Search Job Roles"
         className="border-none focus:ring-0 focus:outline-none" />


        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              + Create "{search}"
            </Combobox.Option>
          )}

          {options.length === 0 && search.trim().length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
export default MultiInput;
