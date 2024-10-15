import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useStatsService from "../../../../services/StatsService";

const headerList = ["Date", "Weight (kg)"];

function _1RMProgressChart({ exerciseInfo, templateId = null }) {
  const options = {
    title: "1RM Progress " + exerciseInfo.name,
    curveType: "function",
    legend: { position: "bottom" },
  };
  console.log("s");
  const [data, setData] = useState(headerList);
  const { getStatsFor1RMbyTemplate } = useStatsService();
  useEffect(() => {
    async function f() {
      let dataFromDb = await getStatsFor1RMbyTemplate(exerciseInfo.exerciseId, templateId);
      let dataList = dataFromDb.map((obj) => Object.values(obj));
      setData([headerList, ...dataList]);
    }
    f();
  }, []);
  return (
    <motion.div className="col" layout="position">
      <div className="row">
        {data.length > 1 && (
          <div className="">
            <Chart chartType="LineChart" width="100%" height="100%" data={data} options={options} legendToggle />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default _1RMProgressChart;
