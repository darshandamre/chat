import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "../Components/NavBar";
import { MyTextField } from "./MyTextField";
import { MyPasswordField } from "./MyPasswordField";
import { toErrorMap } from "../utils/toErrorMap";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const validationSchema = yup.object({
  usernameOrEmail: yup
    .string()
    .required("username or email is a required field"),
  password: yup.string().required().min(3)
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation({
    update: (cache, { data }) => {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data?.login.user
        }
      });
    }
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
          onSubmit={async (
            { usernameOrEmail, password },
            { setSubmitting, setErrors }
          ) => {
            setSubmitting(true);
            // make async call
            const response = await login({
              variables: {
                usernameOrEmail,
                password
              }
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              setSubmitting(false);
              return navigate("/");
            }
            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <MyTextField name="usernameOrEmail" label="username or email" />
              <MyPasswordField name="password" />

              <Button
                sx={{ width: "100%", my: 1, borderRadius: "16px" }}
                size="large"
                type="submit"
                variant="contained"
                disabled={isSubmitting}>
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
