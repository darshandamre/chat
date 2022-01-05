import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  MessagesDocument,
  MessagesQuery,
  useCreateMessageMutation,
  useMeQuery
} from "../generated/graphql";

interface InputMessageFieldProps {}

const InputMessageField: React.FC<InputMessageFieldProps> = () => {
  const { data: meData } = useMeQuery();
  const [sendMessage] = useCreateMessageMutation({
    update: (cache, { data }) => {
      cache.updateQuery<MessagesQuery, null>(
        { query: MessagesDocument },
        initialCache => {
          return {
            __typename: "Query",
            messages: [
              ...initialCache!.messages,
              {
                ...data!.createMessage,
                sender: {
                  __typename: "User",
                  id: meData!.me!.id, //change id
                  username: meData!.me!.username //change username
                }
              }
            ]
          };
        }
      );
    }
  });

  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={async (
          { message },
          { setSubmitting, resetForm, setErrors }
        ) => {
          setSubmitting(true);

          // make async call
          try {
            await sendMessage({ variables: { message } });
          } catch (err: any) {
            return setErrors({ message: err.message });
          }

          resetForm();
          setSubmitting(false);
        }}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <FormControl fullWidth variant="outlined" error={!!errors.message}>
              <FormHelperText>{errors.message}</FormHelperText>
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
