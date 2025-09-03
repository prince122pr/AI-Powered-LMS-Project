import cookieParser from "cookie-parser";
import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";

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


export default app;