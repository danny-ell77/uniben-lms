import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../lib/alertSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContainer = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alert);
  const { display, vertical, horizontal, type, message } = alertState;

  const handleClose = () => {
    dispatch(reset());
  };

  return (
    <Snackbar
      open={display}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertContainer;
