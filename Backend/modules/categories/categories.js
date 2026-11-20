import express from 'express';
import { categoryController }  from './CategoryController.js';
import { authenticate } from '../../middleware/auth-middleware.js';

const categoryRouter = express.Router();
const category = new categoryController();


categoryRouter.get('/getallcategories', authenticate, category.getallcategories.bind(category));
categoryRouter.post('/', authenticate, category.createCategory.bind(category));
categoryRouter.delete("/delete", authenticate, category.deleteCategory.bind(category));
categoryRouter.put('/:id', authenticate, category.updateCategory.bind(category));

export default categoryRouter;