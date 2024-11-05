import { CardActionArea, IconButton, Menu, MenuItem, Typography } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVertOutlined";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import defaultProfileImg from "../../../assets/images/default_profile.jfif";
import ConfirmRemoveModal from "../../../components/utility/ConfirmRemoveModal";
import useCommentService from "../../../services/CommentService";
import Paths from "../../../statics/Paths";
import useUtils from "../../../utils/Utils";
import userSession from "../../../utils/userSession";
import EditCommentModal from "./EditCommentModal";

const TAKE_COMMENTS_CONSTANT = 8;
function CommentListWithScroll({ workoutId, reloadComments, ownPageFlag }) {
  const [comments, setComments] = useState([]);
  const { getCommentsByWorkout, getNumberOfCommentsByWorkout, removeComment } = useCommentService();
  const [takeComments, setTakeComments] = useState(TAKE_COMMENTS_CONSTANT);
  const [numberOfComments, setNumberOfComments] = useState();
  const { fetchDataForScroll } = useUtils();
  const { parseDate } = useUtils();
  useEffect(() => {
    async function loadFromDb() {
      setNumberOfComments(await getNumberOfCommentsByWorkout(workoutId));
    }
    loadFromDb();
  }, [reloadComments]);

  useEffect(() => {
    async function loadFromDb() {
      setComments(await getCommentsByWorkout(workoutId, takeComments));
    }
    loadFromDb();
  }, [reloadComments]);

  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const openSettings = Boolean(anchorElSettings);
  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  async function fetchData() {
    await fetchDataForScroll(
      setComments,
      takeComments,
      async () => await getCommentsByWorkout(workoutId, takeComments + TAKE_COMMENTS_CONSTANT)
    );
    // setComments(await getCommentsByWorkout(workoutId, takeComments + TAKE_COMMENTS_CONSTANT));
    setTakeComments(takeComments + TAKE_COMMENTS_CONSTANT);
  }

  return (
    <>
      <div className="commentList" style={{ paddingBottom: 0, paddingRight: 0 }}>
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchData}
          loader={<h4>Loading...</h4>}
          hasMore={true}
          height="200px"
          style={{ overflowX: "hidden" }}
        >
          {comments.map((comm, index) => (
            <div key={index} className=" marginBottom">
              <div className="row smallMarginBottom noWrap">
                {comm.user.image ? (
                  <img src={`data:image/jpg;base64,${comm.user.image}`} className="exerciseImage" />
                ) : (
                  <img src={defaultProfileImg} className="exerciseImage" />
                )}
                <div className="col col-11">
                  <div className="row">
                    <div className="col col-6">
                      <Link to={`${Paths.profileBuilder}${comm.user.id}`}>
                        <CardActionArea>
                          <Typography>{comm.user.userName} </Typography>
                        </CardActionArea>
                      </Link>
                    </div>
                    <div className="col flexRight flexStart">
                      {comm.user.id == userSession.user().id || ownPageFlag ? (
                        <>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={openSettings ? "long-menu" : undefined}
                            aria-expanded={openSettings ? "true" : undefined}
                            aria-haspopup="true"
                            size="small"
                            onClick={handleClickSettings}
                            className="commentSettingsIcon"
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
                            {comm.user.id == userSession.user().id && (
                              <MenuItem>
                                <EditCommentModal
                                  commentId={comm.commentId}
                                  reloadComments={reloadComments}
                                  handleCloseSettings={handleCloseSettings}
                                />
                              </MenuItem>
                            )}

                            <MenuItem>
                              <ConfirmRemoveModal
                                entityName={"comment"}
                                entityTitle={comm.content}
                                lambdaOnDelete={() => {
                                  removeComment(comm.commentId).then(reloadComments);
                                }}
                                buttonVariant="none"
                              />
                            </MenuItem>
                          </Menu>
                        </>
                      ) : (
                        <IconButton className="commentSettingsIcon hide" size="small">
                          <MoreVertIcon />
                        </IconButton>
                      )}
                      <div className="subTitle">{parseDate(comm.createdDate)}</div>
                    </div>
                  </div>
                  <div className="">{comm.content}</div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default CommentListWithScroll;

//   {
//     "content": "salut",
//     "user": {
//         "id": "8244070f-8e23-4204-80ba-7e4c94e25dfc",
//         "userName": "TestUser123",
//         "roleId": 2
//     },
//     "createdDate": "2024-08-26T21:16:38.647"
// }
