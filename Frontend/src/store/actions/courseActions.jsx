import axios from "axios";
import { backendBaseURL } from "../../App";
import { setAllCourses } from "../slices/courseSlice";

export const createCourses = (formData) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`${backendBaseURL}/course/create-course`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    if (res?.data) {
      const { allCourses } = getState().course; // get existing courses
      dispatch(setAllCourses([...allCourses, res.data])); // append new course
    }
  } catch (error) {
    console.log(error);
  }
};

