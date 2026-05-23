import express from "express";

import {

  createProduct,

  getUserProducts,

  updateProduct,

  deleteProduct,

} from "../controllers/productController.js";

const router =
  express.Router();


// CREATE PRODUCT
router.post(
  "/",
  createProduct
);


// GET USER PRODUCTS
router.get(
  "/user/:userId",
  getUserProducts
);


// UPDATE PRODUCT
router.put(
  "/:id",
  updateProduct
);


// DELETE PRODUCT
router.delete(
  "/:id",
  deleteProduct
);

export default router;