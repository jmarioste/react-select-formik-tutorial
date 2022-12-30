import { useField, useFormikContext } from "formik";
import React from "react";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

type MyOption = {
  label: string;
  value: string;
};

type GroupedOption = {
  label: string; // group label
  options: MyOption[];
};

type Props = {
  name: string;
} & Omit<
  StateManagerProps<MyOption, false | true, GroupedOption>,
  "value" | "onChange"
>;

const FormikReactSelect = (props: Props) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value as Array<any>;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  return (
    <Select
      {...restProps}
      value={value}
      // onChange implementation
      onChange={(val) => {
        //here I used explicit typing but there maybe a better way to type the value.
        const _val = val as MyOption[] | MyOption;
        const isArray = Array.isArray(_val);
        if (isArray) {
          const values = _val.map((o) => o.value);
          setFieldValue(name, values);
        } else {
          setFieldValue(name, _val);
        }
      }}
    />
  );
};

export default FormikReactSelect;
