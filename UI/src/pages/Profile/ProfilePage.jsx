import React from "react";
import { useParams } from "react-router-dom";
import useWorkoutService from "../../services/WorkoutService";
import userSession from "../../utils/userSession";
import ProfileInfo from "./ProfileInfo";
import ProfilePageStats from "./ProfilePageStats";
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
          <div className="row">
            <div className="col col-6">
              <div style={{ maxWidth: 660 }}>
                <WorkoutsListing getWorkouts={getPersonalWorkouts} userId={id} ownPageFlag={ownPageFlag} />
              </div>
            </div>
            <div className="col col-6">
              <ProfilePageStats userId={id} />
            </div>
          </div>
        </>
      ) : (
        <>
          <ProfileInfo userId={userId} />
          <div className="row">
            <div className="col col-6">
              <div style={{ maxWidth: 660 }}>
                <WorkoutsListing
                  getWorkouts={getPersonalWorkouts}
                  getWorkoutsByActivity={getPersonalWorkoutsByActivity}
                  userId={userId}
                  ownPageFlag={ownPageFlag}
                />
              </div>
            </div>
            <div className="col col-6">
              <ProfilePageStats userId={userId} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
