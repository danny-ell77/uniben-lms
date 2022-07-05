import { Link as NextLink } from "next/link";
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    backgroundImage: "url(/static/images/login_mockup.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    backgroundImage: "url(/static/images/login_mockup.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backdropFilter: "blur(5px)",
    // filter: "blur(4px)",
  },
}));

export default function Login() {
  return (
    <RootStyle>
      <HeaderStyle>
        <Typography variant="body2" sx={{ mt: { md: -2 } }}>
          Don&lsquo;t have an account? {""}
          <Link href="/auth/register">Get started</Link>
        </Typography>
      </HeaderStyle>

      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        {/* <img src="/static/images/login_mockup.png" alt="login" /> */}
      </SectionStyle>

      <StyledContainer maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Sign in to U-LMS
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Dont have an account?{" "}
            <Link href="/auth/register">Get started</Link>
          </Typography>
        </ContentStyle>
      </StyledContainer>
    </RootStyle>
  );
}
