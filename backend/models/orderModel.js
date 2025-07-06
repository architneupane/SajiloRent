const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  deliveryAddress: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending", 
  },
});

module.exports = mongoose.model("order", orderSchema);