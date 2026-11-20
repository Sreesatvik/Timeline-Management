import express from 'express';
import assignmentRouter from './assignments/assignments.js';
import categoryRouter   from './categories/categories.js';
import userRouter from './auth/users.js';
const router = express.Router();


router.use('/categories', categoryRouter);
router.use('/assignments', assignmentRouter);
router.use('/users', userRouter);


export default router;