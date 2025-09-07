import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatorCourseData } from '../store/slices/courseSlice';
import axios from 'axios';
import { backendBaseURL } from '../App';

const useCreatorCourses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData); // get current user

  useEffect(() => {
    const fetchCreatorCourses = async () => {
      if (!user) return; // skip fetching if no user

      try {
        const res = await axios.get(`${backendBaseURL}/course/creator-courses`, { withCredentials: true });
        dispatch(setCreatorCourseData(res.data));
      } catch (error) {
        console.error("Error fetching creator courses:", error);
      }
    };

    fetchCreatorCourses();
  }, [dispatch, user]); // run effect only when user exists
};

export default useCreatorCourses;
