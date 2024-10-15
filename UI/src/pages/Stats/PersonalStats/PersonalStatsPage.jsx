import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import useStatsService from "../../../services/StatsService";
import useUtils from "../../../utils/Utils";
const setsHeader = ["Date", "Number of Sets"];
const volumeHeader = ["Date", "Weight (kg)"];
const rpeHeader = ["Date", "Average rpe"];
const exertionHeader = ["Date", "Average exertion"];

const optionsSets = {
  curveType: "function",
  legend: { position: "bottom" },
};

const optionsVolume = {
  curveType: "function",
  legend: { position: "bottom" },
};

const optionsRpe = {
  curveType: "function",
  legend: { position: "bottom" },
};

const optionsExertion = {
  curveType: "function",
  legend: { position: "bottom" },
};

function PersonalStatsPage() {
  const { userId } = useParams();
  const [data, setData] = useState({ sets: [], volume: [], rpe: [], exertion: [], avgExertion: {} });

  const { getPersonalData, getPersonalAvgExertion } = useStatsService();
  const { useEffectAsync } = useUtils();
  const [isFatigued, setIsFatigued] = useState(true);

  useEffectAsync(async () => {
    let datadb = await getPersonalData(userId);
    let exertionData = await getPersonalAvgExertion(userId);

    setData({
      sets: [setsHeader, ...datadb.map((obj) => [obj.date, obj.sets])],
      volume: [volumeHeader, ...datadb.map((obj) => [obj.date, obj.volume])],
      rpe: [rpeHeader, ...datadb.map((obj) => [obj.date, obj.avgRpe])],
      exertion: [exertionHeader, ...datadb.map((obj) => [obj.date, obj.exertionIndex])],
      avgExertion: exertionData,
    });
    // setIsFatigued(exertionData.avgLast3Weeks > exertionData.avgOverTime + 0.15 * exertionDAta.avgOverTime);
  }, []);

  const cardStyles = {
    borderRadius: 4,
    minHeight: 280,
    maxHeight: 280,
    transition: "all 0.2s ease-in-out",
    marginLeft: 5,
  };

  return (
    <div className="col col-9 ">
      <div
        style={{
          marginTop: 40,
          marginLeft: 60,
          fontSize: 24,
          fontWeight: "bold",
          color: "#3f51b5", // A nice blue color for the title
          paddingBottom: "10px",
          borderBottom: "1px solid #ddd", // Add a subtle bottom border
          maxWidth: "600px",
        }}
        className="row"
      >
        <div>
          Average exertion index over time:
          <span style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.87)" }}> {data.avgExertion.avgOverTime}22</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          marginLeft: 60,
          fontSize: 24,
          fontWeight: "bold",
          color: "#3f51b5", // Same color for consistency
          paddingBottom: "10px",
          borderBottom: "1px solid #ddd",
          maxWidth: "700px",
        }}
        className="row"
      >
        <div>
          Average exertion index in the last three weeks:
          <span style={{ fontWeight: "bold", color: isFatigued ? "rgb(194 50 50)" : "rgba(0, 0, 0, 0.87)" }}>
            {" "}
            {data.avgExertion.avgLast3Weeks}
          </span>
          <span className="col" style={{ width: "fit-content", marginLeft: 2 }}>
            <HelpOutlineIcon size="small" sx={{ color: "rgb(194 50 50)", fontSize: 17, top: 0 }} />
          </span>
        </div>
      </div>
      <div className="row" style={{ marginTop: "5%" }}>
        <motion.div layout className="col col-6 exerciseStatsItem" transition={{ duration: 0.3 }}>
          <Card sx={cardStyles}>
            <CardContent>
              <div className="col">Sets per week progress</div>
              <motion.div layout="position" className="row">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="100%"
                  data={data.sets}
                  options={optionsSets}
                  legendToggle
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div layout className="col col-6 exerciseStatsItem" transition={{ duration: 0.3 }}>
          <Card sx={cardStyles}>
            <CardContent>
              <div className="col">Volume per week progress</div>

              <motion.div layout="position" className="row">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="100%"
                  data={data.volume}
                  options={optionsVolume}
                  legendToggle
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="row">
        <motion.div layout className="col col-6 exerciseStatsItem" transition={{ duration: 0.3 }}>
          <Card sx={cardStyles}>
            <CardContent>
              <div className="col">Rpe per week</div>

              <motion.div layout="position" className="row">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="100%"
                  data={data.rpe}
                  options={optionsRpe}
                  legendToggle
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div layout className="col col-6 exerciseStatsItem" transition={{ duration: 0.3 }}>
          <Card sx={cardStyles}>
            <CardContent>
              <div className="col">Exertion Index per week</div>

              <motion.div layout="position" className="row">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="100%"
                  data={data.exertion}
                  options={optionsExertion}
                  legendToggle
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default PersonalStatsPage;
