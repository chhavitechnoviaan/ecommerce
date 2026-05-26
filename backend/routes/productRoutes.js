import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
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

router.get("/all", getProducts);

router.delete("/:id", deleteProduct);
router.put(
  "/update/:id",
  upload.array("images", 8),
  updateProduct
);

export default router;

