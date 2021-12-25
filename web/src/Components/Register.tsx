import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "./NavBar";
import { MyTextField } from "./MyTextField";
import { MyPasswordField } from "./MyPasswordField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation, MeDocument, MeQuery } from "../generated/graphql";

const validationSchema = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required().min(3),
  password: yup.string().required().min(3)
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation({
    update: (cache, { data }) => {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data?.register.user
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
              navigate("/");
            }
            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <MyTextField name="email" label="email" />
              <MyTextField name="username" label="username" />
              <MyPasswordField name="password" />

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
