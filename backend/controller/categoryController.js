import Category from "../models/categorySchema.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name: name.trim() , userId});
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name: name.trim() , userId });
    await category.save();

    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    console.error("Category creation failed:", error);
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};


export const getCategory = async (req, res) => {
  // try {
  //   const { name } = req.body;
    
  //   if(!category){
  //     res.json({ message: "Category not found" });
  //   }
  //   res.json(category);
  // } catch (error) {
  //   res.status(500).json({ message: "Error Fetching Category ", error });
  // }
};

export const getAllCategories = async (req, res) => {
  try {
    const userId = req.user._id;
    const categories = await Category.find({userId});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
