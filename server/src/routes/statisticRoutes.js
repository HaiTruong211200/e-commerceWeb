const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticController");
const authController = require("../controllers/authController");

router.use(authController.protect, authController.restrictTo("admin"));
router.get("/revenue", statisticsController.getRevenueStats);
router.get("/orders", statisticsController.getOrderStats);
router.get("/monthly", statisticsController.getMonthlyStats);

router.get("/best-sellers", statisticsController.getBestSellers);

router.get("/most-stock", statisticsController.getMostStock);

router.get("/most-returned", statisticsController.getMostReturned);

module.exports = router;
