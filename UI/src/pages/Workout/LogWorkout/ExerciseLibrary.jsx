import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import * as React from "react";

import useCategoryService from "../../../services/CategoryService.js";
import useExerciseService from "../../../services/ExerciseService.js";

import { Alert, Divider, InputAdornment, OutlinedInput } from "@mui/material";
import Pagination from "../../../components/utility/Pagination.jsx";
import { useLogContext } from "../../../contexts/LogWorkoutContext.jsx";
import Resources from "../../../statics/Resources.js";
import ExerciseListItem from "./Components/ExerciseListItem.jsx";
export default function ExerciseLibrary(props) {
  const PAGINATION_CONSTANT = 6;
  const [muscleSelect, setMuscleSelect] = React.useState("default");
  const { getExercisesByCategory, getExercisesAll } = useExerciseService();
  const { getCategories } = useCategoryService();
  const [muscleList, setMuscleList] = React.useState([]);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [paginationState, setPaginationState] = React.useState(PAGINATION_CONSTANT);
  const { exerciseUsedAlert } = useLogContext();
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
            // [
            //   ["categoryId", event.target.value],
            //   ["isActive", 1],
            // ]

            // ////////////////////////

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
    console.log("ssd");
    async function loadFromDb() {
      muscleSelect === "default"
        ? setExerciseList(
            await getExercisesAll(
              PAGINATION_CONSTANT,
              paginationState - PAGINATION_CONSTANT < 0 ? 0 : paginationState - PAGINATION_CONSTANT,
              inputRef.current.value
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
  }, [paginationState, triggerSearch]);

  function changePagination(change) {
    setPaginationState(paginationState + change < PAGINATION_CONSTANT ? PAGINATION_CONSTANT : paginationState + change);
  }

  const inputRef = React.useRef(null);

  function update() {
    let timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      muscleSelect === "default"
        ? setExerciseList(
            await getExercisesAll(
              PAGINATION_CONSTANT,
              paginationState - PAGINATION_CONSTANT < 0 ? 0 : paginationState - PAGINATION_CONSTANT,
              inputRef.current.value
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

  return (
    <Box className="leftSide col-3">
      <Card variant="elevation">
        <CardContent>
          <Typography className="cardTitle" color="text.primary" gutterBottom>
            Exercise Library
          </Typography>
        </CardContent>
        <CardContent>
          <FormControl fullWidth>
            <div className="inputLabel">{Resources.filterByMuscle}</div>
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
          {exerciseList.map((ex) => {
            return <ExerciseListItem key={ex.exerciseId} ex={ex} />;
          })}
        </CardContent>
        <Pagination
          paginationState={paginationState}
          PAGINATION_CONSTANT={PAGINATION_CONSTANT}
          changePagination={changePagination}
          objectList={exerciseList}
        />
      </Card>
      {exerciseUsedAlert && <Alert severity="warning">{Resources.UsedExerciseAlert}</Alert>}
    </Box>
  );
}