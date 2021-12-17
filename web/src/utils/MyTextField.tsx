import React from "react";
import { FieldHookConfig, useField } from "formik";
import TextField from "@mui/material/TextField";
import "../style.css";

type MyTextFieldProps = FieldHookConfig<{}> & {
  label: string;
};

export const MyTextField: React.FC<MyTextFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      className="inputRounded"
      sx={{
        my: 1
      }}
      fullWidth
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
