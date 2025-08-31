import cookieParser from "cookie-parser";
import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

let port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/v1/auth', authRouter);

app.listen(port, ()=>{
    console.log(`App is running on the port: ${port}`);
})

export default app;