import { Alert, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import ValidationMessages from "../../../resources/ValidationMessages";
import useCategoryService from "../../../services/CategoryService";
import Paths from "../../../statics/Paths";
import Resources from "../../../statics/Resources";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
function CreateCategory() {
  const {
    values: category,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
  } = useValidation(
    new Validator()
      .forProperty("name")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .applyCheckOnlyOnSubmit()
  );
  const navigate = useNavigate();
  const { addCategory } = useCategoryService();
  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        await addCategory(category).then(() => navigate(Paths.categoryPage));
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
            <div className="pageTitle">{Resources.CategoryCreate}</div>
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
              {Resources.Create}
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

export default CreateCategory;
