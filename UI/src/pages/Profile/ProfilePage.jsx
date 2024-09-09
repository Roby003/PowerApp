import React from "react";
import { useParams } from "react-router-dom";
import useWorkoutService from "../../services/WorkoutService";
import userSession from "../../utils/userSession";
import ProfileInfo from "./ProfileInfo";
import WorkoutsListing from "./WorkoutsListing";

export default function ProfilePage({ userId = null }) {
  const { getPersonalWorkouts, getPersonalWorkoutsByActivity } = useWorkoutService();
  const { id } = useParams();
  const ownPageFlag = userSession.user().id === (userId == null ? id : userId) ? true : false;

  return (
    <>
      {userId == null ? (
        <>
          <ProfileInfo userId={id} />
          <WorkoutsListing getWorkouts={getPersonalWorkouts} userId={id} ownPageFlag={ownPageFlag} />
        </>
      ) : (
        <>
          <ProfileInfo userId={userId} />
          <WorkoutsListing
            getWorkouts={getPersonalWorkouts}
            getWorkoutsByActivity={getPersonalWorkoutsByActivity}
            userId={userId}
            ownPageFlag={ownPageFlag}
          />
        </>
      )}
    </>
  );
}
