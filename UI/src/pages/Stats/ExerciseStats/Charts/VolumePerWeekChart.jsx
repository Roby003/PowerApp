import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useStatsService from "../../../../services/StatsService";
export const options = {
  chart: { title: "Volume Data Per Week" },
  curveType: "function",
  legend: { position: "bottom" },
};
const headerList = ["First Day Of the Week", "Volume (kg)", "Average Volume per Set (kg)"];
function VolumePerWeekChart({ userId, exerciseId }) {
  const [data, setData] = useState(headerList);
  const { getVolumeDataForExercise } = useStatsService();

  useEffect(() => {
    async function f() {
      let dbData = await getVolumeDataForExercise(exerciseId, userId);
      let listData = dbData.map((obj) => Object.values(obj));
      setData([headerList, ...listData]);
    }
    f();
  }, []);
  return (
    <motion.div className="col col-3" layout style={{ paddingLeft: 15 }}>
      <Chart chartType="Line" width="100%" height="100%" data={data} options={options} legendToggle />
    </motion.div>
  );
}

export default VolumePerWeekChart;
