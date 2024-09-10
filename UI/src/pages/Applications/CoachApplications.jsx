import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAuthService from "../../services/UserService";
import Resources from "../../statics/Resources";
import UserApplication from "./UserApplication";
const PAGINATION_CONSTANT = 15;

function CoachApplications() {
  const [applications, setApplications] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);
  const reloadList = () => {
    setTriggerReload(!triggerReload);
  };
  const { getUsersWithApplications } = useAuthService();
  const [paginationState, setPaginationState] = useState(PAGINATION_CONSTANT);

  useEffect(() => {
    async function loadFromDb() {
      setApplications(await getUsersWithApplications(paginationState, 0));
    }
    loadFromDb();
  }, [triggerReload]);

  async function fetchData() {
    setApplications(await getUsersWithApplications(paginationState + PAGINATION_CONSTANT, 0));
    setPaginationState(paginationState + PAGINATION_CONSTANT);
  }
  return (
    <div className="centered">
      <Box className="centerCard col-8">
        <CardContent>
          <div className="pageTitle">{Resources.CoachApplications}</div>
        </CardContent>
        <Card variant="elevation" className="suggestedUsers">
          <div className="row">
            <div className="col-4 "></div>
            <div className="col-2 bold">Workouts</div>
            <div className="col-2 bold">Followers</div>
            <div className="col-4"></div>
          </div>
          <InfiniteScroll
            dataLength={applications.length}
            next={fetchData}
            loader={<h4>Loading...</h4>}
            hasMore={true}
            height="100%"
          >
            {applications.map((app) => (
              <UserApplication key={app.applicationId} application={app} reloadList={reloadList} />
            ))}
          </InfiniteScroll>
        </Card>
      </Box>
    </div>
  );
}

export default CoachApplications;
