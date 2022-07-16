import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link as NextLink } from "next/link";
// component
// import Iconify from "../../../components/Iconify";
import { useLoginMutation } from "../../lib/services/authAPI";
import { useDispatch } from "react-redux";
import { notify } from "../../lib/alertSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const showAlert = (rest) => {
    dispatch(
      notify({
        display: true,
        ...rest,
      })
    );
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      // try {
      //   await login(values);
      // } catch (error) {
      //   console.log(error);
      // }
      login(values)
        .unwrap()
        .then((data) => {
          dispatch(
            notify({
              display: true,
              type: "success",
              message: data.message,
            })
          );

          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          const { data = {} } = error;
          if ("non_field_errors" in data) {
            console.log("caught");
            dispatch(
              notify({
                display: true,
                type: "error",
                message: data.non_field_errors?.join(" "),
              })
            );
          }
        });
      // navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {/* <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    /> */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link
            component={NextLink}
            variant="subtitle2"
            to="#"
            underline="hover"
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
