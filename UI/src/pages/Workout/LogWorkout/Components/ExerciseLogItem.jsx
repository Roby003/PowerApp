import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Popover } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useLogContext } from "../../../../contexts/LogWorkoutContext";
import Resources from "../../../../statics/Resources";
import SetListItem from "./SetListItem";
export default function ExerciseLogItem({ exercise, image, setList, clearLogErrors }) {
  const { addSet, removeExercise, exerciseListObj } = useLogContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card variant="elevation" className="exerciseLogItemCard noMarginTop ">
      <CardContent className="cardContent exerciseLogItem">
        <img src={`data:image/jpg;base64,${image}`} className="exerciseImage" />
        <Typography>{exercise.name}</Typography>
      </CardContent>

      <CardContent className="cardContent">
        <div className="setContainer">
          {setList.length > 0 && (
            <div className="setHeader">
              <p className="setIndexBadge">Set</p>
              <div className="setInputFields">
                <p className="col col-3">Reps</p>
                <p className="col col-3" style={{ marginLeft: 3 }}>
                  Weight
                </p>
                <div className="col col-5 ">
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div style={{ width: "fit-content", marginRight: 7 }}>RPE</div>
                    <HelpOutlineIcon
                      fontSize="small"
                      color="primary"
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                    />
                  </div>
                </div>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2, fontSize: 12 }}>{Resources.RPE}</Typography>
                </Popover>
                <IconButton className="hide">
                  <CloseIcon className="hide" />
                </IconButton>
              </div>
            </div>
          )}
          {setList.map((set, index) => (
            <SetListItem
              key={index}
              set={{ ...set }}
              index={index}
              exId={exercise.exerciseId + " "}
              clearLogErrors={clearLogErrors}
            />
          ))}
        </div>
      </CardContent>

      <CardContent className="cardContent flexRight">
        <Button
          variant="outlined"
          className="addSetButton"
          onClick={() => {
            addSet(exercise.exerciseId);
            clearLogErrors();
          }}
        >
          +Add Set
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            removeExercise(exercise.exerciseId);
          }}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
