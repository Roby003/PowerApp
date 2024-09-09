import { TextField, Typography } from "@mui/material";
import React from "react";

function SetShowItem({ set, index }) {
  return (
    <div className="setItemContainer">
      <div className="setIndexBadge">{index + 1}</div>
      <div className="setInputFields">
        <Typography variant="outlined" className="setInput col col-6">
          {set.weight}Kg x {set.reps} Reps
        </Typography>

        <Typography variant="outlined" className="setInput col col-6">
          {set.rpe}
        </Typography>
      </div>
    </div>
  );
}

export default SetShowItem;
