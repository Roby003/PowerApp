import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useStatsService from "../../../../services/StatsService";
export const options = {
  chart: { title: "Sets per Week" },
  curveType: "function",
  legend: { position: "bottom" },
};
const headerList = ["First Day Of the Week", "Sets"];
function SetsPerWeekChart({ userId, exerciseId }) {
  const [data, setData] = useState(headerList);
  const { getSetsDataForExercise } = useStatsService();
  useEffect(() => {
    async function f() {
      let dbData = await getSetsDataForExercise(exerciseId, userId);
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

export default SetsPerWeekChart;
