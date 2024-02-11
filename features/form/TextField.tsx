import { IProviderEntityDepSettings } from '@/lib/types';
import { Label, TextInput } from 'flowbite-react';
import { isEqual } from 'lodash';
import { memo } from 'react';

type FieldSetting = IProviderEntityDepSettings;

interface TextFieldProps {
  fieldSettings: FieldSetting;
  onChange?: (fieldSetting: FieldSetting, value: string) => void;
  isError?: string;
  helpButton?: () => React.ReactNode;
  readonly: boolean;
  value?: string | number;
}

//eslint-disable-next-line react/display-name
const TextField = memo(
  ({
    fieldSettings,
    onChange,
    isError,
    helpButton,
    readonly = false,
    value = ''
  }: TextFieldProps) => {
    const { id, type, placeholder, required, pattern, label } = fieldSettings;
    return (
      <div className="flex flex-col">
        <div className="mb-2 block">
          <Label htmlFor={id} value={label} />
        </div>
        <div className="items-top flex w-full gap-2">
          <div className="w-full">
            {readonly ? (
              <TextInput
                className="w-full"
                id={id}
                type={type}
                required={required}
                disabled={readonly}
                value={value}
              />
            ) : (
              <TextInput
                className="w-full"
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={(e) => {
                  onChange && onChange(fieldSettings, e.target.value);
                }}
                pattern={pattern}
                color={!!isError ? 'failure' : 'primary'}
                helperText={
                  !!isError ? (
                    <span className="text-red-600">{isError}</span>
                  ) : null
                }
              />
            )}
          </div>

          {helpButton && helpButton()}
        </div>
      </div>
    );
  },
  isEqual
);

export default TextField;
