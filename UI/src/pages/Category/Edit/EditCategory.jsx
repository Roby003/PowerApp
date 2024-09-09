import { Alert, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ValidationMessages from "../../../resources/ValidationMessages";
import useCategoryService from "../../../services/CategoryService";
import Paths from "../../../statics/Paths";
import Resources from "../../../statics/Resources";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
function EditCategory() {
  const {
    values: category,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setValues: setCategory,
  } = useValidation(
    new Validator()
      .forProperty("name")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("categoryId")
      .check(VALIDATIONS.alwaysTrue, "")
      .applyCheckOnlyOnSubmit()
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCategory, getCategoryById } = useCategoryService();

  useEffect(() => {
    async function loadFromDb() {
      setCategory(await getCategoryById(id));
    }
    loadFromDb();
  }, []);

  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        await updateCategory(category).then(() => navigate(Paths.categoryPage));
      } catch (err) {
        applyErrorsFromApi(err.message.errors);
      }
    }
  };
  return (
    <div className="centered">
      <Box className="centerCard col-6">
        <Card variant="elevation">
          <CardContent>
            <div className="pageTitle">{Resources.CategoryUpdate}</div>
          </CardContent>

          <CardContent>
            <div className="inputLabel">Name</div>
            <TextField
              name="name"
              className="workoutNoteInput"
              value={category.name}
              variant="outlined"
              onChange={onChangeInput}
              error={errors.name}
            />
            {errors["name"] && <Alert severity="error">{errors.name}</Alert>}
          </CardContent>
          <CardContent className="flexRight flexStart">
            <Button onClick={handleSubmit} variant="contained">
              {Resources.Edit}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(Paths.categoryPage);
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

export default EditCategory;
