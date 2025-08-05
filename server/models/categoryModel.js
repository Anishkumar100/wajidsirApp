// models/categoryModel.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // prevents duplicate category names
    trim: true
  }
}, { timestamps: true });

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
