import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoleService from "../../services/RoleService";
import useAuthService from "../../services/UserService";
import Paths from "../../statics/Paths";
import Roles from "../../statics/Roles";
import userSession from "../../utils/userSession";
import UserSearchModalforProfile from "./Components/UserSearchModalforProfile";

export default function ProfileInfo({ userId }) {
  const [userInfo, setUserInfo] = useState({});
  const { getUserInfo, triggerFollow, getFollowingByUsername, getFollowedByUsername, getFollowedAll, getFollowingAll } =
    useAuthService();
  const [triggerReload, setTriggerReload] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);
  const { applyForRole } = useRoleService();
  const [appliedState, setAppliedState] = useState(true);
  const [openFollowed, setOpenFollowed] = useState(false);
  const { checkForApplication } = useRoleService();

  const handleOpenFollowed = () => {
    setOpenFollowed(true);
  };
  const handleCloseFollowed = () => setOpenFollowed(false);
  const ownPageFlag = userSession.user().id === userId ? true : false;

  const navigate = useNavigate();

  useEffect(() => {
    async function loadFromDb() {
      setUserInfo(await getUserInfo(userId));
    }
    loadFromDb();
  }, [userId, triggerReload]);

  useEffect(() => {
    async function load() {
      setAppliedState(await checkForApplication(userId));
    }
    if (ownPageFlag) load();
  }, []);

  function handleCoachApplication() {
    applyForRole({ userId: userSession.user().id, roleId: Roles.Coach }, setAppliedState);
  }

  return (
    <Box className="centerCard profileInfo">
      <Card variant="elevation">
        {Object.keys(userInfo).length > 0 && (
          <>
            <CardContent>
              <div className="row">
                <div className="col col-3">
                  <div className="row">
                    <img src={`data:image/jpg;base64,${userInfo.image}`} className=" profileImage" />
                    <div className="col col-9">
                      <div className="row noWrap alignCenter">
                        <Typography className="widthFitContent" sx={{ fontSize: 24, fontWeight: 600 }}>
                          {userInfo.userName}
                        </Typography>
                        {userInfo.roleId == 3 && <VerifiedIcon fontSize="" className="verifiedIcon" />}
                      </div>
                      {ownPageFlag && <Typography className="subTitle">{userInfo.email}</Typography>}
                    </div>
                  </div>
                </div>
                <div className=" col col-9 flexRight flexStart">
                  <div className="profileInfoSmallContainer">
                    <Typography sx={{ fontSize: 14 }}>Workouts</Typography>
                    <Typography>{userInfo.noWorkouts}</Typography>
                  </div>
                  <div className="profileInfoSmallContainer" onClick={handleOpenFollowed}>
                    <CardActionArea>
                      <Typography sx={{ fontSize: 14 }}>Followers</Typography>
                      <Typography sx={{ color: "#1976d2" }}>{userInfo.noFollowedUsers}</Typography>
                    </CardActionArea>
                  </div>
                  <div className="profileInfoSmallContainer" onClick={handleOpenFollowing}>
                    <CardActionArea>
                      <Typography sx={{ fontSize: 14 }}>Following</Typography>
                      <Typography sx={{ color: "#1976d2" }}>{userInfo.noFollowingUsers}</Typography>
                    </CardActionArea>
                  </div>

                  <UserSearchModalforProfile
                    open={openFollowing}
                    handleClose={handleCloseFollowing}
                    userSearchFunctionAll={getFollowingAll}
                    userSearchFunction={getFollowingByUsername}
                    userId={userId}
                  />
                  <UserSearchModalforProfile
                    open={openFollowed}
                    handleClose={handleCloseFollowed}
                    userSearchFunctionAll={getFollowedAll}
                    userSearchFunction={getFollowedByUsername}
                    userId={userId}
                  />
                </div>
              </div>
            </CardContent>
            <CardActions className="flexEndActions">
              {!ownPageFlag && (
                <Button
                  variant=""
                  onClick={() => {
                    triggerFollow(userId, triggerReload, setTriggerReload);
                  }}
                >
                  {userInfo.followingFlag ? "Following" : "Follow"}
                </Button>
              )}

              {ownPageFlag && (
                <>
                  {userSession.user().roleId != Roles.Coach && (
                    <>
                      {appliedState == false ? (
                        <Button size="small" variant="text" onClick={handleCoachApplication}>
                          Apply to become a verfied athlete
                        </Button>
                      ) : (
                        <Button disabled size="small" variant="text">
                          Applied for verification
                        </Button>
                      )}
                    </>
                  )}
                  <Button variant="outlined" onClick={() => navigate(`${Paths.userEditBuilder}${userId}`)}>
                    Edit Profile
                  </Button>
                </>
              )}
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
}
