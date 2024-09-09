import React, { useState } from "react";
// import SignIn from "./Auth/SingIn";
// import SignUp from "./Auth/SignUp";
import welcomeImage from "../../components/svg/landing_page.jpg";
import LoginPage from "../Auth/Login";
import Register from "../Auth/Register";
const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="row">
      <div className="col col-4">
        {!isLogin ? (
          <Register setIsLogin={setIsLogin} />
        ) : (
          <>
            <LoginPage setIsLogin={setIsLogin} />
          </>
        )}
      </div>
      <div className="col col-7">
        <img src={welcomeImage} className="landingPagePic" />
      </div>
    </div>
  );
};

export default LandingPage;
