import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { notify, reset } from "../src/alertSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContainer = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alert);
  const { display, vertical, horizontal, type, message } = alertState;
  console.log(alertState);

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
