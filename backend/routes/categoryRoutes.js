import express from "express";
import { createCategory, getAllCategories, getCategory } from "../controller/categoryController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createCategory);
router.get("/get",getCategory)
router.get("/getall", getAllCategories);

export default router;
