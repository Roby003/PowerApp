import { AppBar, Box, Container, Stack, Tab, Tabs, Toolbar } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Paths from "../statics/Paths";

function AdminPanel() {
  const [value, setValue] = React.useState("Feed");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  let pages = [
    { name: "Exercises", route: Paths.exercisePage },
    { name: "Categories", route: Paths.categoryPage },
    { name: "Athlete Applications", route: Paths.coachApplications },
  ];
  return (
    <>
      <AppBar
        position="static"
        className="adminPanelNavbar"
        sx={{
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {pages.map((page) => (
                    <Tab key={page.name} label={page.name} onClick={() => navigate(page.route)} />
                  ))}
                </Tabs>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Stack marginX={"5rem"}>
        <Outlet />
      </Stack>
    </>
  );
}

export default AdminPanel;
