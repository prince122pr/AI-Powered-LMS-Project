import courseModel from "../models/course.model";
import razorpay from "../services/razorpay.service";

export const razorpayOrder = async () => {
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
            courrency: "INR",
            receipt: `${course._id}.toString()}`,
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
            
        }       
    } catch (error) {
        
    }
}