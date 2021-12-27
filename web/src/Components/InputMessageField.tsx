import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface InputMessageFieldProps {}

const InputMessageField: React.FC<InputMessageFieldProps> = () => {
  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          // make async call
          console.log(values);

          setSubmitting(false);
        }}>
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                sx={{ px: 3 }}
                id="outlined-adornment-input-message"
                placeholder="Message..."
                name="message"
                value={values.message}
                onChange={handleChange}
                multiline
                maxRows={5}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="send button"
                      edge="end">
                      <SendRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InputMessageField;
