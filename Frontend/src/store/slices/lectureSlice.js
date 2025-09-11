import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    lectures: [],

}

const lectureSlice = createSlice({
    name: "lectures",   
    initialState,
    reducers: {
        setLectures: (state, action) => {
            state.lectures = action.payload;
        },
        getLectures: (state, action) => {
            state.lectures = action.payload;
        }
    }
})

export const { setLectures, getLectures} = lectureSlice.actions;
export default lectureSlice.reducer;