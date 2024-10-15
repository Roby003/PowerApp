import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Paths from "../../statics/Paths";
import useUtils from "../../utils/Utils";
const { stringFormat } = useUtils();

const defaultPages = [
  { name: "Exercises", route: "" },
  {
    name: "Templates",
    route: "",
  },
  {
    name: "Personal",
    route: "",
  },
];

function StatsHomePage() {
  const { userId } = useParams();

  const statsPages = [
    { name: "Exercises", route: stringFormat(Paths.stats_exercises_builder, userId) },
    {
      name: "Templates",
      route: stringFormat(Paths.stats_templates_builder, userId),
    },
    {
      name: "Personal",
      route: stringFormat(Paths.stats_personal_builder, userId),
    },
  ];
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <div className="row">
      <Box
        sx={{
          height: "100%",
          width: "100%",
          minHeight: "80vh",
          maxHeight: "80vh",
          marginLeft: "-80px",
          display: "flex",
          alignItems: "center",
        }}
        className="col col-1"
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
        >
          {statsPages.map((page) => (
            <Tab key={page.name} label={page.name} onClick={() => navigate(page.route)} sx={{ fontWeight: "bold" }} />
          ))}
        </Tabs>
      </Box>
      <Outlet />
      {
        (window.onload = () => {
          navigate(statsPages[0].route);
          console.log("nav");
        })
      }

      <Navigate to={statsPages[0].route} />
    </div>
  );
}

export default StatsHomePage;
