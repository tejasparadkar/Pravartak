const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// helper function
const sendToken = (user, statusCode, res) => {
  const token = user.generateAuthToken();
  const { _id, name, role } = user;

  const secure = process.env.NODE_ENV == "production" ? true : false;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user: { _id, name, role } });
};

// @desc    Register a user
// @route   POST api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  // const { name, email, password, role } = req.body;
  // let newUser;
  // switch (role) {
  //   case "sender":
  //     const Sender = mongoose.model("Sender");
  //     const {
  //       companyName: senderCompanyName,
  //       contactPerson: senderContactPerson,
  //       contactNumber: senderContactNumber,
  //       address: senderAddress,
  //     } = req.body;
  //     newUser = new Sender({
  //       name,
  //       email,
  //       password,
  //       role,
  //       companyName: senderCompanyName,
  //       contactPerson: senderContactPerson,
  //       contactNumber: senderContactNumber,
  //       address: senderAddress,
  //     });
  //     break;

  //   case "supplier":
  //     const Supplier = mongoose.model("Supplier");
  //     const {
  //       companyName: supplierCompanyName,
  //       contactPerson: supplierContactPerson,
  //       contactNumber: supplierContactNumber,
  //       address: supplierAddress,
  //       servicesProvided,
  //     } = req.body;
  //     newUser = new Supplier({
  //       name,
  //       email,
  //       password,
  //       role,
  //       companyName: supplierCompanyName,
  //       contactPerson: supplierContactPerson,
  //       contactNumber: supplierContactNumber,
  //       address: supplierAddress,
  //       servicesProvided,
  //     });
  //     break;

  //   case "consignee":
  //     const Consignee = mongoose.model("Consignee");
  //     const {
  //       companyName: consigneeCompanyName,
  //       contactPerson: consigneeContactPerson,
  //       contactNumber: consigneeContactNumber,
  //       address: consigneeAddress,
  //     } = req.body;
  //     newUser = new Consignee({
  //       name,
  //       email,
  //       password,
  //       role,
  //       companyName: consigneeCompanyName,
  //       contactPerson: consigneeContactPerson,
  //       contactNumber: consigneeContactNumber,
  //       address: consigneeAddress,
  //     });
  //     break;

  //   case "employee":
  //     newUser = new User({
  //       name,
  //       email,
  //       password,
  //       role,
  //     });
  //     break;

  //   default:
  //     return next(new ErrorResponse("Invalid role specified", 400));
  // }
  const user = await User.create(req.body);
  sendToken(user, 200, res);
});

// @desc    Login user
// @route   POST api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendToken(user, 200, res);
});

// @desc    Get user
// @route   POST api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse(`Please login to access this route`, 400));
  }
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Get Suppliers
// @route   GET api/v1/auth/suppliers
// @access  Private
exports.getSupplier = asyncHandler(async (req, res, next) => {
  const user = await User.find({ role: "lp" });
  res.status(200).json({ success: true, data: user });
});

// @desc    Logout user
// @route   GET api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});
