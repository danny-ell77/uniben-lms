import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { formatDistance, parseISO } from "date-fns";
import dynamic from "next/dynamic";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DashboardLayout } from "../../components/Layout";
import { ToolBar } from "../../components/shared/ToolBar";
import { useEditSubmissionMutation, useGetSubmissionsQuery, useGetSingleAssignmentQuery } from "../../lib/services/otherAPI";
import { LoadingButton } from "@mui/lab";


const MUIRichTextEditor = dynamic(() => import("mui-rte"), { ssr: false });

const Row = (props) => {
  const { row } = props;

  const [editSubmission, { isLoading }] = useEditSubmissionMutation()
  const {data: {data: assignment = {}} = {}} = useGetSingleAssignmentQuery(row.assignment)
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = useState({
    remark: "",
    score: 0
  })
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setOpen(true);
    setEdit(!edit);
  };
  const dueIn = "--"
  if (assignment?.due) {
    const date = parseISO(assignment?.due);
     dueIn = formatDistance(date, Date.now(), { addSuffix: true }) ?? "";
    
  }

  const handleScoreChange = e => {
    const { name, value } = e.target
    console.log(name, value)
      setScore(prev => ({...prev, [name]: value}))
  }

  const submitScore = async () => {
    console.log(score)
    await editSubmission({id:row.id, body:score}).unwrap()
  }

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
        {/* <TableCell component="th" scope="row">
          {row.assignment.code}
        </TableCell> */}
        <TableCell>{assignment.course}</TableCell>
        <TableCell>{row.instructor_name}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{dueIn}</TableCell>
        <TableCell>{row.score}</TableCell>
        <TableCell>{assignment.marks}</TableCell>
        <TableCell>{row.remark}</TableCell>
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
                  value={row.content}
                  toolbar={edit}
                  label="Type something here..."
                  inlineToolbar={edit}
                />

                <Typography variant="h6" gutterBottom component="div">
                  Attachments:
                </Typography>
                <a target="_blank" href={row?.file}>{row?.file?.split("?")[0] ?? "--"}</a>
                <Typography variant="h6" gutterBottom component="div">
                  Instructor:
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <TextField
                      label="Remark"
                      name="remark"
                      onChange={handleScoreChange}
                      required
                      value={score.remark}
                      variant="outlined"
                    />{" "}
                    <TextField
                      label="Score"
                      type="number"
                      name="score"
                      onChange={handleScoreChange}
                      required
                      value={score.score}
                      variant="outlined"
                    />
                  </Box>
                  <LoadingButton color="primary" variant="contained" sx={{ mx: 2 }} onClick={submitScore} loading={isLoading}>
                    Mark
                  </LoadingButton>
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
  const { data: {data = []} = {} } = useGetSubmissionsQuery();
  console.log(data)
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
                {/* <TableCell>Assignment Code</TableCell> */}
                <TableCell>Course</TableCell>
                <TableCell>{student ? "Instructor" : "Student"}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <Row key={row.id} row={row} setModalOpen={setModalOpen} />
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
