// import Form from '@rjsf/core';
// import validator from '@rjsf/validator-ajv8';
// import CustomSelect from './Select';
// import { Checkbox, Label } from 'flowbite-react';
// import { RegistryWidgetsType, WidgetProps } from '@rjsf/utils';
// import React from 'react';

// const CustomCheckbox = function (props: WidgetProps) {
//   console.log(props);
//   return (
//     <div className="mb-2 flex items-center gap-2">
//       <Checkbox
//         id={props.id}
//         name={props.id}
//         onChange={() => !props.disabled && props.onChange(!props.value)}
//         checked={props.value}
//         disabled={props.disabled}
//       />
//       <Label
//         htmlFor={props.id}
//         disabled={props.disabled}
//         className="text-gray-700">
//         {props.label}
//       </Label>
//     </div>
//   );
// };

// const CustomSelectField = function (props: WidgetProps) {
//   console.log(props);
//   return (
//     <div className="mb-2 flex flex-col">
//       <CustomSelect
//         id={props.id}
//         placeholder="Select..."
//         name="label"
//         options={props.options.enumOptions}
//         onChange={(value) => {
//           props.onChange(value);
//         }}
//         value={props.value}
//       />
//     </div>
//   );
// };

// const widgets: RegistryWidgetsType = {
//   CheckboxWidget: CustomCheckbox,
//   SelectWidget: CustomSelectField
// };

// interface FormWrapperProps {
//   schema: any;
//   uiSchema: any;
//   onChange: (e: any) => void;
//   onSubmit: (e: any) => void;
//   onError: (e: any) => void;
// }

// // eslint-disable-next-line react/display-name
// const ForWrapper = React.forwardRef<any, FormWrapperProps>(
//   (props: FormWrapperProps, ref) => {
//     const { schema, uiSchema, onChange, onSubmit, onError } = props;
//     return (
//       <>
//         <Form
//           schema={schema}
//           widgets={widgets}
//           uiSchema={uiSchema}
//           validator={validator}
//           onChange={(e) => onChange(e)}
//           onSubmit={(e) => onSubmit(e)}
//           onError={(e) => onError(e)}
//           ref={ref}
//         />
//       </>
//     );
//   }
// );

// export default ForWrapper;
