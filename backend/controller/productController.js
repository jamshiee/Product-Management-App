import Product from "../models/productSchema.js";

export const createProduct = async (req, res) => {
    const { title, description, images, subcategory, variants } = req.body;


    try {
        if (!title || !description || !images || !subcategory || !variants) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = req.user._id;

        const product = await Product.create({ title, description, images, subcategory, variants, userId });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, subcategory, variants } = req.body;

    try {

        if (!title || !description || !subcategory || !variants) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = req.user._id;


        const product = await Product.findByIdAndUpdate(id, { title, description, subcategory, variants, userId }, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




export const getAllProducts = async (req, res) => {
    const userId = req.user._id;
    console.log("userId: ",userId);
    const products = await Product.find({userId: userId});
    res.status(200).json(products);
}



