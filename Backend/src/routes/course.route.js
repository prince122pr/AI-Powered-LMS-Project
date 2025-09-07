import express from 'express';
<<<<<<< HEAD
import { createCourse, createLecture, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture, updateCourse } from '../controllers/course.controller.js';
=======
import { createCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse, updateCourse } from '../controllers/course.controller.js';
>>>>>>> 9642e9f64970b7461f9a7b72d829a5ac709ea483
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';

export const courseRouter = express.Router();

<<<<<<< HEAD
// course routes
=======
>>>>>>> 9642e9f64970b7461f9a7b72d829a5ac709ea483
courseRouter.post('/create-course',isAuth, upload.single("thumbnail"),createCourse);
courseRouter.get('/published-courses', getPublishedCourses);
courseRouter.get('/creator-courses', isAuth, getCreatorCourses);
courseRouter.post('/update-course/:courseId', isAuth, upload.single("thumbnail"), updateCourse);
courseRouter.get('/course/:courseId', isAuth, getCourseById);
<<<<<<< HEAD
courseRouter.delete('/delete-course/:courseId', isAuth, removeCourse); 

// lecture routes
courseRouter.post('/create-lecture/:courseId', isAuth, upload.single("videoURL"), createLecture);
courseRouter.post('/update-lecture/:lectureId', isAuth, upload.single("videoURL"), editLecture);
courseRouter.delete('/delete-lecture/:lectureId', isAuth, removeLecture);
courseRouter.get('/lecture/:courseId', isAuth, getCourseLecture); 
=======
courseRouter.delete('/delete-course/:courseId', isAuth, removeCourse); 
>>>>>>> 9642e9f64970b7461f9a7b72d829a5ac709ea483
