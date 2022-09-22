import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import AssignmentForm from "../../components/assignments/AssignmentForm";
import { DashboardLayout } from "../../components/Layout";
import { Row } from "../../components/shared/TableRow";
import { ToolBar } from "../../components/shared/ToolBar";
import SubmissionForm from "../../components/submissions/SubmissionForm";
import assignments from "../../__mocks__/assignmentData";
import { useGetAssignmentsQuery } from "../../lib/services/otherAPI";

const Assignments = () => {
  const { data: { data = [] } = {} } = useGetAssignmentsQuery();
  const [modalMode, setModalMode] = useState({
    assignment: false,
    submission: false,
  });

  const [submissionData, setSubmissionData] = useState({
    instructor: "",
    assignmentId: "",
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleModal = (mode) => setModalMode((prev) => ({ ...prev, ...mode }));

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
              {data.map((row) => (
                <Row
                  key={row.code}
                  row={row}
                  setSubmissionData={setSubmissionData}
                  setModalOpen={() => handleModal({ submission: true })}
                />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={assignments.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Container>
      <Box>
        <SubmissionForm
          data={submissionData}
          open={modalMode.submission}
          handleModal={handleModal}
        />

        <AssignmentForm open={modalMode.assignment} handleModal={handleModal} />
      </Box>
    </Box>
  );
};

Assignments.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Assignments;
