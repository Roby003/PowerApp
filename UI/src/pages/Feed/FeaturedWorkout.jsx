import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWorkoutService from "../../services/WorkoutService";
import Resources from "../../statics/Resources";
import WorkoutListItem from "../Workout/Components/WorkoutListItem";

function FeaturedWorkout() {
  const [workout, setWorkout] = useState({});
  const { getFeatured } = useWorkoutService();
  useEffect(() => {
    async function load() {
      setWorkout(await getFeatured());
    }
    load();
  }, []);
  return (
    <Box className="featuredWorkoutWrapper ">
      <div className="pageTitle">{Resources.FeaturedWorkoutTitle}</div>

      {Object.keys(workout).length > 0 && <WorkoutListItem workout={workout} ownPageFlag={false} />}
    </Box>
  );
}

export default FeaturedWorkout;
