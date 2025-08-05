import express from 'express';
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/all', getAllCategories);
categoryRouter.post('/add', addCategory);
categoryRouter.put('/update/:id', updateCategory);
categoryRouter.delete('/delete/:id', deleteCategory);

export default categoryRouter;
