import { MenuItem, Select } from "@mui/material";
import useWorkoutService from "../../services/WorkoutService";
import Resources from "../../statics/Resources";
import userSession from "../../utils/userSession";
import WorkoutsListing from "../Profile/WorkoutsListing";
import { useState } from "react";
function FeedWorkouts() {
  const { getFollowedWorkouts, getFollowedWorkoutsByActivity } = useWorkoutService();
  return (
    <>
      <WorkoutsListing
        getWorkouts={getFollowedWorkouts}
        getWorkoutsByActivity={getFollowedWorkoutsByActivity}
        userId={userSession.user().id}
        ownPageFlag={false}
        feedFlag={true}
      />
    </>
  );
}

export default FeedWorkouts;
