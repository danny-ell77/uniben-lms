import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Card, Container, Typography } from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";

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
  color: "#ffffff",
  margin: theme.spacing(2, 0, 2, 2),
  backgroundImage: "url(/static/images/register_mockup.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    position: "fixed",
    minHeight: "100vh",
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
  [theme.breakpoints.up("md")]: {
    marginLeft: 467,
  },
  [theme.breakpoints.down("sm")]: {
    backgroundImage: "url(/static/images/register_mockup.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backdropFilter: "blur(4px)",
    // filter: "blur(4px)",
  },
}));

export default function Register() {
  // const smUp = useResponsive("up", "sm");

  // const mdUp = useResponsive("up", "md");

  return (
    <RootStyle>
      <HeaderStyle>
        <Typography variant="body2" sx={{ mt: { md: -2 } }}>
          Already have an account? {""}
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </Typography>
      </HeaderStyle>

      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage school work effectively with U-LMS
        </Typography>
        {/* <img alt="register" src="/static/images/register_mockup.jpg" /> */}
      </SectionStyle>

      <StyledContainer>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Before you get started, tell us about yourself.
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Don&lsquo;t worry, your information is secure with us.
          </Typography>

          {/* <AuthSocial /> */}

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to U-LMS&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            {""}and{""}
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </Typography>
        </ContentStyle>
      </StyledContainer>
    </RootStyle>
  );
}

/**
 * Mobile Background Style
 * body {
  background-image: url("https://mdbootstrap.com/wp-content/uploads/2019/02/back.jpg");
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  filter: blur(4px);
  background-size: cover; }

  const MobileContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "red",
  },
}));
 */
