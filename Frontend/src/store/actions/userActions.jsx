import axios from "axios";
import { backendBaseURL } from "../../App";
import { setUserData } from "../slices/userSlice";

// Thunk action
export const currentUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${backendBaseURL}/user/getcurrentuser`, {
      withCredentials: true,
    });
    // console.log(res);
    
    if (res) {
      dispatch(setUserData(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(setUserData(null));
  }
};
