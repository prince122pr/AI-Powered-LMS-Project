import express from "express";
import { razorpayOrder, verifyPayment } from "../controllers/order.controller.js";

export const paymentRouter = express.Router();

paymentRouter.post('/create-order', razorpayOrder);
paymentRouter.post('/verify-payment', verifyPayment);