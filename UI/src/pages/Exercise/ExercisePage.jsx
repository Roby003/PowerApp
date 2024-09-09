import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

import useCategoryService from "../../services/CategoryService.js";
import useExerciseService from "../../services/ExerciseService.js";

import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/utility/Pagination.jsx";
import Paths from "../../statics/Paths.js";
import ExerciseShowItem from "./ExerciseShowItem.jsx";
export default function ExercisePage() {
  const navigate = useNavigate();
  const PAGINATION_CONSTANT = 6;
  const [muscleSelect, setMuscleSelect] = React.useState("default");
  const { getExercisesByCategory, getExercisesAll } = useExerciseService();
  const { getCategories } = useCategoryService();
  const [muscleList, setMuscleList] = React.useState([]);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [paginationState, setPaginationState] = React.useState(PAGINATION_CONSTANT);
  const [triggerReload, setTriggerReload] = React.useState(false);
  const handleChange = async (event) => {
    setPaginationState(PAGINATION_CONSTANT);
    setMuscleSelect(event.target.value);
    event.target.value === "default"
      ? setExerciseList(await getExercisesAll(PAGINATION_CONSTANT, 0))
      : setExerciseList(
          await getExercisesByCategory(
            [PAGINATION_CONSTANT, 0],
            ["exerciseId", 1],
            [
              ["categoryId", event.target.value],
              ["isActive", 1],
            ]
          )
        );
  };

  React.useEffect(() => {
    async function loadFromDb() {
      setMuscleList(await getCategories());
    }

    loadFromDb();
  }, []);

  React.useEffect(() => {
    async function loadFromDb() {
      muscleSelect === "default"
        ? setExerciseList(
            await getExercisesAll(
              PAGINATION_CONSTANT,
              paginationState - PAGINATION_CONSTANT < 0 ? 0 : paginationState - PAGINATION_CONSTANT,
              ""
            )
          )
        : setExerciseList(
            await getExercisesByCategory(
              [
                PAGINATION_CONSTANT,
                paginationState - PAGINATION_CONSTANT < 0 ? 0 : paginationState - PAGINATION_CONSTANT,
              ],
              ["exerciseId", 1],
              muscleSelect === ""
                ? []
                : [
                    ["categoryId", muscleSelect],
                    ["isActive", 1],
                  ]
            )
          );
    }
    loadFromDb();
  }, [paginationState, triggerReload]);

  function changePagination(change) {
    console.log(change);
    setPaginationState(paginationState + change < PAGINATION_CONSTANT ? PAGINATION_CONSTANT : paginationState + change);
  }
  return (
    <Box className="centerCard">
      <CardContent className="flexRight cardHeaders">
        <Button
          variant="contained"
          className="negativeMargin heightFitContent"
          onClick={() => navigate(Paths.addExercise)}
        >
          +Exercise
        </Button>
        <div className="pageTitle col">Exercises</div>
      </CardContent>
      <Card variant="elevation">
        <CardContent>
          <FormControl fullWidth>
            <div className="inputLabel">Filter by Muscle</div>
            <Select
              defaultValue="default"
              value={muscleSelect}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="default">All Muscles</MenuItem>

              {muscleList.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
        <Divider variant="middle" />
        <CardContent className="exerciseList">
          {exerciseList.map((ex) => {
            return (
              <ExerciseShowItem
                key={ex.exerciseId}
                exercise={ex}
                triggerReload={triggerReload}
                setTriggerReload={setTriggerReload}
              />
            );
          })}
        </CardContent>
        <Pagination
          paginationState={paginationState}
          PAGINATION_CONSTANT={PAGINATION_CONSTANT}
          changePagination={changePagination}
          objectList={exerciseList}
        />
      </Card>
    </Box>
  );
}
