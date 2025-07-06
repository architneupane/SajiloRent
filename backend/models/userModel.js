var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phoneNo: Number,
  password: String,
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user", 
  },
});

module.exports = mongoose.model("user", userSchema);
