import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainRoutes from "./Routes/MainRoutes";
import useCreatorCourses from "./customHooks/getCreatorCourses";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./store/actions/userActions";
import useAllCourses from "./customHooks/getAllCourses";


export const backendBaseURL = "http://localhost:8000/api/v1";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // gives current path
  const [loadingUser, setLoadingUser] = useState(true);

  let user = useSelector((state) => state.user.userData);

  useEffect(() => {
    !user && dispatch(currentUser());
  },[dispatch, user])

  useAllCourses()
  
  // Call the hook to fetch and set creator courses in Redux
  useCreatorCourses();

  // Optional: track loading state (if we want to show a loader)
  useEffect(() => {
    // Small delay to simulate fetch completion
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

  // Hide Navbar on these paths
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <MainRoutes />
    </div>
  );
};

export default App;
