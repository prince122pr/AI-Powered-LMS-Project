import cookieParser from "cookie-parser";
import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";
import { courseRouter } from "./routes/course.route.js";
import { paymentRouter } from "./routes/payment.route.js";
import reviewRouter from "./routes/review.route.js";

const app = express();

app.use(express.json());       // For JSON
app.use(express.urlencoded({ extended: true }));  // For form-data


app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/order', paymentRouter);
app.use('/api/v1/review', reviewRouter);

export default app;