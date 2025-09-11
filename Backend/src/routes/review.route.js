import express from "express"
import { isAuth } from "../middlewares/isAuth.js"
import { createReview, getAllReviews, getCourseReviews } from "../controllers/review.controller.js"



let reviewRouter = express.Router()

reviewRouter.post("/create-review",isAuth,createReview)
reviewRouter.get("/course-review/:courseId",isAuth,getCourseReviews)
reviewRouter.get("/allReviews",getAllReviews)


export default reviewRouter