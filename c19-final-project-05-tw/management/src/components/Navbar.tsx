import { SickTwoTone } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  AppBar,
  Avatar,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { userInfo } from "os";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutThunk } from "../redux/auth/thunks";
import { IRootThunkDispatch } from "../redux/store";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#022A54",
});

const settings = ["Profile", "Sign Out"];

const Navbar = () => {
  const dispatch = useDispatch<IRootThunkDispatch>();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = (setting: string) => () => {
    setAnchorElUser(null);

    if (setting === "Sign Out") {
      dispatch(logoutThunk());
    } else if (setting === "Profile") {
      navigate("/userInfo");
    }
  };

  const directToHomePage = () => navigate("/");

  const location = useLocation();

  let pageLocation = "";

  if (location.pathname === "/") {
    pageLocation = "Your Project";
  } else if (location.pathname.slice(0, 10) == "/subitems/") {
    pageLocation = "Subitem Page";
  } else if (location.pathname.slice(0, 15) == "/projectDetail/") {
    pageLocation = "CheckList Page";
  } else if (location.pathname.slice(0, 13) == "/subitemimage") {
    pageLocation = "Subitem Image";
  } else if (location.pathname.slice(0, 6) == "/users") {
    pageLocation = "   Admin Dash Board ";
  } else if (location.pathname.slice(0, 9) == "/userInfo") {
    pageLocation = "Profile";
  }

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          marginLeft="16px"
          variant="h6"
          color="white"
          onClick={directToHomePage}
        >
          {pageLocation}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 30, height: 30, marginRight: "5px" }}
              //UserIcon
              src="/static/images/avatar/1.jpg"
            />
          </IconButton>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleClose}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
