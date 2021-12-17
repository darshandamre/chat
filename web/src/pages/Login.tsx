import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import NavBar from "../Components/NavBar";
import { Form, Formik } from "formik";
import { MyTextField } from "../utils/MyTextField";
import Button from "@mui/material/Button";
import * as yup from "yup";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const validationSchema = yup.object({
    usernameOrEmail: yup
      .string()
      .required("username or email is a required field"),
    password: yup.string().required().min(3)
  });
  return (
    <>
      <NavBar />
      <Box
        sx={{
          mx: "auto",
          maxWidth: 350
        }}>
        <Typography my={3} variant="h3" component={"div"} align="center">
          Login
        </Typography>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            console.log("submit: ", data);
            setSubmitting(false);
          }}>
          {({ values, errors, isSubmitting }) => (
            <Form>
              <MyTextField name="usernameOrEmail" label="username or email" />
              <MyTextField name="password" label="password" />

              <Button
                sx={{ width: "100%", my: 1 }}
                size="large"
                type="submit"
                variant="contained"
                disabled={isSubmitting}>
                login
              </Button>

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
