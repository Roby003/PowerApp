import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import useLikeService from "../../../services/LikeService";
function LikeButton({ workoutId }) {
  const [likedState, setLikedState] = useState({ isLiked: false, likesCount: 0 });
  const { likeWorkout, isWorkoutLiked } = useLikeService();
  const [triggerReload, setTriggerReload] = useState(false);
  useEffect(() => {
    async function load() {
      setLikedState(await isWorkoutLiked(workoutId));
    }
    load();
  }, [triggerReload]);

  async function handleLike() {
    try {
      await likeWorkout(workoutId);
      setTriggerReload(!triggerReload);
    } catch {
      setTriggerReload(!triggerReload);
    }
  }
  return (
    <IconButton onClick={handleLike}>
      <div>{likedState.likesCount}</div>
      {likedState.isLiked ? (
        <FavoriteOutlinedIcon className="redIcon" />
      ) : (
        <FavoriteBorderOutlinedIcon className="redIcon" />
      )}
    </IconButton>
  );
}

export default LikeButton;
