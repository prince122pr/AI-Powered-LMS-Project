import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     creatorCourseData: [],
     allCourses: [],
     selectedCourse: null,
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
        setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;    
    }
}
})

export const {setCreatorCourseData, setAllCourses, setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer