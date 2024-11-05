import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useStatsService from "../../../services/StatsService";
import TemplateExerciseStats from "./TemplateExerciseStats";
export const optionsVolume = {
  chart: { title: "Volume Progress Over Time" },
  curveType: "function",
  series: {
    0: { axis: "Volume" },
    1: { axis: "Increase" },
  },
  axes: {
    y: {
      Volume: { label: "Volume (kg)" },
      Increase: { label: "Increase (%)" },
    },
  },
  legend: {
    position: "bottom",
    textStyle: {
      padding: 10,
    },
  },
};

const headerListVolume = ["Date", "Volume (kg)", "Increase (%)"];

function TemplateStatsItem({ templateInfo, userId }) {
  const { getVolumeDataForTemplate } = useStatsService();
  const [dataVolume, setDataVolume] = useState([headerListVolume]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function f() {
      let dataFromDb = await getVolumeDataForTemplate(templateInfo.templateId);
      let dataListVolume = dataFromDb.map((obj) => Object.values(obj));
      setDataVolume([headerListVolume, ...dataListVolume]);
    }
    f();
  }, []);

  return (
    <motion.div
      layout
      className="col col-6 exerciseStatsItem"
      style={{ minHeight: 280, minWidth: isOpen ? 1200 : 745, maxWidth: isOpen ? 3000 : 745, height: "fit-content" }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="elevation"
        sx={{
          borderRadius: 6,
          minHeight: 280,
          maxHeight: isOpen ? "fit-content" : 280,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CardContent>
          <motion.div layout="position" className="row">
            <div className="col">{templateInfo.name}</div>
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
          {dataVolume.length > 1 ? (
            <>
              <motion.div layout="position" className="row">
                <motion.div className="col col-3" layout="position">
                  <Chart
                    chartType="Line"
                    width="100%"
                    height="100%"
                    data={dataVolume}
                    options={optionsVolume}
                    legendToggle
                  />
                </motion.div>
              </motion.div>
              {isOpen && <div style={{ fontWeight: "bold", marginTop: 15 }}>Exercise Progress</div>}
              <motion.div style={{ display: "flex", flexWrap: "wrap" }}>
                {isOpen && (
                  <>
                    <TemplateExerciseStats templateId={templateInfo.templateId} />
                  </>
                )}
              </motion.div>
            </>
          ) : (
            <motion.div layout="position" className="noDataBanner">
              You have no data for this template
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TemplateStatsItem;
