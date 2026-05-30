import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getFilteredProducts,
  getProductsByCollection,
<<<<<<< HEAD
  getNewArrivalProducts,
  getTrendingProducts
=======
  getNewArrivalProducts
>>>>>>> 8394040dcd8283a93687885ab699df1557a0468b
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
router.get("/all", getProducts);
router.get(
  "/new-arrivals",
  getNewArrivalProducts
);
<<<<<<< HEAD
router.get(
  "/trending",
  getTrendingProducts
);
=======
>>>>>>> 8394040dcd8283a93687885ab699df1557a0468b
router.get("/:id", getSingleProduct);

router.delete("/delete/:id", deleteProduct);
router.put(
  "/update/:id",
  upload.array("images", 8),
  updateProduct
);
router.get(
  "/filter/:productType/:category",
  getFilteredProducts
);
router.get(
  "/collection/:collection",
  getProductsByCollection
);

<<<<<<< HEAD

=======
>>>>>>> 8394040dcd8283a93687885ab699df1557a0468b
export default router;

