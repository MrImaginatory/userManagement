import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./database/db.js"

dotenv.config();

connectDB()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server up and running at port ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log("Error Connectiong to DB",error);
    })