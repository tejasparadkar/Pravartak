const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Cargo = require("../models/Cargo");

// @desc    Create cargo
// @route   POST api/v1/cargo
// @access  Private
exports.createCargo = asyncHandler(async (req, res, next) => {
  const cargo = await Cargo.create(req.body);
  return res.status(200).json({ success: true, data: cargo });
});

// @desc    Get all cargos
// @route   GET api/v1/cargo/all
// @access  Private
exports.getAllCargo = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.filterResults);
});

// @desc    Get single cargo
// @route   GET api/v1/cargo/:id
// @access  Private
exports.getSingleCargo = asyncHandler(async (req, res, next) => {
  const cargo = await Cargo.findById(req.params.id).populate("owner supplier");

  if (!cargo) {
    return next(
      new ErrorResponse(`Cargo with id ${req.params.id} is not found`, 404)
    );
  }

  return res.status(200).json({ success: true, data: cargo });
});

// @desc    Update cargo
// @route   PUT api/v1/cargo/:id
// @access  Private
exports.updateCargo = asyncHandler(async (req, res, next) => {
  let cargo = await Cargo.findById(req.params.id);

  if (!cargo) {
    return next(new ErrorResponse(`No cargo with id ${req.params.id}`, 404));
  }

  cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: cargo });
});

// @desc    Customer analysis
// @route   GET api/v1/cargo/customer/:id/analysis
// @access  Private
exports.customerDashboardAnalysis = asyncHandler(async (req, res, next) => {
  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const [{ totalTurnover }] = await Cargo.aggregate([
  //   {
  //     $match: { owner: new mongoose.Types.ObjectId(req.params.id) }, // Match documents with owner matching req.params.id
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       totalTurnover: { $sum: "$depositBudget" }, // Sum up depositBudget field for matched documents
  //     },
  //   },
  // ]);

  const totalTurnoverByMonth = await Cargo.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(req.params.id) }, // Match documents with owner matching req.params.id
    },
    {
      $project: {
        month: { $month: "$createdAt" }, // Extract the month from the createdAt date field
        depositBudget: 1, // Include the depositBudget field
      },
    },
    {
      $group: {
        _id: { month: "$month" }, // Group by month
        totalTurnover: { $sum: "$depositBudget" }, // Sum up depositBudget for each month
      },
    },
    {
      $sort: { "_id.month": 1 }, // Optionally sort by month in ascending order
    },
  ]);
  let totalSumTurnover = 0;
  totalTurnoverByMonth.forEach((monthData) => {
    totalSumTurnover += monthData.totalTurnover;
  });

  const statusCounts = await Cargo.aggregate([
    {
      $group: {
        _id: "$status", // Group by cargo status
        count: { $sum: 1 }, // Count documents for each status
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id field from results
        status: "$_id", // Rename _id field to status
        count: 1, // Include count field
      },
    },
  ]);

  // Calculate total count of all statuses
  const totalCount = statusCounts.reduce(
    (total, status) => total + status.count,
    0
  );

  // Calculate percentages for each status
  const statusPercentages = statusCounts.map((status) => ({
    status: status.status,
    percentage: ((status.count / totalCount) * 100).toFixed(2), // Calculate percentage rounded to 2 decimal places
  }));

  const bar = totalTurnoverByMonth.map((monthStat) => ({
    month: m[monthStat._id.month],
    turnover: monthStat.totalTurnover,
  }));
  const statsData = {
    totalTurnOver: totalSumTurnover,
    bar,
    statusPercentages,
  };

  res.status(200).json({
    success: true,
    data: {
      statsData,
    },
  });
});

// @desc    Supplier analysis
// @route   GET api/v1/cargo/customer/:id/analysis
// @access  Private
exports.supplierDashboardAnalysis = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: "Supplier Analysis" });
});

// @desc    Employee analysis
// @route   GET api/v1/cargo/employee/analysis
// @access  Private
exports.supplierDashboardAnalysis = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: "Employee Analysis" });
});

exports.approvedBySupplier = asyncHandler(async (req, res, next) => {
  const cargo = await Cargo.findById(req.params.id);
  cargo.isApprovedBySupplier = true;
  const updatedCargo = await cargo.save();
  res.status(200).json({ success: true, cargo: updatedCargo });
});

exports.approvedByCustomer = asyncHandler(async (req, res, next) => {
  const cargo = await Cargo.findById(req.params.id);
  cargo.isApprovedByOwner = true;
  cargo.status = "not delivered";
  const updatedCargo = await cargo.save();
  res.status(200).json({ success: true, cargo: updatedCargo });
});
