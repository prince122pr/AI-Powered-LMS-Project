import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    creatorCourseData: null,
     allCourses: [],
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{
        setCreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload
        },
        setAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    }
})

export const {setCreatorCourseData, setAllCourses } = courseSlice.actions
export default courseSlice.reducer