import AdbIcon from "@mui/icons-material/Adb";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Modal, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import Paths from "../../statics/Paths";
import userSession from "../../utils/userSession";
function Navbar() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [pages, setPages] = React.useState([]);
  const [authState, setAuthState] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuth, setIsAuth } = useAccount();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState([]);
  const navigate = useNavigate();

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleModalState = (value) => {
    setModalIsOpen(value);
  };

  React.useEffect(() => {
    setAuthState(isAuth);
  }, [isAuth]);

  const handleLogout = () => {
    handleModalState(false);
    setAnchorElUser(null);
    navigate(Paths.landing);
    userSession.clearAuthSession();
    setIsAuth(false);
  };

  React.useEffect(() => {
    if (authState) {
      if (userSession.user().roleId !== 1) {
        setPages([
          {
            name: "Log Workout",
            route: Paths.logWorkout,
            icon: <FitnessCenterIcon />,
          },
          { name: "Feed", route: Paths.feed, icon: <DensitySmallIcon /> },
          { name: "Profile", route: Paths.myProfile, icon: <PersonIcon /> },
        ]);
      } else {
        setPages([
          { name: "Log Workout", route: Paths.logWorkout, icon: <FitnessCenterIcon /> },
          { name: "Feed", route: Paths.feed, icon: <DensitySmallIcon /> },
          { name: "Profile", route: Paths.myProfile, icon: <PersonIcon /> },
          { name: "Admin Panel", route: Paths.admin, icon: <AdminPanelSettingsIcon /> },
        ]);
      }
      authState ? setSettings([{ name: "Profile", route: Paths.myProfile }]) : [];
    }
  }, [authState]);

  React.useEffect(() => {
    if (userSession.isAuthenticated())
      if (
        window.location.href.split("9000")[1] == `/profile/${userSession.user().id}` ||
        window.location.href.split("9000")[1] == `/myProfile`
      )
        setValue(2);
    if (window.location.href.split("9000")[1] == `/feed`) setValue(1);
    if (window.location.href.split("9000")[1] == `/workout/create`) setValue(0);
    if (window.location.href.split("9000")[1].split("/")[1] == `admin`) setValue(3);
  }, [window.location.href]);

  return (
    <AppBar
      position="static"
      className="app-navbar"
      sx={{
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to={"/feed"}>
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
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PowerApp
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.route}>{page.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {authState && (
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="navbarTabWrapper"
                >
                  {pages.map((page) => (
                    <Tab
                      icon={page.icon}
                      label={page.name}
                      onClick={() => navigate(page.route)}
                      className="navbarTab"
                    />
                  ))}
                </Tabs>
              </Box>
            )}
          </Box>

          {authState ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button textAlign="center" onClick={() => handleModalState(true)}>
                Logout
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
      <Modal open={modalIsOpen} onClose={() => handleModalState(false)}>
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Are you sure you want to logout?</h2>
          <div className="flexRight">
            <Button onClick={handleLogout}>Logout</Button>
            <Button onClick={() => handleModalState(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </AppBar>
  );
}
export default Navbar;
