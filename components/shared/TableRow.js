import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";

export const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
        <TableCell>{row.instructor}</TableCell>
        <TableCell>{row.course}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.due}</TableCell>
        <TableCell>{row.marks}</TableCell>
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
                  Question(s):
                </Typography>
                <Typography variant="p" component="div">
                  {row.question}
                </Typography>
              </Box>
              <Box>
                <Tooltip title="Create Submission">
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={() => props.setModalOpen(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Submission">
                  <IconButton sx={{ ml: 1 }}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Submission">
                  <IconButton sx={{ ml: 1 }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
