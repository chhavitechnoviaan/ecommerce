import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct
} from "../controllers/productController.js";
import {
  upload,
} from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 8),
  createProduct
);
// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);
router.get("/all", getProducts);

router.delete("/delete/:id", deleteProduct);
router.put(
  "/update/:id",
  upload.array("images", 8),
  updateProduct
);

export default router;

