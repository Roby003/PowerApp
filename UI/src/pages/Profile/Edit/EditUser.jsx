import { Alert, Box, Button, Card, CardContent, Input, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ValidationMessages from "../../../resources/ValidationMessages";
import useAuthService from "../../../services/UserService";
import Paths from "../../../statics/Paths";
import Resources from "../../../statics/Resources";
import VALIDATIONS from "../../../validations";
import { useValidation } from "../../../validations/useValidation";
import Validator from "../../../validations/Validator";
function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateUser, getUserById } = useAuthService();

  const {
    values: user,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setErrors,
    setValues: setUser,
  } = useValidation(
    new Validator()
      .forProperty("id")
      .check(VALIDATIONS.alwaysTrue, "")
      .forProperty("userName")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("email")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .check(VALIDATIONS.isEmail, ValidationMessages.general.isEmail)
      .forProperty("password")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("roleId")
      .check(VALIDATIONS.alwaysTrue, "")
      .forProperty("image")
      .check(VALIDATIONS.alwaysTrue, "")
      .forProperty("description")
      .check(VALIDATIONS.alwaysTrue, "")
      .applyCheckOnlyOnSubmit()
  );
  useEffect(() => {
    async function loadFromDb() {
      setUser({ ...(await getUserById(id)), password: "" });
    }
    loadFromDb();
  }, [id]);

  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        debugger;
        await updateUser(user).then(() => navigate(`${Paths.profileBuilder}${id}`));
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
            <div className="pageTitle">{Resources.UserEdit}</div>
          </CardContent>
          <CardContent>
            <div className="inputLabel">Email</div>
            <TextField
              name="email"
              error={errors.email}
              className="workoutNoteInput"
              variant="outlined"
              value={user.email}
              onChange={onChangeInput}
            />
            {errors.email && <Alert severity="error">{errors.email}</Alert>}
          </CardContent>
          <CardContent>
            <div className="inputLabel">Username</div>
            <TextField
              name="userName"
              error={errors.userName}
              className="workoutNoteInput"
              variant="outlined"
              value={user.userName}
              onChange={onChangeInput}
            />
            {errors.userName && <Alert severity="error">{errors.userName}</Alert>}
          </CardContent>
          <CardContent>
            <div className="inputLabel">Password</div>
            <TextField
              type="password"
              name="password"
              error={errors.password}
              className="workoutNoteInput"
              variant="outlined"
              value={user.password}
              onChange={onChangeInput}
            />
            {errors.password && <Alert severity="error">{errors.password}</Alert>}
          </CardContent>
          <CardContent>
            <div className="inputLabel">{Resources.ImageSelect}</div>
            <Input
              onChange={(e) => {
                setUser({
                  ...user,
                  image: e.target.files && e.target.files.length > 0 ? e.target.files[0] : undefined,
                });
              }}
              placeholder="description"
              type="file"
              accept="image/*"
            ></Input>
          </CardContent>
          <CardContent>
            <div className="inputLabel">Description</div>
            <TextField
              name="description"
              error={errors.description}
              className="workoutNoteInput"
              variant="outlined"
              value={user.description}
              onChange={onChangeInput}
              multiline
            />
            {errors.description && <Alert severity="error">{errors.description}</Alert>}
          </CardContent>
          <CardContent className="flexRight flexStart">
            <Button variant="contained" onClick={handleSubmit}>
              {Resources.Edit}
            </Button>
            <Button variant="outlined" onClick={() => navigate(`${Paths.profileBuilder}${id}`)}>
              {Resources.Cancel}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default EditUser;
