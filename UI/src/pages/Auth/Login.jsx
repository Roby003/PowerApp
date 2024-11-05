import { Alert, Box, Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import FormResources from "../../resources/FormResources";
import PageResources from "../../resources/PageResources";
import ValidationMessages from "../../resources/ValidationMessages";
import useAuthService from "../../services/UserService";
import VALIDATIONS from "../../validations";
import { useValidation } from "../../validations/useValidation";
import Validator from "../../validations/Validator";
const LoginPage = ({ setIsLogin }) => {
  const { login } = useAuthService();
  const { setIsAuth } = useAccount();
  const navigate = useNavigate();

  const {
    values: loginDetails,
    errors,
    onChangeInput,
    handleCheckFormErrors,
    applyErrorsFromApi,
    setErrors,
  } = useValidation(
    new Validator()
      .forProperty("email")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .forProperty("password")
      .check(VALIDATIONS.isRequired, ValidationMessages.general.isRequired)
      .check(VALIDATIONS.minLength(3), ValidationMessages.general.minLength(3))
      .applyCheckOnlyOnSubmit()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleCheckFormErrors()) {
      try {
        await login(loginDetails);
        setIsAuth(true);
        navigate("/feed");
      } catch (err) {
        setErrors({ ...errors, password: "Invald Credentials" });
      }
    }
  };

  return (
    <Box className="loginCard">
      <div style={{ width: "80%" }}>
        <CardContent>
          <div className="loginTitle">{PageResources.loginPage.pageTitle}</div>
        </CardContent>
        <CardContent>
          <div className="inputLabel">{FormResources.userLogin.emailLabel}</div>
          <TextField
            className="workoutNoteInput fullWidth"
            name="email"
            value={loginDetails.email}
            onChange={onChangeInput}
            error={Boolean(errors.email)}
            variant="outlined"
          />
        </CardContent>
        <CardContent>
          <div className="inputLabel">{FormResources.userLogin.passwordLabel}</div>
          <TextField
            className="workoutNoteInput fullWidth"
            name="password"
            value={loginDetails.password}
            onChange={onChangeInput}
            error={Boolean(errors.password)}
            variant="outlined"
            type="password"
          />
          {errors["password"] && <Alert severity="error">{errors["password"]}</Alert>}
        </CardContent>
        <CardContent className="flexRight">
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            {FormResources.userLogin.loginButtonLabel}
          </Button>
          <div className="row">
            <div className="subTitle col col-9">New to PowerApp?</div>
            <a style={{ fontSize: 14 }} onClick={() => setIsLogin(false)}>
              Sign Up
            </a>
          </div>
        </CardContent>
      </div>
    </Box>
  );
};

export default LoginPage;
