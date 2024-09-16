import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, Box, Button, CardContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormResources from "../../resources/FormResources";
import PageResources from "../../resources/PageResources";
import ValidationMessages from "../../resources/ValidationMessages";
import useAuthService from "../../services/UserService";
import Resources from "../../statics/Resources";
import VALIDATIONS from "../../validations";
import { useValidation } from "../../validations/useValidation";
import Validator from "../../validations/Validator";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Register = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const formValidator = new Validator()
    .forProperty("email")
    .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
    .check(VALIDATIONS.isEmail, ValidationMessages.general.email)
    .forProperty("password")
    .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
    .forProperty("userName")
    .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
    .forProperty("image")
    .check(VALIDATIONS.alwaysTrue, "")
    .forProperty("description")
    .check(VALIDATIONS.alwaysTrue, "")
    .applyCheckOnlyOnSubmit();

  const {
    values: formData,
    errors: formErrors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setValues,
  } = useValidation(formValidator);

  const { register } = useAuthService();

  const handleSubmit = async () => {
    if (!handleCheckFormErrors()) {
      try {
        await register(formData).then(() => setIsLogin(true));
      } catch (err) {
        applyErrorsFromApi(err.message.errors);
      }
    }
  };

  return (
    <Box className="loginCard">
      <div style={{ width: "80%" }}>
        <CardContent>
          <div className="loginTitle">{PageResources.userRegisterPage.pageTitle}</div>
        </CardContent>

        <CardContent>
          <div className="inputLabel">{FormResources.userRegistration.emailLabel}</div>
          <TextField
            error={Boolean(formErrors["email"])}
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={onChangeInput}
            fullWidth
          />
          {formErrors["email"] && <Alert severity="error">{formErrors["email"]}</Alert>}
        </CardContent>

        <CardContent>
          <div className="inputLabel">{FormResources.userRegistration.userNameLabel}</div>
          <TextField
            error={Boolean(formErrors["userName"])}
            variant="outlined"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={onChangeInput}
            fullWidth
          />
          {formErrors["userName"] && <Alert severity="error">{formErrors["userName"]}</Alert>}
        </CardContent>

        <CardContent>
          <div className="inputLabel">{FormResources.userLogin.passwordLabel}</div>

          <TextField
            error={Boolean(formErrors["password"])}
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeInput}
            fullWidth
          />
          {formErrors["password"] && <Alert severity="error">{formErrors["password"]}</Alert>}
        </CardContent>

        <CardContent>
          <div className="inputLabel">{Resources.ImageSelect}</div>
          <Button component="label" role={undefined} variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setValues({
                  ...formData,
                  image: e.target.files && e.target.files.length > 0 ? e.target.files[0] : undefined,
                });
              }}
            />
          </Button>
          {formData.image && <p>{formData.image.name}</p>}
        </CardContent>
        <CardContent>
          <div className="inputLabel">Add a description to your profile</div>
          <TextField
            error={Boolean(formErrors["description"])}
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={onChangeInput}
            fullWidth
            multiline
          />
          {formErrors["description"] && <Alert severity="error">{formErrors["description"]}</Alert>}
        </CardContent>
        <CardContent className="flexRight">
          <Button variant="contained" onClick={handleSubmit}>
            {FormResources.userRegistration.registerButtonLabel}
          </Button>
          <div className="row">
            <div className="subTitle col col-9">Already have an account?</div>
            <a style={{ fontSize: 14 }} onClick={() => setIsLogin(true)}>
              Log in
            </a>
          </div>
        </CardContent>
      </div>
    </Box>
  );
};

export default Register;
