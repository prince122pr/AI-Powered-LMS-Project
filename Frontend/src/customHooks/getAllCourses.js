import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendBaseURL } from "../App";
import { setAllCourses } from "../store/slices/courseSlice"; // create a separate reducer for all courses

const useAllCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.allCourses); // all courses slice

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendBaseURL}/course/published-courses`, {
          withCredentials: true,
        });
        dispatch(setAllCourses(res.data)); // save in redux
        setError(null);
      } catch (err) {
        console.error("Error fetching all courses:", err);
        setError("Failed to fetch all courses");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, [ dispatch]);

  return { courses, loading, error };
};

export default useAllCourses;
