const router = require("express").Router();

const Cargo = require("../models/Cargo");
const {
  getAllCargo,
  createCargo,
  getSingleCargo,
  updateCargo,
  customerDashboardAnalysis,
} = require("../controllers/cargo.controller");

// middlewares
const filterResults = require("../middleware/filter");
const { protect, authorization } = require("../middleware/auth");

router.post("/", protect, createCargo);
router.get(
  "/all",
  protect,
  filterResults(Cargo, "owner supplier"),
  getAllCargo
);
router.route("/:id").get(protect, getSingleCargo).put(protect, updateCargo);
router.route("/customer/:id/analysis").get(protect, customerDashboardAnalysis);
// router.route("/supplier/:id/analysis").get(protect, customerDashboardAnalysis);
// router.route("/employee/analysis").get(protect, customerDashboardAnalysis);

module.exports = router;
