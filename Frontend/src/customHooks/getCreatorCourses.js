import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCreatorCourseData } from '../store/slices/courseSlice';
import axios from 'axios';
import { backendBaseURL } from '../App';

const useCreatorCourses = () => {
    let dispatch = useDispatch();
  useEffect(() => {
    const createdCourses = async () => {
        try {
            const res = await axios.get(backendBaseURL+"/course/creator-courses", {withCredentials: true})
            // console.log(res);
            dispatch(setCreatorCourseData(res.data));
        } catch (error) {
            console.log(error);
        }
    }
    createdCourses()
  }, [dispatch])
}

export default useCreatorCourses