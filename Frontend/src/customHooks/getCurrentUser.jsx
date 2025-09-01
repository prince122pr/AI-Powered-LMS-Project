import { useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/slices/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendBaseURL}/user/getcurrentuser`, {
          withCredentials: true,
        });
        // console.log(res.data);
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, []); // dispatch dependency
};

export default useCurrentUser;
