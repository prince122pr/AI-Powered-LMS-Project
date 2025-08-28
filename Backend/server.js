import app from "./src/app.js";
import {config} from "dotenv";
import { connectToDB } from "./src/db/db.js";

config();

connectToDB();

let port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server is running on the port: ${port}`);
})