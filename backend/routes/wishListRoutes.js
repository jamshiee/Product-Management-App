import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import {  getAllWishList, wishlistToggle } from "../controller/wishListController.js";

const router = express.Router();


router.post("/toggle", authMiddleware, wishlistToggle);
router.get("/getall",authMiddleware,getAllWishList)


export default router;
