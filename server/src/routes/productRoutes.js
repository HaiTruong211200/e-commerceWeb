const express = require(`express`);

const productController = require(`../controllers/productController`);
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route(`/`)
  .get(
    // authController.protect,
    // authController.restrictTo("admin"),
    productController.getAllProducts
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.createProduct
  );

router
  .route(`/:id`)
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
