import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainRoutes from "./Routes/MainRoutes";
import useCreatorCourses from "./customHooks/getCreatorCourses";
import useAllCourses from "./customHooks/getAllCourses";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./store/actions/userActions";
import ScrollToTop from "./components/ScrollToTop";
// import { getLectures } from "./store/actions/lectureActions";

export const backendBaseURL = "http://localhost:8000/api/v1";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // gives current path
  const [loadingUser, setLoadingUser] = useState(true);

  const user = useSelector((state) => state.user.userData) || null;
  

  // Determine if current path is public (login/register)
  const isPublicRoute = ["/login", "/register"].includes(location.pathname);

  // Fetch current user only on protected routes
  useEffect(() => {
    if (!isPublicRoute && !user) {
      dispatch(currentUser());
    }
  }, [dispatch, user, isPublicRoute]);

  // Load all courses (public data)
  useAllCourses();

  // Load creator courses (if user is logged in)
  
  useCreatorCourses();



  // scroll to top
  <ScrollToTop/>

  // Optional: simple loader for app initialization
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
      {!isPublicRoute && <Navbar />}
      <MainRoutes />
    </div>
  );
};

export default App;
