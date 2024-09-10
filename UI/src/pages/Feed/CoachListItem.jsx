import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthService from "../../services/UserService";
import Paths from "../../statics/Paths";
import VerifiedIcon from "@mui/icons-material/Verified";
import defaultProfileImg from "../../assets/images/default_profile.jfif";
function CoachListItem({ user }) {
  const [image, setImage] = useState("");
  const { getUserImage, triggerFollow } = useAuthService();
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    async function load() {
      setImage(await getUserImage(user.userId));
    }
    load();
  }, []);

  function handleFollow() {
    triggerFollow(user.userId, followed, setFollowed);
  }

  return (
    <Card variant="" className="">
      <div className="row noWrap ">
        {image ? (
          <img src={`data:image/jpg;base64,${image}`} className="smallUserImage" />
        ) : (
          <img src={defaultProfileImg} className="smallUserImage" />
        )}
        <Link className="userNameLink" to={`${Paths.profileBuilder}${user.userId}`}>
          <Typography sx={{ width: "fit-content" }}>{user.userName}</Typography>
          <VerifiedIcon fontSize="" className="verifiedIcon" />
        </Link>
        <div className="flexRight flexStart noShrink">
          <Button onClick={handleFollow}>{followed ? "Following" : "Follow"}</Button>
        </div>
      </div>
    </Card>
  );
}

export default CoachListItem;
