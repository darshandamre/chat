import React, { useState } from "react";
import { FieldHookConfig, useField } from "formik";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const MyPasswordField: React.FC<FieldHookConfig<{}>> = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  const handleClickShowPassword = () => {
    setShowPassword(p => !p);
  };

  return (
    <FormControl
      className="inputRounded"
      sx={{
        my: 1
      }}
      fullWidth
      error={!!errorText}
      variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        {...field}
        sx={{
          pr: 2.5
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        label="password"
      />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};
