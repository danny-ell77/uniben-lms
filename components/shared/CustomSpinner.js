import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const SpinnerContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function CustomSpinner({ height }) {
  return (
    <SpinnerContainer>
      <Box sx={{ width: "50%" }}>
        <LinearProgress />
      </Box>
    </SpinnerContainer>
  );
}
