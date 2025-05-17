import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import {  createProduct, getAllProducts, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/create", authMiddleware, createProduct);
// router.get("/get",getCategory)
router.get("/getall", authMiddleware, getAllProducts);
router.put("/update/:id", authMiddleware, updateProduct);

export default router;
