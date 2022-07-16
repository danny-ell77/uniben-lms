import * as Yup from "yup";
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { useFormik, Form, FormikProvider } from "formik";
// import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRegisterMutation } from "../../src/services/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// component
// import Iconify from "../../../components/Iconify";

const classOptions = [
  { value: "CPE 500L", label: "CPE 500L" },
  { value: "CPE 400L", label: "CPE 400L" },
  { value: "CPE 300L", label: "CPE 300L" },
  { value: "CPE 200L", label: "CPE 200L" },
  { value: "CPE 100L", label: "CPE 100L" },
];

export default function RegisterForm() {
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [userCategory, setUserCategory] = useState("");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    role: Yup.string().required("Please choose a role"),
    classroom: Yup.string().required("Please choose the Class you belong to."),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: Yup.string()
      .label("Password Confirm")
      .required()
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      classroom: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      delete values.confirm_password;
      await register(values).unwrap();
      router.push("/dashboard");
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleRadioInputChange = (e) => {
    setFieldValue("role", e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let is_student = values.role === "student";
    delete values.confirm_password;
    delete values.role;
    const payload = { ...values, is_student, is_instructor: !is_student };
    console.log(payload);
    try {
      await register(payload);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstname")}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastname")}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">You are</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              row
              // value={value}
            >
              <FormControlLabel
                value="student"
                onChange={handleRadioInputChange}
                control={<Radio />}
                label="A Student"
              />
              <FormControlLabel
                value="instructor"
                onChange={handleRadioInputChange}
                control={<Radio />}
                label="An Instructor"
              />
            </RadioGroup>
          </FormControl>

          <Autocomplete
            // disablePortal
            id="classroom-demo"
            options={classOptions}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            onChange={(e, value) => {
              console.log(value.value);
              setFieldValue("classroom", value.value);
            }}
            sx={{ width: 300, margin: 0 }}
            renderInput={(params) => <TextField {...params} label="Class" />}
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
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="confirm_password"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            {...getFieldProps("confirm_password")}
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
            // onClick={handleRegister}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
