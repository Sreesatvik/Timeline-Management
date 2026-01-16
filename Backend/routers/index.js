import express from 'express';
import assignmentRouter from './assignments.js';
import categoryRouter   from './categories.js';
import userRouter from './users.js';
const router = express.Router();


router.use('/categories', categoryRouter);
router.use('/assignments', assignmentRouter);
router.use('/users', userRouter);


export default router;