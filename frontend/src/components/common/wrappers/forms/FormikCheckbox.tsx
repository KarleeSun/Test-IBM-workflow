import { Field } from "formik";
import { CheckboxWithLabel } from "formik-mui";

interface CheckboxProps {
  label: string;
  name: string;
}

export default function FormikCheckbox({ label, name }: CheckboxProps) {
  return (
    <Field
      type="checkbox"
      component={CheckboxWithLabel}
      value={label}
      Label={{ label }}
      name={name}
    />
  );
}
