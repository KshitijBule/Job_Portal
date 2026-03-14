import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';

const SelectInput = (props: any) => {
  const { label, placeholder, options = [] } = props;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>(options);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setData(options);
    setValue(props.form.getInputProps(props.name).value);
    setSearch(props.form.getInputProps(props.name).value);
  }, [props]);

  const exactOptionMatch = data.some((item) => item === search);

  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search?.toLowerCase().trim())
      );

  const optionsList = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <div>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          if (val === '$create') {
  setData((current) => [...current, search]);
  setValue(search);
  props.form.setFieldValue(props.name, search);
} else {
  setValue(val);
  setSearch(val);
  props.form.setFieldValue(props.name, val);
}
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            {...props.form.getInputProps(props.name)}
            label={label}
            withAsterisk
            className="[&_input]:font-medium"
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
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value || '');
            }}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} type="scroll">
              {optionsList}
              {!exactOptionMatch && search?.trim().length > 0 && (
                <Combobox.Option value="$create">
                  + Create {search}
                </Combobox.Option>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default SelectInput;