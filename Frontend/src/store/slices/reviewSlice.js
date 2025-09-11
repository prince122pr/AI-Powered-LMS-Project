import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    reviews: [],
}

const reviewSlice = createSlice({
    name: "reviews",   
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },

    }
})

export const { setReviews} = reviewSlice.actions;
export default reviewSlice.reducer;