const mongoose = require("mongoose");

const CargoSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickup: { type: String, required: true },
    delivery: { type: String, required: true },
    docsIPFS: { type: String },
    completedPayment: { type: Boolean, default: false },
    depositBudget: { type: Number },
    issuedAt: { type: Date, default: Date.now },
    cargoType: {
      type: String,
      enum: ["fragile", "non-fragile", "cold storage"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "not delivered"],
      default: "pending",
    },
    label: { type: String },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
    quantity: {
      type: Number,
      default: 1,
    },
    allow_stacking: Boolean,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    receiverWallet: String,
    isApprovedByOwner: {
      type: Boolean,
      default: false,
    },
    isApprovedBySupplier: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cargo", CargoSchema);
