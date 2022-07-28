import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { toast } from "../../lib/features/toast";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useCreateAssignmentMutation } from "../../lib/services/otherAPI";

const ModalInnerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  p: 4,
  [theme.breakpoints.down("sm")]: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  [theme.breakpoints.up("md")]: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#FFFFFF",
    boxShadow: 24,
    borderRadius: 1,
  },
}));

const classOptions = [
  { value: "CPE 500L", label: "CPE 500L" },
  { value: "CPE 400L", label: "CPE 400L" },
  { value: "CPE 300L", label: "CPE 300L" },
  { value: "CPE 200L", label: "CPE 200L" },
  { value: "CPE 100L", label: "CPE 100L" },
];

const AssignmentForm = ({ open, handleModal }) => {
  const { user } = useSelector((state) => state.auth);

  const [createAssignment, { isLoading, isError, isSuccess, error, data }] =
    useCreateAssignmentMutation();

  const AssignmentSchema = Yup.object().shape({
    question: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("A Question is required"),
    course: Yup.string().required("A Course is required"),
    code: Yup.string().required("A Course code is required"),
    classroom: Yup.string().required(
      "Please choose a classroom for this assignment."
    ),
    marks: Yup.number()
      .min(0, "Too small!")
      .max(100, "Too Large!")
      .required("A mark for the assignment is required"),
    due: Yup.string().required("A due date is reuqired."),
  });

  const formik = useFormik({
    initialValues: {
      question: "",
      course: "",
      code: "",
      classroom: "",
      marks: null,
      due: new Date().toISOString(),
    },
    validationSchema: AssignmentSchema,
    onSubmit: async (values) => {
      let id = user.instructor.id;
      // await createAssignment({ values, id }).unwrap();
      if (!user.is_instructor) {
        return toast({
          type: "warn",
          message: "You are not authorized to do this",
        });
      }
      await createAssignment(values).unwrap();
      handleModal({ assignment: false });
      resetForm();
    },
  });

  const {
    resetForm,
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <Modal open={open} onClose={() => handleModal({ assignment: false })}>
      <ModalInnerBox
        sx={{
          overflow: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "#FFFFFF",
          boxShadow: 24,
          borderRadius: 1,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography id="modal-modal-question" variant="h6" component="h2">
            Create Assignment
          </Typography>
          <IconButton onClick={() => handleModal({ assignment: false })}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ margin: "15px 0" }} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Question"
                  {...getFieldProps("question")}
                  error={Boolean(touched.question && errors.question)}
                  helperText={touched.question && errors.question}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Course"
                  {...getFieldProps("course")}
                  error={Boolean(touched.course && errors.course)}
                  helperText={touched.course && errors.course}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Code"
                  {...getFieldProps("code")}
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Class"
                      {...getFieldProps("classroom")}
                      error={Boolean(touched.classroom && errors.classroom)}
                      helperText={touched.classroom && errors.classroom}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Marks"
                  type="number"
                  {...getFieldProps("marks")}
                  error={Boolean(touched.marks && errors.marks)}
                  helperText={touched.marks && errors.marks}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="datetime-local"
                  label="Due date"
                  {...getFieldProps("due")}
                  error={Boolean(touched.due && errors.due)}
                  helperText={touched.due && errors.due}
                  required
                  variant="outlined"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ margin: "15px 0" }} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Create
            </LoadingButton>
          </Form>
        </FormikProvider>
      </ModalInnerBox>
    </Modal>
  );
};

export default AssignmentForm;
