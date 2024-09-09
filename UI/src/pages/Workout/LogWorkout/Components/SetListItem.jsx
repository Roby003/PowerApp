import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useLogContext } from "../../../../contexts/LogWorkoutContext";

export default function SetListItem({ set, index, exId, clearLogErrors }) {
  const { exerciseListObj, changeSet, deleteSet } = useLogContext();

  return exerciseListObj[exId] && exerciseListObj[exId].setList ? (
    <div className="setItemContainer">
      <div className="setIndexBadge">{index + 1}</div>
      <div className="setInputFields">
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="setInput col col-3"
          value={exerciseListObj[exId].setList[index].reps ?? ""}
          type="number"
          onChange={(e) => {
            clearLogErrors();
            changeSet(exId, index, "reps", e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="setInput col col-3"
          value={exerciseListObj[exId].setList[index].weight ?? ""}
          type="number"
          onChange={(e) => {
            clearLogErrors();
            changeSet(exId, index, "weight", e.target.value);
          }}
        />

        <Slider
          className="setInput col col-5"
          value={exerciseListObj[exId].setList[index].rpe ?? 5}
          onChange={(e) => changeSet(exId, index, "rpe", e.target.value)}
          valueLabelDisplay="auto"
          shiftStep={2}
          step={1}
          marks
          min={1}
          max={10}
        />
        <IconButton
          onClick={() => {
            deleteSet(exId, index);
          }}
        >
          <CloseIcon color="warning" />
        </IconButton>
      </div>
    </div>
  ) : (
    <></>
  );
}

// set structure
// {
//  reps:
//  weight:
//  rpe:
//  }
