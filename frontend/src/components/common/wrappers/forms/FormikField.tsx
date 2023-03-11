import { TextFieldProps, TextField } from "@mui/material";
import { FieldProps, getIn } from "formik";
import React from "react";

export default function FormikField({
  field,
  form,
  error,
  helperText,
  ...rest
}: FieldProps & TextFieldProps) {
  const isTouched = getIn(form.touched, field.name);
  const errorMessage = getIn(form.errors, field.name);

  return (
    <TextField
      className="rounded-md"
      fullWidth
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
    />
  );
}
