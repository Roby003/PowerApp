import React from "react";
import userSession from "../../utils/userSession";
import ProfilePage from "./ProfilePage";
function MyProfile() {
  return <ProfilePage userId={userSession.user().id} />;
}

export default MyProfile;
