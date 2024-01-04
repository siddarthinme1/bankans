import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth, db, logout } from "../../Firebase/Firebase";
import { Container, Grid } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";

const navigationPages = [
  { label: "Home", route: "/homepage" },
  { label: "Transactions", route: "transactions" },
  { label: "LIC", route: "displaylicdata" },
  { label: "Vehicle Insurance", route: "vehicleinsurance" },
  { label: "Create User", route: "register" },
  { label: "About", route: "about" },
];

const settings = ["Profile", "Account", "Dashboard"];

function AppBarX() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(Context);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route) => {
    setAnchorElNav(null);
    navigate(route);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogIn = () => {
    navigate("/");
  };

  const handleLogOut = async () => {
    setIsLoggedIn(false);
    await auth.signOut();
    navigate("/");
  };

  const user = auth.currentUser;

  const profileButton = (
    <>
      <MenuItem
        onClick={user ? handleLogOut : handleLogIn}
        startIcon={user ? <LogoutIcon /> : <LoginIcon />}
        title="LogInCheck"
      >
        <Typography textAlign="center">{user ? "Logout" : "Login"}</Typography>
      </MenuItem>
    </>
  );

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SavingsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ANS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={() => handleCloseNavMenu()}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {navigationPages.map((page) => (
                    <MenuItem
                      key={page.route}
                      onClick={() => handleCloseNavMenu(page.route)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <SavingsIcon />
              </IconButton>
            )}
          </Box>

          <SavingsIcon
            sx={{
              display: { xs: isLoggedIn ? "flex" : "none", md: "none" },
              mr: 1,
            }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ANS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigationPages.map((page) => (
              <Button
                key={page.route}
                onClick={() => handleCloseNavMenu(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={user?.photoURL}>
                    {user?.displayName &&
                      user.displayName
                        .split(" ")
                        .map((namePart) => namePart[0].toUpperCase())
                        .join("")}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  onClick={handleLogIn}
                  sx={{ color: "white", padding: 0 }}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              )}
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              {profileButton}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppBarX;
