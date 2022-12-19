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
import { useAttachmentUploadFinishMutation, useCreateSubmissionMutation, useDirectUploadFinishMutation, useDirectUploadStartMutation } from "../../lib/services/otherAPI";
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  const [attachment, setAttachment] = useState(null)
  const [drafting, setDrafting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();
  const [attachmentUploadFinish] = useAttachmentUploadFinishMutation()
  const { user } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false)
  const [submission, setSubmission] = useState({
    title: "",
    content: "",
  });

  const save = (data) => {
    console.log(submission, otherInfo);
  };

  const submit = async ({is_draft = false}) => {
    if (!user?.student) return;
    if (is_draft) {
      setDrafting(true)
    } else {
      setSubmitting(true)
    }
    const { title, content } = submission;
    const { assignmentId: assignment, instructor } = otherInfo;
    let classroom = user?.student.classroom.name;
    const attachment_details = {
      file_name: attachment?.name,
      file_type: attachment?.type
    }
    const payload = {
      assignment,
      title,
      content,
      instructor,
      classroom,
      has_attachment: Boolean(attachment),
      is_draft,
      status: is_draft ? "DRAFT" : "SUBMITTED",
      ...(Boolean(attachment) ? attachment_details : {})
    }
    const fulfilled = await createSubmission(payload).unwrap();
    if (Boolean(attachment)) {
      await directUploadDo(fulfilled.attachment)
      await attachmentUploadFinish({file_id: fulfilled?.data?.id}).unwrap()
    }
    handleModal({ submission: false });
    setDrafting(false)
    setSubmitting(false)
  };

  const handleEditorStateChange = (event) => {
    const content = JSON.stringify(convertToRaw(event.getCurrentContent()));
    setSubmission((prev) => ({ ...prev, content }));
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setSubmission((prev) => ({ ...prev, [name]: value }));
  };

    const directUploadDo = async (data) => {
        const postData = new FormData();

        for (const key in data?.fields) {
            postData.append(key, data.fields[key]);
        }
        postData.append('file', attachment);
        
        setUploading(true)
        const fulfilled = await fetch(data?.url, { method: 'POST', body: postData })
        setUploading(false)

    }

    const handleFileChange = e => {
        const file = e.target.files[0]
        setAttachment(file)
  }
  
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
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<AttachFileIcon />}
                component="label"
            >
                Attach File
                <input type="file" hidden onChange={handleFileChange}/>
              </Button>
              <p style={{display: "inline-block"}} overflow="hidden">{attachment?.name}</p><p style={{paddingLeft: 2, color: "red", display: "inline-block", cursor: "pointer"}} onClick={() => setAttachment(null)}>X</p>
            </Box>
            <Box>
              <LoadingButton
                color="primary"
                variant="contained"
                sx={{ mx: 2 }} l
                loading={drafting && (isLoading || uploading)}
                onClick={() => submit({is_draft : true})}>
              Save Draft
            </LoadingButton>
            <LoadingButton
              color="primary"
              variant="contained"
              onClick={submit}
              loading={submitting && (isLoading || uploading)}
            >
              Submit
              </LoadingButton>
            </Box>
              
          </Box>
        </form>
      </ModalInnerBox>
    </Modal>
  );
};

export default SubmissionForm;
