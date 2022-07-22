import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const ToolBar = ({ page, actionHandler, ...other }) => (
  <Box {...other}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        {capitalize(page)}
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained" onClick={actionHandler}>
          Add {page}
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      {/* <SearchIcon /> */}
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder={`Search ${page}`}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
