import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useStatsService from "../../../services/StatsService";
import useUtils from "../../../utils/Utils";
import SetsPerWeekChart from "./Charts/SetsPerWeekChart";
import VolumePerWeekChart from "./Charts/VolumePerWeekChart";
const options = {
  chart: { title: "1RM Progress", legend: { position: "top" } },
  curveType: "function",
  series: {
    0: { axis: "Volume" },
  },
  axes: {
    y: {
      Volume: { label: "Kg" },
    },
  },
};

const headerList = ["Date", "Weight (kg)"];

function ExerciseStatsItem({ exerciseInfo, userId }) {
  const { getStatsFor1RM } = useStatsService();
  const [data, setData] = useState([headerList]);
  const { parseDate } = useUtils();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function f() {
      let dataFromDb = await getStatsFor1RM(exerciseInfo.exerciseId, userId);
      let dataList = dataFromDb.map((obj) => Object.values(obj));
      setData([headerList, ...dataList]);
    }
    f();
  }, []);

  return (
    <motion.div
      layout
      className="col co-4 exerciseStatsItem"
      style={{ minHeight: 280, minWidth: isOpen ? 1200 : 745, maxWidth: isOpen ? 3000 : 700 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          borderRadius: 4,
          minHeight: 280,
          maxHeight: isOpen ? "auto" : 280,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }} style={{ paddingBottom: 0 }}>
          <motion.div layout="position" className="row">
            <div className="col">{exerciseInfo.name}</div>
            <CardActionArea>
              {isOpen ? (
                <CloseFullscreenIcon
                  fontSize="small"
                  color="primary"
                  onClick={() => setIsOpen((prev) => !prev)}
                  sx={{ pointerEvents: "all" }}
                />
              ) : (
                <OpenInFullIcon
                  fontSize="small"
                  color="primary"
                  onClick={() => setIsOpen((prev) => !prev)}
                  sx={{ pointerEvents: "all" }}
                />
              )}
            </CardActionArea>
          </motion.div>
          {data.length > 1 ? (
            <motion.div layout="position" className="row">
              <motion.div
                className="col col-3"
                layout="position"
                // style={{ padding: 10, paddingLeft: 15, paddingBottom: 0 }}
              >
                <Chart chartType="Line" width="100%" height="100%" data={data} options={options} legendToggle />
              </motion.div>
              {isOpen && (
                <>
                  <SetsPerWeekChart userId={userId} exerciseId={exerciseInfo.exerciseId} />

                  <VolumePerWeekChart userId={userId} exerciseId={exerciseInfo.exerciseId} />
                </>
              )}
            </motion.div>
          ) : (
            <motion.div layout="position" className="noDataBanner">
              You have no data for this exercise
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ExerciseStatsItem;
