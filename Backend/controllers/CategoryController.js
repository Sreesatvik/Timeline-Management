import Category from '../models/category.js';
import Assignment from '../models/assignment.js';

export class categoryController {

  async getallcategories(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createCategory(req, res) {
    try {
      const { title, description = "" } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Category title is required" });
      }

      const category = await Category.create({ title, description });
      return res.status(201).json(category);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Category ID is required" });
      }
      await Assignment.deleteMany({ category_id: id });
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      return res.status(200).json({
        message: "Category and related assignments deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const updated = await Category.findByIdAndUpdate(
                id,
                { title, description, modifiedAt: new Date() },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ error: "Category not found" });
            }

            res.status(200).json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
