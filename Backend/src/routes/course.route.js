import express from 'express';
import { createCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';

export const courseRouter = express.Router();

courseRouter.post('/create-course',isAuth, upload.single("thumbnail"),createCourse);
courseRouter.get('/published-courses', getPublishedCourses);
courseRouter.get('/creator-courses', isAuth, getCreatorCourses);
courseRouter.post('/update-course/:courseId', isAuth, upload.single("thumbnail"), updateCourse);
courseRouter.get('/course/:courseId', isAuth, getCourseById);
courseRouter.delete('/delete-course/:courseId', isAuth, removeCourse); 