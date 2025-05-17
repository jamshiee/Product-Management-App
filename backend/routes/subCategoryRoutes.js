import express from "express";
import { createSubCategory, getAllSubCategories } from "../controller/subCategoryController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSubCategory);
router.get("/getall", authMiddleware, getAllSubCategories);

export default router;
