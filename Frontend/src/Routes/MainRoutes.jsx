import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import Profile from "../pages/Profile";
import ForgetPassword from "../pages/ForgetPassword";

const MainRoutes = () => {
  const user = useSelector((store) => store.user.userData); // Adjust to your slice

  return (
    <Routes>
      {/* Home is protected: redirect to login if no user */}
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Login & Register pages */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Fallback: redirect any unknown route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />

      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
      
      <Route path="/forget-password" element={<ForgetPassword/>} />
    </Routes>
  );
};

export default MainRoutes;
