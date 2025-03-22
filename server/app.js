import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import taskRouter from './routes/task.route.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/auth",authRouter); //http://localhost:5001/auth/login||signup||logout
app.use("/task",taskRouter); //http://localhost:5001/task/getTask||addTask||updateTask||deleteTask

export {app}