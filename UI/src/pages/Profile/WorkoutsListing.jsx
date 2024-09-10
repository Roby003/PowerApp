import { Box, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LogWorkoutProvider } from "../../contexts/LogWorkoutContext";
import Resources from "../../statics/Resources";
import WorkoutListItem from "../Workout/Components/WorkoutListItem";
import EmptyFeedCard from "./EmptyFeedCard";
import NoWorkoutsCard from "./NoWorkoutsCard";

export default function WorkoutsListing({ getWorkouts, getWorkoutsByActivity, userId, ownPageFlag, feedFlag = false }) {
  const [workouts, setWorkouts] = useState([]);
  const PAGINATION_CONSTANT = 5;
  const [paginationState, setPaginationState] = useState(PAGINATION_CONSTANT);
  const [triggerReload, setTriggerReload] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    async function loadFromDb() {
      setWorkouts(
        filter ? await getWorkoutsByActivity(paginationState, 0, userId) : await getWorkouts(paginationState, 0, userId)
      );
    }
    loadFromDb();
  }, [userId, triggerReload, filter]);

  async function fetchData() {
    setWorkouts(
      filter
        ? await getWorkoutsByActivity(paginationState + PAGINATION_CONSTANT, 0, userId)
        : await getWorkouts(paginationState + PAGINATION_CONSTANT, 0, userId)
    );
    setPaginationState(paginationState + PAGINATION_CONSTANT);
  }
  return (
    <LogWorkoutProvider>
      <Box className="centerCard ">
        {workouts.length == 0 && (feedFlag == true ? <EmptyFeedCard /> : <NoWorkoutsCard />)}

        {workouts.length > 0 && (
          <>
            <div className="row">
              <div className="pageTitle col col-8">{Resources.Workouts}</div>
              <div className="col row">
                <div className="filterSelectLabel widthFitContent">Filter By</div>
                <Select
                  variant="standard"
                  className=" filterWorkoutsSelect"
                  defaultValue={false}
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                >
                  <MenuItem value={false}>Default</MenuItem>
                  <MenuItem value={true}>Engagement</MenuItem>
                </Select>
              </div>
            </div>
            <InfiniteScroll dataLength={workouts.length} next={fetchData} loader={<h4>Loading...</h4>} hasMore={true}>
              {workouts.map((wk, index) => (
                <WorkoutListItem
                  key={index}
                  workout={wk}
                  ownPageFlag={ownPageFlag}
                  triggerReload={() => {
                    setTriggerReload(!triggerReload);
                  }}
                />
              ))}
            </InfiniteScroll>
          </>
        )}
      </Box>
    </LogWorkoutProvider>
  );
}
