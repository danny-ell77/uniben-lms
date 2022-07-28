import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";

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

const SubmissionForm = ({ open, handleModal }) => {
  const save = (data) => {
    console.log(data);
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
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box sx={{ mb: 10 }}>
                <MUIRichTextEditor
                  readOnly={false}
                  onSave={save}
                  toolbar={true}
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
            <Button color="primary" variant="contained" sx={{ mx: 2 }}>
              Save Draft
            </Button>
            <Button color="primary" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </ModalInnerBox>
    </Modal>
  );
};

export default SubmissionForm;
