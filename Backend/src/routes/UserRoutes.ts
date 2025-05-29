// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\routes\UserRoutes.ts

import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/signup", userController.signUpUser.bind(userController));
userRouter.post("/login", userController.loginUser.bind(userController));
userRouter.post("/logout", authMiddleware, userController.logout.bind(userController));

export default userRouter;
