import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillBell,
  AiOutlineUser,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import AccountPopover from "./AccountPopover";

// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import { Bell as BellIcon } from '../icons/bell';
// import { UserCircle as UserCircleIcon } from '../icons/user-circle';
// import { Users as UsersIcon } from '../icons/users';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            md: 200,
            lg: 280,
          },
          width: {
            md: "calc(100% - 200px)",
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <AiOutlineMenu />
            {/* <MenuIcon fontSize="small" /> */}
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <AiOutlineSearch />
              {/* <SearchIcon fontSize="small" /> */}
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Classmates">
            <IconButton sx={{ ml: 1 }}>
              <AiOutlineUser />
              {/* <UsersIcon fontSize="small" /> */}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <AiFillBell />
                {/* <BellIcon fontSize="small" /> */}
              </Badge>
            </IconButton>
          </Tooltip>
          <AccountPopover />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
