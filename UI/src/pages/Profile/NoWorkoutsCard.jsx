import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleIcon from "@mui/icons-material/People";
import BigDumbellPng from "../../components/svg/BigDumbellPng.jsx";
import BicepCurlPng from "../../components/svg/BicepCurlPng.jsx";
import * as React from "react";

import Resources from "../../statics/Resources.js";
function NoWorkoutsCard() {
  return (
    <Card variant="" className="logWorkoutCardWrapper">
      <Card variant="elevation" className="exerciseLogItemCard noMarginTop">
        <div className="emptyFeed">
          {/* <PeopleIcon fontSize="large" color="primary" /> */}
          {/* <BigDumbellPng/> */}
          <BicepCurlPng />
          <div className="emptyLogTitle">{Resources.NoWorkoutsTitle}</div>
          <div className="subTitle">{Resources.NoWorkouts}</div>
        </div>
      </Card>
    </Card>
  );
}

export default NoWorkoutsCard;
