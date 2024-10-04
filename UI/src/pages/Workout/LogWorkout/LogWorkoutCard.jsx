import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { Alert, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarbellSvg from "../../../components/svg/BarbellSvg.jsx";
import { useLogContext } from "../../../contexts/LogWorkoutContext";
import Paths from "../../../statics/Paths.js";
import Resources from "../../../statics/Resources.js";
import userSession from "../../../utils/userSession.js";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
import ExerciseLogItem from "./Components/ExerciseLogItem";
import { styled } from "@mui/material/styles";

export default function LogWorkoutCard() {
  const { exerciseListObj, createTemplateFromWrk, logWorkout, templateIdState, pullPreviousWorkout } = useLogContext();
  const [note, setNote] = React.useState();
  const [imageList, setImageList] = React.useState([]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const validator = new Validator()
    .forProperty("title")
    .check(VALIDATIONS.isRequired, "title is required")
    .applyCheckOnlyOnSubmit();

  const validatorLog = new Validator().forProperty("setsDto").applyCheckOnlyOnSubmit();
  const {
    values: formData,
    errors: formErrors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
  } = useValidation(validator);

  const {
    values: logData,
    errors: logErrors,
    setErrors: setLogErrors,
    applyErrorsFromApi: applyErrorsFromApiForLog,
  } = useValidation(validatorLog);

  const clearLogErrors = () => {
    Object.keys(logErrors).forEach((key) => {
      setLogErrors({ ...logErrors, [key]: "" });
    });
  };

  const navigate = useNavigate();
  /// popover component
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  ///

  const handleSubmit = async () => {
    if (!handleCheckFormErrors() && Object.keys(exerciseListObj).length > 0) {
      try {
        await createTemplateFromWrk(formData.title, applyErrorsFromApi);
        setAnchorEl(null);
      } catch (err) {
        console.log(err);
        applyErrorsFromApi(err.message.errors);
      }
    }
  };

  const handleLogSubmit = async () => {
    try {
      debugger;
      await logWorkout(note, imageList, applyErrorsFromApiForLog).then(() =>
        navigate(`${Paths.profileBuilder}${userSession.user().id}`)
      );
    } catch (err) {
      applyErrorsFromApiForLog(err.message.errors);
    }
  };

  return (
    <Box className="centerCard col-6">
      {Object.keys(exerciseListObj).length == 0 && (
        <Card variant="" className="logWorkoutCardWrapper">
          <CardContent className="noPaddingTop">
            <Card variant="elevation" className="exerciseLogItemCard noMarginTop">
              <div className="emptyLog">
                <BarbellSvg className="emptyLogSvg" />
                <div className="emptyLogTitle">{Resources.EmptyLogTitle}</div>
                <div className="subTitle">{Resources.EmptyLog}</div>
              </div>
            </Card>
          </CardContent>
        </Card>
      )}
      <Card variant="" className="logWorkoutCardWrapper">
        <CardContent className="noPaddingTop">
          {exerciseListObj &&
            Object.keys(exerciseListObj).map((exId) => (
              <ExerciseLogItem
                key={exId.trim()}
                exercise={exerciseListObj[exId].exercise}
                setList={exerciseListObj[exId].setList}
                image={exerciseListObj[exId].image}
                clearLogErrors={clearLogErrors}
              />
            ))}

          <div className="input-wrapper">
            <div className="row">
              <div className="inputLabel">Note</div>
            </div>
            <div className="row">
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="workoutNoteInput"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                multiline
              />
            </div>
          </div>
        </CardContent>
        <CardContent>
          {typeof exerciseListObj != undefined && exerciseListObj != null && Object.keys(exerciseListObj).length > 0 ? (
            <div className="flexRight">
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={async () => {
                  await handleLogSubmit();
                }}
              >
                <Typography> Log Workout </Typography>
              </Button>
              <div className="flexRight">
                {templateIdState != null && (
                  <Button size="medium" variant="outlined" onClick={() => pullPreviousWorkout(templateIdState)}>
                    <Typography> Previous Workout</Typography>
                  </Button>
                )}
                <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
                  <Typography> Save as Template</Typography>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flexRight">
              <Button disabled>Save as Template</Button>
              <Button disabled>Log Workout</Button>
            </div>
          )}
          {logErrors["setsDto"] && <Alert severity="error">{logErrors["setsDto"]}</Alert>}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography sx={{ p: 2, paddingBottom: 0 }}>{Resources.enterTemplateTitle}</Typography>

            <CardContent>
              <FormControl>
                <TextField
                  error={formErrors.title}
                  name="title"
                  value={formData.title}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={onChangeInput}
                />
              </FormControl>
              {formErrors["title"] && <Alert severity="error">{formErrors["title"]}</Alert>}
              {Object.keys(exerciseListObj).length === 0 && (
                <Alert severity="error">{Resources.WorkoutWithNoExError}</Alert>
              )}
            </CardContent>
            <div className="saveTemplateButton">
              <Button variant="contained" onClick={() => handleSubmit()}>
                Save
              </Button>
            </div>
          </Popover>
        </CardContent>
        <CardContent>
          <div className="row">
            <div className="col-3">
              <div className="inputLabel">{Resources.ImageSelect}</div>

              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    setImageList([
                      ...imageList,
                      e.target.files && e.target.files.length > 0 ? e.target.files[0] : undefined,
                    ]);
                  }}
                />
              </Button>
              {imageList.map((file) => (
                <div style={{ alignItems: "center" }}>{file.name}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
