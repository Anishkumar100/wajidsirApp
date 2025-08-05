// controllers/categoryController.js

import categoryModel from "../models/categoryModel.js";

// ✅ Create Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required." });
    }

    const trimmedName = name.trim();
    const existing = await categoryModel.findOne({ name: new RegExp(`^${trimmedName}$`, 'i') });

    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists." });
    }

    const category = new categoryModel({ name: trimmedName });
    await category.save();

    return res.status(201).json({ success: true, message: "Category added.", category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "New category name is required." });
    }

    const trimmedName = name.trim();

    const existing = await categoryModel.findOne({ name: new RegExp(`^${trimmedName}$`, 'i') });
    if (existing && existing._id.toString() !== id) {
      return res.status(409).json({ success: false, message: "Another category with this name already exists." });
    }

    const category = await categoryModel.findByIdAndUpdate(id, { name: trimmedName }, { new: true });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    return res.status(200).json({ success: true, message: "Category updated.", category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    return res.status(200).json({ success: true, message: "Category deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
