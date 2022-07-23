import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import dynamic from "next/dynamic";
import { useState } from "react";
import { DashboardLayout } from "../../components/Layout";
import { Row } from "../../components/shared/TableRow";
import { ToolBar } from "../../components/shared/ToolBar";
import assignments from "../../__mocks__/assignmentData";
import { toast } from "../../lib/features/toast";
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

const classOptions = [
  { value: "CPE 500L", label: "CPE 500L" },
  { value: "CPE 400L", label: "CPE 400L" },
  { value: "CPE 300L", label: "CPE 300L" },
  { value: "CPE 200L", label: "CPE 200L" },
  { value: "CPE 100L", label: "CPE 100L" },
];

const Assignments = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    assignment: false,
    submission: false,
  });

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        type: "success",
        message: "Assignment Created",
      });
      handleModal({ assignment: false });
    }, 3000);
  };

  const save = (data) => {
    console.log(data);
  };
  const handleModal = (mode) => setModalMode((prev) => ({ ...prev, ...mode }));
  const handleClose = () => setModalOpen(false);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container>
        <ToolBar
          page="assignment"
          actionHandler={() => handleModal({ assignment: true })}
        />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Code</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due in</TableCell>
                <TableCell>Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((row) => (
                <Row
                  key={row.code}
                  row={row}
                  setModalOpen={() => handleModal({ submission: true })}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box>
        <Modal
          open={modalMode.submission}
          onClose={() => handleModal({ submission: false })}
        >
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
        <Modal
          open={modalMode.assignment}
          onClose={() => handleModal({ assignment: false })}
        >
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
                Create Assignment
              </Typography>
              <IconButton onClick={() => handleModal({ assignment: false })}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider sx={{ margin: "15px 0" }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Title"
                  name="title"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Course"
                  name="course"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Course Code"
                  name="course_code"
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
                  }}
                  sx={{ width: 300, margin: 0 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Class" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Marks"
                  name="marks"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="datetime-local"
                  label="Due date"
                  name="course_code"
                  required
                  variant="outlined"
                  defaultValue="2017-05-24T10:30"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}></Grid> */}
            </Grid>
            <Divider sx={{ margin: "15px 0" }} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
              onClick={handleClick}
            >
              Create
            </LoadingButton>
          </ModalInnerBox>
        </Modal>
      </Box>
    </Box>
  );
};

Assignments.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Assignments;
