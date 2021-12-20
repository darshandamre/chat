import React from "react";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import NavBar from "../Components/NavBar";
import { MyTextField } from "../utils/MyTextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

// interface RegisterProps {}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required().min(3),
  password: yup.string().required().min(3)
});

const Register: React.FC = () => {
  const [register] = useRegisterMutation();
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
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            // make async call
            const response = await register({ variables: { options: values } });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              console.log("success");
            }
            console.log("response: ", response);
            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <MyTextField name="email" label="email" />
              <MyTextField name="username" label="username" />
              <MyTextField name="password" label="password" />

              <Button
                sx={{ width: "100%", my: 1, borderRadius: "16px" }}
                size="large"
                type="submit"
                variant="contained"
                disabled={isSubmitting}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
