import { Navigate } from "react-router-dom";
import userSession from "../../utils/userSession";

function AdminRoute({ children }) {
  return userSession.isAuthenticated() && userSession.user().roleId == 1 ? children : <Navigate to="/" />;
}
export default AdminRoute;
