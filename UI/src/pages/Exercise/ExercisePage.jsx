import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

import useCategoryService from "../../services/CategoryService.js";
import useExerciseService from "../../services/ExerciseService.js";

import { Button, Divider, InputAdornment, OutlinedInput } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Paths from "../../statics/Paths.js";
import ExerciseShowItem from "./ExerciseShowItem.jsx";
export default function ExercisePage() {
  const navigate = useNavigate();
  const PAGINATION_CONSTANT = 15;
  const [muscleSelect, setMuscleSelect] = React.useState("default");
  const { getExercisesByCategory, getExercisesAll } = useExerciseService();
  const { getCategories } = useCategoryService();
  const [muscleList, setMuscleList] = React.useState([]);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [paginationState, setPaginationState] = React.useState(PAGINATION_CONSTANT);
  const [triggerReload, setTriggerReload] = React.useState(false);
  const [triggerSearch, setTriggerSearch] = React.useState(false);

  const handleChange = async (event) => {
    setPaginationState(PAGINATION_CONSTANT);
    setMuscleSelect(event.target.value);
    event.target.value === "default"
      ? setExerciseList(await getExercisesAll(PAGINATION_CONSTANT, 0, inputRef.current.value))
      : setExerciseList(
          await getExercisesByCategory(
            [PAGINATION_CONSTANT, 0],
            ["exerciseId", 1],

            inputRef.current.value == ""
              ? [
                  ["categoryId", event.target.value],
                  ["isActive", 1],
                ]
              : [
                  ["categoryId", event.target.value],
                  ["isActive", 1],
                  ["name", inputRef.current.value],
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
    console.log("useEffect");
    async function loadFromDb() {
      muscleSelect === "default"
        ? setExerciseList(await getExercisesAll(paginationState, 0, inputRef.current.value))
        : setExerciseList(
            await getExercisesByCategory(
              [paginationState, 0],
              ["exerciseId", 1],
              muscleSelect === ""
                ? []
                : inputRef.current.value == ""
                ? [
                    ["categoryId", muscleSelect],
                    ["isActive", 1],
                  ]
                : [
                    ["categoryId", muscleSelect],
                    ["isActive", 1],
                    ["name", inputRef.current.value],
                  ]
            )
          );
    }
    loadFromDb();
  }, [triggerSearch]);

  const inputRef = React.useRef(null);

  function update() {
    console.log("update");
    let timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      muscleSelect === "default"
        ? setExerciseList(await getExercisesAll(paginationState, 0, inputRef.current.value))
        : setExerciseList(
            await getExercisesByCategory(
              [paginationState, 0],
              ["exerciseId", 1],
              muscleSelect === ""
                ? []
                : inputRef.current.value == ""
                ? [
                    ["categoryId", muscleSelect],
                    ["isActive", 1],
                  ]
                : [
                    ["categoryId", muscleSelect],
                    ["isActive", 1],
                    ["name", inputRef.current.value],
                  ]
            )
          );
    }, 500);

    return handleChange;
  }
  async function fetchData() {
    console.log("fetchData");
    muscleSelect === "default"
      ? setExerciseList(await getExercisesAll(paginationState + PAGINATION_CONSTANT, 0, inputRef.current.value))
      : setExerciseList(
          await getExercisesByCategory(
            [paginationState + PAGINATION_CONSTANT, 0],
            ["exerciseId", 1],
            muscleSelect === ""
              ? []
              : inputRef.current.value == ""
              ? [
                  ["categoryId", muscleSelect],
                  ["isActive", 1],
                ]
              : [
                  ["categoryId", muscleSelect],
                  ["isActive", 1],
                  ["name", inputRef.current.value],
                ]
          )
        );

    setPaginationState(paginationState + PAGINATION_CONSTANT);
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
        <CardContent>
          <div className="inputLabel">Filter By Name</div>
          <OutlinedInput
            variant="outlined"
            inputRef={inputRef}
            onChange={() => update()}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1976d2" }} />
              </InputAdornment>
            }
            fullWidth
          />
        </CardContent>
        <Divider variant="middle" />
        <CardContent className="exerciseList">
          <InfiniteScroll
            dataLength={exerciseList.length}
            next={fetchData}
            loader={<h4>Loading...</h4>}
            hasMore={true}
            height="500px"
          >
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
          </InfiniteScroll>
        </CardContent>
      </Card>
    </Box>
  );
}
