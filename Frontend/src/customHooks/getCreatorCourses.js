import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../store/slices/courseSlice';
import axios from 'axios';
import { backendBaseURL } from '../App';

const useCreatorCourses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData); // get current user

  useEffect(() => {
    const createdCourses = async () => {
      if (!user) return; // skip fetching if no user

      try {
        const res = await axios.get(`${backendBaseURL}/course/creator-courses`, { withCredentials: true });
        dispatch(setCreatorCourseData(res.data));
      } catch (error) {
        console.log(error);
      }
    }

    createdCourses();
  }, [dispatch, user]); // fetch only when user exists
}

export default useCreatorCourses;
