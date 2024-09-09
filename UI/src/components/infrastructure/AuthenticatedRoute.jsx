import userSession from "../../utils/userSession";
import { Navigate } from "react-router-dom";

function AuthenticatedRoute({ children }) {
  return userSession.isAuthenticated() ? children : <Navigate to="/" />;
}
export default AuthenticatedRoute;
