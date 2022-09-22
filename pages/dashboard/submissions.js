import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import EditOffIcon from "@mui/icons-material/EditOff";
import dynamic from "next/dynamic";
import * as React from "react";
import { useState } from "react";
import { DashboardLayout } from "../../components/Layout";
import { ToolBar } from "../../components/shared/ToolBar";
import assignments from "../../__mocks__/assignmentData";
import submissions from "../../__mocks__/submissionsData";
import { useGetSubmissionsQuery } from "../../lib/services/otherAPI";
import { useSelector } from "react-redux";

const MUIRichTextEditor = dynamic(() => import("mui-rte"), { ssr: false });

const Row = (props) => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setOpen(true);
    setEdit(!edit);
  };
  const { row } = props;
  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": {
            // backgroundColor: "#000",
            "& .editTip": {
              opacity: 1,
            },
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.code}
        </TableCell>
        <TableCell>{row.course}</TableCell>
        <TableCell>{row.instructor}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.due}</TableCell>
        <TableCell>{row.marks}</TableCell>
        <TableCell>{row.marks}</TableCell>
        <TableCell
          className="editTip"
          sx={{ opacity: 0, transition: "ease-in-out", margin: 0, padding: 0 }}
        >
          <Tooltip title="Edit Submission">
            <IconButton sx={{ ml: 1 }} onClick={toggleEdit}>
              {edit ? <EditOffIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  Answer:
                </Typography>

                <MUIRichTextEditor
                  readOnly={!edit}
                  value={JSON.stringify(submissions)}
                  toolbar={edit}
                  label="Type something here..."
                  inlineToolbar={edit}
                />
                <Typography variant="h6" gutterBottom component="div">
                  Instructor:
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <TextField
                      label="Remark"
                      name="remark"
                      onChange={() => {}}
                      required
                      value={""}
                      variant="outlined"
                    />{" "}
                    <TextField
                      label="Score"
                      type="number"
                      name="score"
                      onChange={() => {}}
                      required
                      value={""}
                      variant="outlined"
                    />
                  </Box>

                  <Button color="primary" variant="contained" sx={{ mx: 2 }}>
                    Mark
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Submissions = () => {
  const { data } = useGetSubmissionsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    user: { student = null },
  } = useSelector((state) => state.auth);
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
        <ToolBar page="submission" />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Assignment Code</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>{student ? "Instructor" : "Student"}</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((row) => (
                <Row key={row.code} row={row} setModalOpen={setModalOpen} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box>
        <Modal open={modalOpen} onClose={handleClose}>
          <Box
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
            <Box
              sx={{
                top: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Submission
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
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
                      toolbar={true}
                      label="Type something here..."
                      inlineToolbar={true}
                    />
                  </Box>
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
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

Submissions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Submissions;
