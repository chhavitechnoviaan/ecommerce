import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import {
  createNotification,
} from "../services/notificationService.js";
// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files.map(
      (file) =>
        `http://localhost:5000/uploads/${file.filename}`
    );

    const product = new Product({
      ...req.body,

      tags: JSON.parse(req.body.tags || "[]"),

      variants: JSON.parse(
        req.body.variants || "[]"
      ),

      extraFields: JSON.parse(
        req.body.extraFields || "[]"
      ),

      images: imageUrls,
    });

    // if (
    //   updatedProduct.stockQty <= 5
    // ) {

    //   await createNotification({
    //     title: "Low Stock Alert",

    //     message: `${updatedProduct.product} stock is very low`,

    //     category: "Inventory",

    //     priority: "high",

    //     relatedId:
    //       updatedProduct._id,

    //     type: "LOW_STOCK",
    //   });
    // }

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {

      // old images delete
      product.images.forEach((img) => {
        const filename = img.split("/uploads/")[1];

        const filePath = path.join(
          "uploads",
          filename
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      imageUrls = req.files.map(
        (file) =>
          `http://localhost:5000/uploads/${file.filename}`
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tags: JSON.parse(req.body.tags || "[]"),
        variants: JSON.parse(req.body.variants || "[]"),
        extraFields: JSON.parse(req.body.extraFields || "[]"),
        images: imageUrls,
      },
      { new: true }
    );
    if (
      updatedProduct.stockQty <= 5
    ) {

      await createNotification({
        title: "Low Stock Alert",

        message: `${updatedProduct.product} stock is very low`,

        category: "Inventory",

        priority: "high",

        relatedId:
          updatedProduct._id,

        type: "LOW_STOCK",
      });
    }
    res.status(200).json({
      success: true,
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // delete images
    product.images.forEach((img) => {
      const filename = img.split("/uploads/")[1];

      const filePath = path.join(
        "uploads",
        filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};