import SubCategory from "../models/subCategorySchema.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }

    if (!categoryId) {
      return res.status(400).json({ message: "Category is required" });
    }

    const checkSubCategory = await SubCategory.findOne({ name: name , category: categoryId});

    if(checkSubCategory){
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    const subCategory = new SubCategory({
      name,
      category: categoryId
    });

    await subCategory.save();

    res.status(201).json({ message: "Subcategory created", subCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating sub-category", error });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category", "name");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};
