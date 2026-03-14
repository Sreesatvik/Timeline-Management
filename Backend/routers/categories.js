import express from 'express';
import { categoryController }  from '../controllers/CategoryController.js';
import { authenticate } from '../middlewares/auth-middleware.js';

const categoryRouter = express.Router();
const category = new categoryController();


categoryRouter.get('/getallcategories', authenticate, category.getallcategories.bind(category));
categoryRouter.post('/', authenticate, category.createCategory.bind(category));
categoryRouter.delete("/delete", category.deleteCategory.bind(category));
categoryRouter.put('/:id', category.updateCategory.bind(category));

export default categoryRouter;