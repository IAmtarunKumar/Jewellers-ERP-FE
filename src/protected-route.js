
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element, path }) => {
  // const isLoggedIn = !!jwtDecode(localStorage.getItem("userDetail").foundUser);
  const isLoggedIn = true;
  if (isLoggedIn) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
