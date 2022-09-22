import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateSubmissionMutation } from "../../lib/services/otherAPI";

const MUIRichTextEditor = dynamic(() => import("mui-rte"), { ssr: false });

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

const SubmissionForm = ({ open, handleModal, data: otherInfo }) => {
  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();
  const { user } = useSelector((state) => state.auth);
  const [submission, setSubmission] = useState({
    title: "",
    content: "",
  });
  const save = (data) => {
    console.log(submission, otherInfo);
  };
  const submit = async () => {
    if (!user.student) return;
    const { title, content } = submission;
    const { assignmentId: assignment, instructor } = otherInfo;
    let classroom = user.student.classroom.name;
    await createSubmission({
      assignment,
      title,
      content,
      instructor,
      classroom,
    }).unwrap();
    handleModal({ submission: false });
  };
  const handleEditorStateChange = (event) => {
    const content = JSON.stringify(convertToRaw(event.getCurrentContent()));
    setSubmission((prev) => ({ ...prev, content }));
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setSubmission((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Modal open={open} onClose={() => handleModal({ submission: false })}>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Submission
          </Typography>
          <IconButton onClick={() => handleModal({ submission: false })}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ margin: "15px 0" }} />
        <form autoComplete="off" noValidate>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                required
                onChange={handleTitleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box sx={{ mb: 10 }}>
                <MUIRichTextEditor
                  readOnly={false}
                  onSave={save}
                  toolbar={true}
                  onChange={handleEditorStateChange}
                  label="Type something here..."
                  inlineToolbar={true}
                />
              </Box>
              <Divider sx={{ margin: "15px 0" }} />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <LoadingButton color="primary" variant="contained" sx={{ mx: 2 }}>
              Save Draft
            </LoadingButton>
            <LoadingButton
              color="primary"
              variant="contained"
              onClick={submit}
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </ModalInnerBox>
    </Modal>
  );
};

export default SubmissionForm;
