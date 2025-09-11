import axios from "axios"
import { backendBaseURL } from "../../App"
import { setReviews } from "../slices/reviewSlice";
import { toast } from "react-toastify";

export const getCourseReviews = (courseId) => async(dispatch) => {
     try {
        const res = await axios.get(`${backendBaseURL}/review/course-review/${courseId}`,{ withCredentials: true });
        console.log(res);
        
        dispatch(setReviews(res.data.reviews || []))
     } catch (error) {
       console.log(error);
     }
}

export const createCourseReview = ({ courseId, rating, comment }) => async (dispatch) => {
  try {
    await axios.post(
      `${backendBaseURL}/review/create-review`,
      { courseId, rating, comment },
      { withCredentials: true }
    );

    // agar success ho toh latest reviews fetch karo
    dispatch(getCourseReviews(courseId));
    toast.success("Review submitted successfully!");
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message); 
    } else {
      toast.error("Something went wrong! Please try again.");
    }
  }
};
