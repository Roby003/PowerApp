import React, { useEffect, useState } from "react";
import useExerciseService from "../../../services/ExerciseService";
import _1RMProgressChart from "../ExerciseStats/Charts/_1RMProgressChart";
function TemplateExerciseStats({ templateId }) {
  const [ids, setIds] = useState([]);
  const { getExerciseInfoByTemplate } = useExerciseService();
  useEffect(() => {
    async function f() {
      setIds(await getExerciseInfoByTemplate(templateId));
    }
    f();
  }, []);
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Exercise Progress</div>
      {ids.map((id) => (
        <>
          <_1RMProgressChart key={id.exerciseId} exerciseInfo={id} templateId={templateId} />
        </>
      ))}
    </>
  );
}

export default TemplateExerciseStats;
