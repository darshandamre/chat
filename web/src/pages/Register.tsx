import React from "react";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import NavBar from "../Components/NavBar";
import { MyTextField } from "../utils/MyTextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import Button from "@mui/material/Button";

// interface RegisterProps {}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required().min(3),
  password: yup.string().required().min(3)
});

const Register: React.FC = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          mx: "auto",
          maxWidth: 350
        }}>
        <Typography my={3} variant="h3" component={"div"} align="center">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            username: "",
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
              <MyTextField name="email" label="email" />
              <MyTextField name="username" label="username" />
              <MyTextField name="password" label="password" />

              <Button
                sx={{ width: "100%", my: 1 }}
                size="large"
                type="submit"
                variant="contained"
                disabled={isSubmitting}>
                Sign up
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

export default Register;
