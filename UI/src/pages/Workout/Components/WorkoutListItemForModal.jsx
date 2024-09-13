import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmRemoveModal from "../../../components/utility/ConfirmRemoveModal";
import PageResources from "../../../resources/PageResources";
import useTemplateService from "../../../services/TemplateService";
import useWorkoutService from "../../../services/WorkoutService";
import Paths from "../../../statics/Paths";
import Resources from "../../../statics/Resources";
import useUtils from "../../../utils/Utils";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
import CommentListWithScroll from "./CommentListWithScroll";
import ExerciseShowListItem from "./ExerciseShowListItem";
import LikeButton from "./LikeButton";
import WriteComment from "./WriteComment";

// workout object structure
// {
//   createdDate: "2024-08-10T15:23:29.2";
//
//   exercises: [
//     {
//       exerciseId : 1,
//       name: "TestExercise",
//       image: "",
//       sets: [
//         {
//           reps: 20,
//           weight: 223,
//           rpe: 5,
//         },
//         {
//           reps: 222,
//           weight: 222,
//           rpe: 10,
//         },
//       ],
//     },
//   ];
//   note: note;
//   user:{
//        id:
//        username:
//        email:
//        roleId:
//      }
// }
function WorkoutListItemForModal({ workout, ownPageFlag, triggerReload }) {
  const [triggerCommentReload, setTriggerCommentReload] = useState(false);
  const reloadComments = () => setTriggerCommentReload(!triggerCommentReload);
  const { parseDate } = useUtils();
  const validator = new Validator()
    .forProperty("title")
    .check(VALIDATIONS.isRequired, "title is required")
    .applyCheckOnlyOnSubmit();

  const { addTemplate } = useTemplateService();
  const { removeWorkout } = useWorkoutService();
  const {
    values: formData,
    errors: formErrors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
  } = useValidation(validator);

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
    if (!handleCheckFormErrors()) {
      try {
        await saveAsTemplate();
        setAnchorEl(null);
      } catch (err) {
        console.log("here", err.message);

        applyErrorsFromApi(err.message.errors);
      }
    }
  };

  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const openSettings = Boolean(anchorElSettings);
  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const saveAsTemplate = async () => {
    const templateDto = workout.exercises.map((ex) => {
      return { ExerciseId: ex.exerciseId, Sets: ex.sets.length };
    });
    await addTemplate({ Title: formData.title, exerciseDTOs: templateDto });
  };

  return (
    <Card variant="elevation" className="workoutListItem" sx={{ width: "100%" }}>
      <CardContent className="workoutListHeaders ">
        <div className="row">
          <div className="col col-6">
            <div className="row">
              <img src={`data:image/jpg;base64,${workout.user.image}`} className="exerciseImage" />

              <div className="col col-10">
                <Link to={`${Paths.profileBuilder}${workout.user.id}`}>
                  <CardActionArea sx={{ width: "fit-content" }}>
                    <Typography>{workout.user.userName} </Typography>
                    {workout.user.roleId == 3 && <VerifiedIcon fontSize="" className="verifiedIcon" />}
                  </CardActionArea>
                </Link>
              </div>
            </div>
          </div>
          <div className="col col-6 flexRight flexStart">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={openSettings ? "long-menu" : undefined}
              aria-expanded={openSettings ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickSettings}
            >
              <MoreVertIcon sx={{ color: "#1976d2" }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorElSettings}
              open={openSettings}
              onClose={handleCloseSettings}
            >
              <MenuItem onClick={handleClick}>{PageResources.feedPage.SaveAsTemplate}</MenuItem>
              {ownPageFlag && (
                <MenuItem>
                  <ConfirmRemoveModal
                    entityName={"workout"}
                    entityTitle={`on ${workout.createdDate.split("T")[0]}`}
                    lambdaOnDelete={() => {
                      removeWorkout(workout.workoutId).then(triggerReload);
                    }}
                    buttonVariant="none"
                  />
                </MenuItem>
              )}
            </Menu>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>{Resources.TemplateAddTitle}</Typography>
              <CardContent>
                <FormControl>
                  <TextField
                    error={formErrors.title}
                    name="title"
                    value={formData.title}
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    onChange={onChangeInput}
                  />
                </FormControl>
                {formErrors["title"] && <Alert severity="error">{formErrors["title"]}</Alert>}
              </CardContent>
              <div className="saveTemplateButton">
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Save
                </Button>
              </div>
            </Popover>
            <LikeButton workoutId={workout.workoutId} />
          </div>
        </div>
        <div>
          <div className="row">
            <div>{workout.note}</div>
          </div>
          <Typography className="subTitle">{parseDate(workout.createdDate)}</Typography>
        </div>
      </CardContent>
      <Divider />
      <div className="workoutPostSubtitle">Workout</div>
      {workout.exercises.map((ex, index) => (
        <ExerciseShowListItem key={index} exercise={ex} />
      ))}
      <Divider />
      <div className="workoutPostSubtitle">Comments</div>

      <CommentListWithScroll workoutId={workout.workoutId} reloadComments={reloadComments} ownPageFlag={ownPageFlag} />
      <CardContent sx={{ paddingTop: 0 }}>
        <WriteComment workoutId={workout.workoutId} reloadComments={reloadComments} />
      </CardContent>
    </Card>
  );
}

export default WorkoutListItemForModal;
