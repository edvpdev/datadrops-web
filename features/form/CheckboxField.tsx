import { IProviderEntityDepSettings } from '@/lib/types';
import { Checkbox, Label } from 'flowbite-react';
import { isEqual } from 'lodash';
import { memo } from 'react';

type FieldSetting = IProviderEntityDepSettings;

interface CheckboxFieldProps {
  fieldSettings: FieldSetting;
  onChange?: (fieldSetting: FieldSetting, value: string) => void;
  isError?: string;
  helpButton?: () => React.ReactNode;
  value?: string;
}

//eslint-disable-next-line react/display-name
const CheckboxField = memo(({ fieldSettings }: CheckboxFieldProps) => {
  const { propKey, label, isChecked, disabled } = fieldSettings;
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={propKey} checked={isChecked} disabled={disabled} />
      <Label htmlFor={propKey} className="flex" disabled={disabled}>
        {label}
      </Label>
    </div>
  );
}, isEqual);

export default CheckboxField;
