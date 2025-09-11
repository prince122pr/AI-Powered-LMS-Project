import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./store/actions/userActions";
import ScrollToTop from "./components/ScrollToTop";
import { getAllCourses, getCreatorCourses } from "./store/actions/courseActions";

export const backendBaseURL = "http://localhost:8000/api/v1";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loadingUser, setLoadingUser] = useState(true);

  const user = useSelector((state) => state.user.userData) || null;

  const isPublicRoute = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    if (!isPublicRoute && !user) {
      dispatch(currentUser());
    }
  }, [dispatch, user, isPublicRoute]);

useEffect(() => {
  if (!isPublicRoute) {
    dispatch(currentUser()).then(() => {
      dispatch(getAllCourses());
      dispatch(getCreatorCourses());
    });
  }
}, [dispatch, isPublicRoute]);

useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    console.log("Install prompt event fired", e);
  };
  window.addEventListener("beforeinstallprompt", handler);

  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);

  

  useEffect(() => {
    const timer = setTimeout(() => setLoadingUser(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-700 text-lg">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {!isPublicRoute && <Navbar />}
      <MainRoutes />
    </div>
  );
};

export default App;
