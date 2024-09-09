import { Alert, Input, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import ValidationMessages from "../../../resources/ValidationMessages";
import useCategoryService from "../../../services/CategoryService";
import useExerciseService from "../../../services/ExerciseService";
import Paths from "../../../statics/Paths";
import Resources from "../../../statics/Resources";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
export default function EditExercise() {
  //  exercise structure {
  //     "name": "test categpry structure",
  //     "catIds": [
  //         {
  //             "value": 1,
  //             "label": "TestCategory"
  //         },
  //         {
  //             "value": 2,
  //             "label": "test2"
  //         }
  //     ]
  // }
  const navigate = useNavigate();
  const {
    values: exercise,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setErrors,
    setValues: setExercise,
  } = useValidation(
    new Validator()
      .forProperty("exerciseId")
      .check(VALIDATIONS.alwaysTrue, "")
      .forProperty("name")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("catIds")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("image")
      .check(VALIDATIONS.alwaysTrue, "")
      .applyCheckOnlyOnSubmit()
  );

  const [categories, setCategories] = React.useState([]);
  const { id } = useParams();

  const { getCategories } = useCategoryService();
  const { updateExercise, getExerciseForUpdate } = useExerciseService();

  React.useEffect(() => {
    async function loadFromDb() {
      let exerciseFromDb = await getExerciseForUpdate(id);
      let exerciseForState = {
        exerciseId: exerciseFromDb["exerciseId"],
        name: exerciseFromDb["name"],
        image: exerciseFromDb["image"],
        catIds: exerciseFromDb["catIds"].map((id, index) => {
          return { value: id, label: exerciseFromDb["catNames"][index] };
        }),
      };
      setExercise({ ...exerciseForState });
    }

    loadFromDb();
  }, [id]);

  React.useEffect(() => {
    const loadFromDb = async () => {
      let categories = await getCategories();
      categories = categories.map((el) => ({
        value: el.categoryId,
        label: el.name,
      }));
      setCategories(categories);
    };

    loadFromDb();
  }, []);

  const handleChange = async (event) => {
    clearCategoryErrors();
    setExercise({
      ...exercise,
      catIds: event,
    });
  };

  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        let catIds = exercise.catIds.map((el) => el.value);
        await updateExercise({ ...exercise, catIds: catIds }).then(() => navigate(Paths.exercisePage));
      } catch (err) {
        applyErrorsFromApi(err.message.errors);
      }
    }
  };

  function clearCategoryErrors() {
    setErrors({ ...errors, ["catIds"]: "" });
  }
  return (
    <div className="centered">
      <Box className="centerCard col-6">
        <Card variant="elevation">
          <CardContent>
            <div className="pageTitle">{Resources.EditExercise}</div>
          </CardContent>

          <CardContent>
            <div className="inputLabel">Name</div>
            <TextField
              name="name"
              className="workoutNoteInput"
              value={exercise.name}
              variant="outlined"
              onChange={onChangeInput}
              error={errors.name}
            />
            {errors["name"] && <Alert severity="error">{errors.name}</Alert>}
          </CardContent>
          <CardContent>
            <div className="inputLabel">{Resources.CategorySelect} </div>
            <ReactSelect
              name="catIds"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exercise.catIds}
              onChange={handleChange}
              isMulti
              options={categories}
              error={errors.catIds}
            ></ReactSelect>
            {errors.catIds && <Alert severity="error">{errors.catIds}</Alert>}
          </CardContent>
          <CardContent>
            <div className="inputLabel">{Resources.ImageSelect}</div>
            <Input
              onChange={(e) => {
                setExercise({
                  ...exercise,
                  image: e.target.files && e.target.files.length > 0 ? e.target.files[0] : undefined,
                });
              }}
              placeholder="description"
              type="file"
              accept="image/*"
            ></Input>
          </CardContent>
          <CardContent className="flexRight flexStart">
            <Button onClick={handleSubmit} variant="contained">
              {Resources.Edit}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(Paths.exercisePage);
              }}
            >
              {Resources.Cancel}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
