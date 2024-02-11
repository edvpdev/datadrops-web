import {
  IProviderEntityDepSettings,
  DependencySettingWithHelpButton
} from '@/lib/types';
import React, { memo, useCallback, useImperativeHandle } from 'react';
import { useEffect, useState } from 'react';
import TextField from './TextField';
import { isEqual } from 'lodash';
import CheckboxField from './CheckboxField';
import { FaInfoCircle } from 'react-icons/fa';

export interface FormData {
  generalSettings: any;
  entitySettings: any;
}

export interface FormErrors {
  [id: string]: string;
}

interface SyncsSettingsFormProps {
  generalDepSettings: DependencySettingWithHelpButton[];
  entityDepSettings: DependencySettingWithHelpButton[];
  readonly: boolean;
}

// eslint-disable-next-line react/display-name
const SyncsSettingsForm = React.memo(
  React.forwardRef<any, SyncsSettingsFormProps>((props, ref) => {
    const [values, setValues] = useState<FormData | undefined>(undefined);
    const [errors, setErrors] = useState<FormErrors>({});

    const { generalDepSettings, entityDepSettings, readonly } = props;

    useEffect(() => {
      const newFormValues: FormData = {
        generalSettings: {},
        entitySettings: {}
      };

      // todo: revisit of more type of setting will appear
      generalDepSettings.forEach((dependency) => {
        newFormValues['generalSettings'][dependency.id] =
          dependency.type === 'text'
            ? dependency.defaultValue || ''
            : dependency.isChecked;
      });
      entityDepSettings.forEach((dependency) => {
        newFormValues['entitySettings'][dependency.id] =
          dependency.type === 'text'
            ? dependency.defaultValue || ''
            : dependency.isChecked;
      });
      setValues({
        ...newFormValues
      });
    }, [entityDepSettings, generalDepSettings]);

    const validateForm = useCallback((): FormErrors => {
      const newErrorValues: FormErrors = {};
      entityDepSettings.forEach((dependency) => {
        if (dependency.required && !values?.entitySettings[dependency.id]) {
          newErrorValues[dependency.id] = 'Required';
        }

        if (dependency.pattern && values?.entitySettings[dependency.id]) {
          const regex = new RegExp(dependency.pattern);
          if (!regex.test(values?.entitySettings[dependency.id])) {
            newErrorValues[dependency.id] = 'Invalid Pattern';
          }
        }
      });

      setErrors({
        ...newErrorValues
      });

      return {
        ...newErrorValues
      };
    }, [values, entityDepSettings]);

    const validateFormField = (
      dependency: IProviderEntityDepSettings,
      value: string
    ) => {
      const newErrorValues: FormErrors = {};
      if (dependency.required && !value) {
        newErrorValues[dependency.id] = 'Required';
      }

      if (dependency.pattern && value) {
        const regex = new RegExp(dependency.pattern);
        if (!regex.test(value)) {
          newErrorValues[dependency.id] = 'Invalid Pattern';
        }
      }

      setErrors((errors) => {
        return {
          ...errors,
          ...newErrorValues
        };
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        getFormState: () => {
          return values;
        },
        getFormErrors: () => {
          return errors;
        },
        validateForm: () => {
          return validateForm();
        }
      }),
      [values, errors, validateForm]
    );

    const handleGeneralFieldChange = useCallback(
      (dep: IProviderEntityDepSettings, value: string) => {
        setErrors((errors) => {
          return {
            ...errors,
            [dep.id]: ''
          };
        });
        setValues((values) => {
          if (!values) return;
          return {
            ...values,
            generalSettings: {
              ...values.generalSettings,
              [dep.id]: value
            }
          };
        });
        validateFormField(dep, value);
      },
      []
    );

    const handleEntityFieldChange = useCallback(
      (dep: IProviderEntityDepSettings, value: string) => {
        setErrors((errors) => {
          return {
            ...errors,
            [dep.id]: ''
          };
        });
        setValues((values) => {
          if (!values) return;
          return {
            ...values,
            entitySettings: {
              ...values.entitySettings,
              [dep.id]: value
            }
          };
        });
        validateFormField(dep, value);
      },
      []
    );

    return (
      <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h5>
        {generalDepSettings.length > 0 && (
          <div className="mb-2 flex max-w-md flex-col gap-2">
            <h5 className="text-base font-bold tracking-tight text-gray-700 dark:text-white">
              General settings
            </h5>
            {generalDepSettings.map((dependency) => {
              return (
                <div className="flex items-center gap-1" key={dependency.id}>
                  <FormField
                    key={dependency.id}
                    type={dependency.type}
                    dependencySetting={dependency}
                    onChange={handleGeneralFieldChange}
                    readonly={readonly}
                  />
                  {dependency.tip && (
                    <div
                      className="tooltip tooltip-right text-gray-500"
                      data-tip={dependency.tip}>
                      <FaInfoCircle />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {entityDepSettings.length > 0 && (
          <div className="mb-2 flex flex-col gap-2">
            <h5 className="text-base font-bold tracking-tight text-gray-700 dark:text-white">
              Entity settings
            </h5>
            {entityDepSettings.map((dependency) => {
              return (
                <FormField
                  key={dependency.id}
                  type={dependency.type}
                  dependencySetting={dependency}
                  onChange={handleEntityFieldChange}
                  isError={errors?.[dependency.id]}
                  helpButton={dependency.helpButton}
                  readonly={readonly}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }),
  isEqual
);
export default SyncsSettingsForm;

interface FormField {
  type: string;
  dependencySetting: IProviderEntityDepSettings;
  onChange: (
    dependencySetting: IProviderEntityDepSettings,
    value: string
  ) => void;
  isError?: string;
  helpButton?: () => React.ReactNode;
  readonly?: boolean;
}

// eslint-disable-next-line react/display-name
const FormField = memo(
  ({
    type,
    dependencySetting,
    onChange,
    isError,
    helpButton,
    readonly = false
  }: FormField) => {
    if (type === 'boolean') {
      return <CheckboxField fieldSettings={dependencySetting} />;
    }
    if (type === 'text') {
      return (
        <TextField
          fieldSettings={dependencySetting}
          onChange={onChange}
          isError={isError}
          helpButton={helpButton}
          readonly={readonly}
        />
      );
    }
    return null;
  },
  isEqual
);
