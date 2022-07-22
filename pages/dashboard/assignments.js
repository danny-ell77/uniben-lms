import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { DashboardLayout } from "../../components/Layout";
import { ToolBar } from "../../components/shared/ToolBar";
import assignments from "../../__mocks__/assignmentData";
import { Row } from "../../components/shared/TableRow";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";

const MUIRichTextEditor = dynamic(() => import("mui-rte"), { ssr: false });

const MuiBox = styled(Box)(({ theme }) => ({
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

const Assignments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    assignment: false,
    submission: false,
  });

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
          <MuiBox
            sx={{
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
          </MuiBox>
        </Modal>
        <Modal
          open={modalMode.assignment}
          onClose={() => handleModal({ assignment: false })}
        >
          <MuiBox
            sx={{
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
          </MuiBox>
        </Modal>
      </Box>
    </Box>
  );
};

Assignments.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Assignments;
