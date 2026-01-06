import express from 'express';
// import { categoryController }  from '../controllers/CategoryController.js';
import assignmentRouter from './assignments.js';
import categoryRouter   from './categories.js';
const router = express.Router();

// no need to do like this as module is not same as class
// const category = new categoryRouter();
// const assignment = new assignmentRouter();

router.use('/categories', categoryRouter);
router.use('/assignments', assignmentRouter);

// router.get('/categories',category.getHome);
// router.post('/categories', category.createCategory.bind(category));
// router.get('/delete',category.deleteCategory);


export default router;