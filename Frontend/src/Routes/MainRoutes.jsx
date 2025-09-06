import Courses from "../pages/Educator/Courses";
import CreateLectures from "../pages/Educator/CreateLectures";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Dashboard from "../pages/Educator/Dashboard";
import EditCourses from "../pages/Educator/EditCourses";
import { useSelector } from "react-redux";
import Profile from "../pages/Profile";
import EditLectures from "../pages/Educator/EditLectures";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Register from "../pages/Register";
import CreateCourses from "../pages/Educator/CreateCourses";
import EnrolledCourses from "../pages/EnrolledCoures";
import ViewCourse from "../pages/ViewCourse";
import ViewLecture from "../pages/ViewLecture";
const MainRoutes = () => {
  const user = useSelector((store) => store.user.userData); // Adjust to your slice

  return (
    <Routes>
      {/* Home is protected: redirect to login if no user */}
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* about page */}
      <Route path="/about" element={<About />} />

      {/* contact page */}
      <Route path="/contact" element={<Contact />} />

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

      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route path="/forget-password" element={<ForgetPassword />} />

      <Route
        path="/dashboard"
        element={
          user?.role === "educator" ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/create-course"
        element={
          user?.role === "educator" ? (
            <CreateCourses />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/update-course/:courseId"
        element={
          user?.role === "educator" ? (
            <EditCourses />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/courses"
        element={user ? <Courses /> : <Navigate to="/login" replace />}
      />
      
      <Route
        path="/enrolled-courses"
        element={user ? <EnrolledCourses /> : <Navigate to="/login" replace />}
      />


      {/* Course Details Route - Accessible to anyone */}
      <Route path="/course/:courseId" element={<ViewCourse />} />

      <Route path="/view-lecture/:courseId" element={< ViewLecture/>} />



      {/* Educator Lecture Routes */}
      <Route
        path="/courses/:courseId/create-lecture"
        element={
          user?.role === "educator" ? (
            <CreateLectures />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/courses/:courseId/edit-lecture/:lectureId"
        element={
          user?.role === "educator" ? (
            <EditLectures />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default MainRoutes;
