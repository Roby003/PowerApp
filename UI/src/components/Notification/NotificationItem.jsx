import { MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImg from "../../assets/images/default_profile.jfif";
import WorkoutModal from "../../pages/Workout/Components/WorkoutModal";
import useAuthService from "../../services/UserService";
import Paths from "../../statics/Paths";
import useUtils from "../../utils/Utils";
function NotificationItem({ notification, handleClose }) {
  const [image, setImage] = useState(null);
  const { getUserImage } = useAuthService();
  const { parseTimeSpan } = useUtils();
  useEffect(() => {
    async function load() {
      setImage(await getUserImage(notification.createdBy));
    }

    load();
  }, []);
  const navigate = useNavigate();
  const [userName, ...rest] = notification.description.split(" ");

  const description = rest.join(" ");
  const [open, setOpen] = React.useState(false);
  const handleOpenWorkout = () => setOpen(true);
  const handleCloseWorkout = () => setOpen(false);

  function giveTimePassed() {
    let timeObject = parseTimeSpan(notification.timeSpanDiff);
    if (timeObject.days === 0) {
      if (timeObject.hours === 0) {
        if (timeObject.minutes === 0) {
          return (
            <div style={{ fontSize: 13 }} className="subTitle">
              {timeObject.seconds}s
            </div>
          );
        } else {
          return (
            <div style={{ fontSize: 13 }} className="subTitle">
              {timeObject.minutes}m
            </div>
          );
        }
      } else {
        return (
          <div style={{ fontSize: 13 }} className="subTitle">
            {timeObject.hours}h
          </div>
        );
      }
    } else {
      return (
        <div style={{ fontSize: 13 }} className="subTitle">
          {timeObject.days}d
        </div>
      );
    }
  }
  return (
    <>
      {notification.workoutId === null ? (
        <MenuItem sx={{ paddingLeft: 1 }} className="noHoverEffects" disableRipple onClick={() => {}}>
          <div style={{ maxWidth: 470, overflow: "hidden" }}>
            <div className="row noWrap alignCenter">
              {image ? (
                <img src={`data:image/jpg;base64,${image}`} className="smallUserImage" />
              ) : (
                <img src={defaultProfileImg} className="smallUserImage" />
              )}

              <Typography
                sx={{ fontWeight: "bold", fontSize: 13, marginRight: 0.5 }}
                className="widthFitContent hoverBlue"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                  navigate(`${Paths.profileBuilder}${notification.createdBy}`);
                }}
              >
                {userName}
              </Typography>

              <Typography sx={{ fontSize: 13 }} className="widthFitContent">
                {description}
              </Typography>
            </div>
          </div>
          <div style={{ fontSize: 13 }}>{"..."}</div>
          {giveTimePassed()}
        </MenuItem>
      ) : (
        <MenuItem sx={{ paddingLeft: 1 }} onClick={() => handleOpenWorkout()}>
          <div style={{ maxWidth: 470, overflow: "hidden" }}>
            <div className="row noWrap alignCenter">
              {image ? (
                <img src={`data:image/jpg;base64,${image}`} className="smallUserImage" />
              ) : (
                <img src={defaultProfileImg} className="smallUserImage" />
              )}

              <Typography
                sx={{ fontWeight: "bold", fontSize: 13, marginRight: 0.5 }}
                className="widthFitContent hoverBlue"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                  navigate(`${Paths.profileBuilder}${notification.createdBy}`);
                }}
              >
                {userName}
              </Typography>

              <Typography sx={{ fontSize: 13 }} className="widthFitContent">
                {description}
              </Typography>
            </div>
          </div>
          <div style={{ fontSize: 13 }}>{"..."}</div>
          {giveTimePassed()}
          <WorkoutModal workoutId={notification.workoutId} open={open} handleClose={handleCloseWorkout} />
        </MenuItem>
      )}
    </>
  );
}

export default NotificationItem;
