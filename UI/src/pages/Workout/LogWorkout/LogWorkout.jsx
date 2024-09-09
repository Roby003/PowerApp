import { useState } from "react";
import { LogWorkoutProvider } from "../../../contexts/LogWorkoutContext";
import ExerciseLibrary from "./ExerciseLibrary";
import LogWorkoutCard from "./LogWorkoutCard";

import TemplateLibrary from "./TemplateLibrary";
import ExerciseListItem from "./Components/ExerciseListItem";
export default function LogWorkout() {
  const [setList, setSetList] = useState([]);

  return (
    <div className="parentDiv">
      <LogWorkoutProvider>
        <ExerciseLibrary />
        <LogWorkoutCard />
        <TemplateLibrary />
      </LogWorkoutProvider>
    </div>
  );
}
