import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function StatsHomePage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
      </Tabs>
    </Box>
  );
}

export default StatsHomePage;
