import { Combobox, Button, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useState } from "react";

const opt = ["Relevance", "Most Recent", "Salary (low to high)", "Salary (high to low)"];

const Sort=()=> {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className = 'text-xs'value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div>
          
          <div onClick={()=>combobox.toggleDropdown()} className="border border-bright-sun-400 flex justify-between items-center px-2 mt-2 rounded-xl cursor-pointer gap-2 text-sm">
            {selectedItem}
            <IconAdjustments className='text-bright-sun-400'size={16} />
          </div>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default Sort;
