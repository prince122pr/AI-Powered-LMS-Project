import axios from "axios";
import { backendBaseURL } from "../../App";
import { setLectures } from "../slices/lectureSlice";

export const getLectures = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${backendBaseURL}/course/lecture/${courseId}`,
      { withCredentials: true }
    );

    // console.log("Fetched Lectures:", res.data);

    // Handle both response formats
    const lecturesData = res.data.lectures || res.data || [];

    dispatch(setLectures(lecturesData));
    return lecturesData;
  } catch (error) {
    console.error("Getting Lectures Error:", error);
    dispatch(setLectures([]));
    throw error;
  }
};

export const createLecture = (courseId, lectureData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${backendBaseURL}/course/create-lecture/${courseId}`,
      lectureData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );


    dispatch(getLectures(courseId))
    return res.data;
  } catch (error) {
    console.error("Creating Lecture Error:", error);
    throw error;
  }
};

export const updateLecture = (lectureId, lectureData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${backendBaseURL}/course/update-lecture/${lectureId}`,
      lectureData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    // console.log("Updated Lecture:", res.data);

    // Try different keys to extract courseId
    const courseId =
      res.data?.lecture?.courseId ||
      res.data?.updatedLecture?.courseId ||
      lectureData.courseId;

    if (courseId) {
      await dispatch(getLectures(courseId));
    }

    return res.data;
  } catch (error) {
    console.error("Updating Lecture Error:", error);
    throw error;
  }
};

export const deleteLecture = (lectureId, courseId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${backendBaseURL}/course/delete-lecture/${lectureId}`,
      { withCredentials: true }
    );
    
    // console.log("Deleted Lecture:", res.data);

    if (courseId) {
      await dispatch(getLectures(courseId));
    }

    return res.data;
  } catch (error) {
    console.error("Deleting Lecture Error:", error);
    throw error;
  }
};
