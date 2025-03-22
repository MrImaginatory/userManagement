import {Router} from "express";
import {registerController,loginController} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup",registerController);
authRouter.post("/login",loginController);

export default authRouter;
