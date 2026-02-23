import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

type SelectInputProps = {
  label: string;
  placeholder: string;
  options?: string[];
  leftSection?: React.ElementType; 
  value?: string;
  onChange?: (val: string) => void;
};

const SelectInput = ({
  label,
  placeholder,
  options = [],
  leftSection: Icon, 
  value = "",
  onChange,
}: SelectInputProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>(options);
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setData(options);
  }, [options]);

 

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const exactOptionMatch = data.some((item) => item === search);

  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      );

  const optionsList = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          onChange?.(search);
        } else {
          setSearch(val);
          onChange?.(val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label={label}
          leftSection={Icon ? <Icon size={16} /> : undefined} 
          value={search}
          placeholder={placeholder}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onChange={(e) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(e.currentTarget.value);
          }}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200}>
            {optionsList}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;