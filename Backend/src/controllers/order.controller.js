import courseModel from "../models/course.model.js";
import { userModel } from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";

export const razorpayOrder = async (req, res) => {
    try {
        const {courseId} = req.body;
        const course  = await courseModel.findById(courseId);
        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        const options = {
            amount: course.price * 100,  // convert to paise
            currency: "INR",
            receipt: courseId.toString(),
        }
        const order = await razorpay.orders.create(options);
        console.log(order);
        
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating razorpay order",
            error: error.message,
        });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {courseId, userId, razorpay_order_id} = req.body; 
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

        if(orderInfo.status === "paid") {
            const user = await userModel.findById(userId);
            if(!user?.enrolledCourses.includes(courseId)) {
                user.enrolledCourses.push(courseId);
                await user.save();
            }
            const course = await courseModel.findById(courseId).populate('lectures');
            if(!course.enrolledStudents.includes(userId)){
                course.enrolledStudents.push(userId);
                await course.save();

            }
            return res.status(200).json({
                message: "Payment Verfied and Enrollment Successful!"
            })
        }       
        else{
            return res.status(400).json({message: "Payment Failed!"})
        }

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error during payment verification! ${error}`
        })
    }
}