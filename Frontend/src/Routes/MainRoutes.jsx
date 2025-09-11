import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Profile from "../pages/Profile";

import Dashboard from "../pages/Educator/Dashboard";
import CreateCourses from "../pages/Educator/CreateCourses";
import EditCourses from "../pages/Educator/EditCourses";
import Courses from "../pages/Courses";
import CreateLectures from "../pages/Educator/CreateLectures";
import EditLectures from "../pages/Educator/EditLectures";

import EnrolledCourses from "../pages/EnrolledCoures";
import ViewCourse from "../pages/ViewCourse";
import ViewLecture from "../pages/ViewLecture";
import SearchWithAI from "../pages/SearchWithAI";

const MainRoutes = () => {
  const { courseId } = useParams();

  const user = useSelector((store) => store.user.userData);

  return (
    <Routes>
      {/* Home is protected */}
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Public pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/forget-password" element={<ForgetPassword />} />

      {/* Profile */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />

      {/* Educator routes */}
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

      {/* Courses */}
      <Route
        path="/courses"
        element={user ? <Courses /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/enrolled-courses"
        element={user ? <EnrolledCourses /> : <Navigate to="/login" replace />}
      />

      {/* Course Details */}
      <Route
        path="/course/:courseId"
        element={
          user ? (
            <ViewCourse key={courseId} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/view-lecture/:courseId"
        element={user ? <ViewLecture /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/search-ai"
        element={user ? <SearchWithAI /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default MainRoutes;
