import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultProfileImg from "../../assets/images/default_profile.jfif";
import useRoleService from "../../services/RoleService";
import useAuthService from "../../services/UserService";
import Paths from "../../statics/Paths";
function UserApplication({ application, reloadList }) {
  const { getUserImage } = useAuthService();
  const { approveApplication, removeApplication } = useRoleService();
  const [image, setImage] = useState("");

  useEffect(() => {
    async function load() {
      setImage(await getUserImage(application.userId));
    }
    load();
  }, []);

  function handleApprove() {
    approveApplication(application.applicationId, reloadList);
  }

  function handleRemove() {
    removeApplication(application.applicationId, reloadList);
  }

  return (
    <Card variant="" className="userListItem">
      <div className="row noWrap ">
        <div className="col-4 row">
          {image ? (
            <img src={`data:image/jpg;base64,${image}`} className="smallUserImage" />
          ) : (
            <img src={defaultProfileImg} className="smallUserImage" />
          )}
          <Link className="userNameLink" to={`${Paths.profileBuilder}${application.userId}`}>
            <Typography sx={{ width: "fit-content" }}>{application.userName}</Typography>
          </Link>
        </div>
        <div className="col-2 alignCenter">{application.noWorkouts}</div>
        <div className="col-2">{application.noFollowers}</div>

        <div className="col-4 flexRight flexStart noShrink">
          <Button onClick={handleApprove}>Approve</Button>
          <Button color="error" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default UserApplication;
