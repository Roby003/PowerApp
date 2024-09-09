import React from "react";
import { LogWorkoutProvider } from "../../contexts/LogWorkoutContext";
import useAuthService from "../../services/UserService";
import FeedWorkouts from "./FeedWorkouts";
import UserSearch from "./UserSearch";
import { Card } from "@mui/material";
import SuggestedUsers from "./SuggestedUsers";
import FeaturedWorkout from "./FeaturedWorkout";
function Feed() {
  const { getUsersByUsername } = useAuthService();
  return (
    <div className="parentDiv row">
      <div className="col col-1 feedLeftSide">
        <UserSearch getUsersByUsername={getUsersByUsername} />
        <SuggestedUsers />
      </div>
      <div className="col col-6 feedCenterCard">
        <FeaturedWorkout />
        <FeedWorkouts />
      </div>
    </div>
  );
}

export default Feed;
