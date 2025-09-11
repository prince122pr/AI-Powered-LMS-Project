import axios from "axios";
import { backendBaseURL } from "../../App";
import { setAllCourses, setCreatorCourseData } from "../slices/courseSlice";



export const getAllCourses = () => async (dispatch) => {
  try {
    const res = await axios.get(`${backendBaseURL}/course/published-courses`, {
      withCredentials: true,
    });

    if (res?.data) {
      dispatch(setAllCourses(res.data));
    }
  } catch (error) {
    console.log("Error fetching courses:", error);
  }
};

export const getCreatorCourses = () => async (dispatch) => {
  try {
    const res = await axios.get(`${backendBaseURL}/course/creator-courses`, {
      withCredentials: true,
    });

    if (res?.data) {
      dispatch(setCreatorCourseData(res.data));
    }
  } catch (error) {
    console.log("Error fetching creator courses:", error);
  }
};


export const createCourses = (formData) => async (dispatch) => {
  try {
    await axios.post(`${backendBaseURL}/course/create-course`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    // course create hone ke turant baad fresh data le aao
    dispatch(getCreatorCourses());
  } catch (error) {
    console.log("Error creating course:", error);
  }
};

``