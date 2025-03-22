import {Router} from "express";
import { getTask,addTask,updateTask,deleteTask } from "../controller/crud.controller.js";

const taskRouter = Router();

taskRouter.route("/get").get(getTask);
taskRouter.route("/add").post(addTask);
taskRouter.route("/updateTask/:id").patch(updateTask);
taskRouter.route("/deleteTask/:id").delete(deleteTask);

export default taskRouter;