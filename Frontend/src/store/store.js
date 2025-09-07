import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.js';
import courseSlice from './slices/courseSlice.js';
import lectureSlice from './slices/lectureSlice.js'; 

export const store = configureStore({
  reducer: {
    user: userSlice,
    course: courseSlice,
    lectures: lectureSlice, 
  },
});
