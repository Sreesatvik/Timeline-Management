import express from 'express';
import {UserController} from '../controllers/UserController.js';

const userRouter = express.Router();
const User = new UserController();

userRouter.post('/registration', User.register.bind(User));

export default userRouter;