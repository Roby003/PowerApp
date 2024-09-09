import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleIcon from "@mui/icons-material/People";

import * as React from "react";

import BarbellSvg from "../../components/svg/BarbellSvg";
import Resources from "../../statics/Resources.js";
import { IconBase } from "react-icons";
function EmptyFeedCard() {
  return (
    <Card variant="" className="logWorkoutCardWrapper  marginTop">
      <CardContent className="noPaddingTop">
        <Card variant="elevation" className="exerciseLogItemCard">
          <div className="emptyFeed">
            <PeopleIcon fontSize="large" color="primary" />
            <div className="emptyLogTitle">{Resources.EmptyFeedTitle}</div>
            <div className="subTitle">{Resources.EmptyFeed}</div>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}

export default EmptyFeedCard;
