const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["customer", "lp", "employee"],
      default: "lp",
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false, // Hide password by default when querying
    },
    contactNumber: { type: String },
    resetPasswordToken: String,
    resetPasswordDate: Date,
  },
  { timestamps: true }
);

// Encrypt password before saving a new user or updating password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});

// Generate JWT token for authentication
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match entered password with stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and store reset password token
UserSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordDate = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

// Define discriminator schemas for different roles (Sender, Supplier, Consignee)

// // Sender schema
// const SenderSchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   contactPerson: { type: String },
//   contactNumber: { type: String },
//   address: { type: String },
// });

// // Supplier schema
// const SupplierSchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   contactPerson: { type: String },
//   address: { type: String },
//   servicesProvided: { type: String },
// });

// // Consignee schema
// const ConsigneeSchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   contactPerson: { type: String },
//   contactNumber: { type: String },
//   address: { type: String },
//   assignedShipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cargo" }],
// });

// // Create discriminators based on the 'role' field
// User.discriminator("Sender", SenderSchema);
// User.discriminator("Supplier", SupplierSchema);
// User.discriminator("Consignee", ConsigneeSchema);

module.exports = User;
