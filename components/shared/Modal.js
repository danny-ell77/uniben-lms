import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const MuiModal = ({ children, modalOpen, handleClose, headerText }) => (
  <Modal open={true} onClose={() => {}}>
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {headerText}
      </Typography>
      <IconButton onClick={() => {}}>
        <CloseIcon />
      </IconButton>
    </Stack>
    <Divider sx={{ margin: "15px 0" }} />
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
      {children}
    </Box>
  </Modal>
);

export default MuiModal;
