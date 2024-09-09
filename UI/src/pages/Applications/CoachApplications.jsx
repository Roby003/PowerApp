import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/utility/Pagination";
import useAuthService from "../../services/UserService";
import Resources from "../../statics/Resources";
import UserApplication from "./UserApplication";
const PAGINATION_CONSTANT = 7;

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
      setApplications(await getUsersWithApplications(PAGINATION_CONSTANT, paginationState - PAGINATION_CONSTANT));
    }
    loadFromDb();
  }, [paginationState, triggerReload]);

  function changePagination(change) {
    setPaginationState(paginationState + change < PAGINATION_CONSTANT ? PAGINATION_CONSTANT : paginationState + change);
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
          {applications.map((app) => (
            <UserApplication key={app.applicationId} application={app} reloadList={reloadList} />
          ))}
        </Card>
        <Pagination
          paginationState={paginationState}
          PAGINATION_CONSTANT={PAGINATION_CONSTANT}
          changePagination={changePagination}
          objectList={applications}
        />
      </Box>
    </div>
  );
}

export default CoachApplications;
