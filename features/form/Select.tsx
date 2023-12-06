'use client';

import Select from 'react-select';

interface Props {
  placeholder: string;
  name: string;
  options: { value: string; label: string }[] | undefined;
  label?: string;
  id?: string;
  defaultValue?: any;
  onChange: (value: any) => void;
  value: { value: string; label: string };
}

const DEFAULT_VALUE = {
  value: '',
  label: ''
};

export default function CustomSelect(props: Props) {
  return (
    <div>
      <Select
        id={'id'}
        placeholder={'placeholder'}
        name={'name'}
        options={props.options}
        // defaultValue={''}
        onChange={(e, d) => {
          console.log(e);
          if (e && e.value) {
            console.log(e);
            props.onChange(e);
          } else {
            console.log(e);
            props.onChange(e);
          }
        }}
        value={props.value ?? DEFAULT_VALUE}
        formatOptionLabel={(option) => <div>{option.label}</div>}
        classNames={{
          control: () => 'border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
      />
    </div>
  );
}
