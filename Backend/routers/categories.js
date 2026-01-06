import express from 'express';
import { categoryController }  from '../controllers/CategoryController.js';

const categoryRouter = express.Router();
const category = new categoryController();


categoryRouter.get('/getallcategories',category.getallcategories.bind(category));
categoryRouter.post('/', category.createCategory.bind(category));
categoryRouter.delete("/delete", category.deleteCategory.bind(category));
categoryRouter.put('/:id', category.updateCategory.bind(category));

export default categoryRouter;