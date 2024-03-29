import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
// import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
// import { Cog as CogIcon } from "../icons/cog";
// import { Lock as LockIcon } from "../icons/lock";
// import { Selector as SelectorIcon } from "../icons/selector";
// import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
// import { User as UserIcon } from "../icons/user";
// import { UserAdd as UserAddIcon } from "../icons/user-add";
// import { Users as UsersIcon } from "../icons/users";
// import { XCircle as XCircleIcon } from "../icons/x-circle";
// import { Logo } from "./logo";
import PublishIcon from "@mui/icons-material/Publish";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedIcon from "@mui/icons-material/Feed";
import { NavItem } from "./nav-item";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from "@mui/material/styles";

const items = [
  {
    href: "/dashboard/",
    icon: <HomeIcon fontSize="small" />,
    title: "Home",
  },
  {
    href: "/dashboard/assignments",
    icon: <AssignmentIcon fontSize="small" />,
    title: "Assignments",
  },
  {
    href: "/dashboard/submissions",
    icon: <PublishIcon fontSize="small" />,
    title: "Submissions",
  },
  {
    href: "/dashboard/chat",
    icon: <ForumIcon fontSize="small" />,
    title: "Chat",
  },
  {
    href: "/dashboard/materials",
    icon: <FeedIcon fontSize="small" />,
    title: "Course Materials",
  },
  // {
  //   href: "/dashboard/activity",
  //   icon: <FeedIcon fontSize="small" />,
  //   title: "Activity",
  // },
  // {
  //   href: "/dashboard/settings",
  //   icon: <SettingsIcon fontSize="small" />,
  //   title: "Settings",
  // },
  {
    href: "/dashboard/profile",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Profile",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "flex-end",
}));

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const handleDrawerClose = () => onClose?.();

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {!lgUp && (
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <AiOutlineClose />
            </IconButton>
          </DrawerHeader>
        )}
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                {/* <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                /> */}
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  UNIBEN LMS
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Student
                </Typography>
              </div>
              {/* <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              lgUp={lgUp}
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: {
              md: 200,
              lg: 280,
            },
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: "100%",
        },
      }}
      // sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
