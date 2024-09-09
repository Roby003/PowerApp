import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuthService from "../../services/UserService";
import CoachListItem from "./CoachListItem";

function SuggestedUsers() {
  const [coaches, setCoaches] = useState([]);
  const { getCoaches } = useAuthService();

  useEffect(() => {
    async function load() {
      setCoaches(await getCoaches());
    }
    load();
  }, []);
  return (
    <Card className="suggestedUsers">
      <div className="suggestedUsersTitle">Suggested Athletes</div>

      {coaches.map((coach) => (
        <CoachListItem key={coach.userId} user={coach} />
      ))}
    </Card>
  );
}

export default SuggestedUsers;
