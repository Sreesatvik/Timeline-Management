import express from 'express';
import {UserController} from '../controllers/UserController.js';
import { loginSchema, signupSchema } from "../validators/auth-validator.js";
import {validate} from '../middlewares/validate-middleware.js';

const userRouter = express.Router();
const User = new UserController();

userRouter.post('/registration',validate(signupSchema), User.register.bind(User));
userRouter.post('/login',validate(loginSchema), User.login.bind(User));

export default userRouter;