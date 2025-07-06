const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const itemModel = require("../models/itemModel"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel"); 
const vendorModel = require('../models/vendorModel');
const mongoose = require("mongoose");

const secret = "aekjfnkkcniuerc9832475"; 

// home route
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// route for user registration
router.post("/register", async (req, res) => {
  const { username, name, email, phoneNo, password, role } = req.body;

  try {
    const emailExists = await userModel.findOne({ email }) || await vendorModel.findOne({ email });
    const phoneNoExists = await userModel.findOne({ phoneNo }) || await vendorModel.findOne({ phoneNo });
    if (emailExists) {
      return res.json({ success: false, message: "Email already exists" });
    }
    if (phoneNoExists) {
      return res.json({ success: false, message: "Phone number already exists" });
    }
    if (phoneNo.length !== 10) {
      return res.json({ success: false, message: "Invalid phone number" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "user") {
      const user = await userModel.create({
        username,
        name,
        email,
        phoneNo,
        password: hashedPassword,
        role: "user",
      });
      return res.json({
        success: true,
        message: "User registered successfully",
        userId: user._id,
      });
    } else if (role === "vendor") {
      const vendor = await vendorModel.create({
        username,
        name,
        email,
        phoneNo,
        password: hashedPassword,
      });
      return res.json({
        success: true,
        message: "Vendor registered successfully",
        vendorId: vendor._id,
      });
    } else {
      return res.json({ success: false, message: "Invalid role selected" });
    }
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// route for user login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign(
          { email: user.email, userId: user._id, role: user.role },
          secret
        );
        res.json({
          success: true,
          message: "Login successful",
          userId: user._id,
          role: user.role,
          token,
        });
      } else {
        res.json({ success: false, message: "Invalid password" });
      }
    });
  } else {
    res.json({ success: false, message: "Invalid email" });
  }
});

// route to vendor login
router.post("/vendorlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await vendorModel.findOne({ email });
    if (!vendor) {
      return res.json({ success: false, message: "Invalid email" });
    }
    bcrypt.compare(password, vendor.password, async (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
      if (result) {
        const token = jwt.sign(
          { email: vendor.email, userId: vendor._id, role: "vendor" },
          secret
        );
        res.json({
          success: true,
          message: "Vendor login successful",
          userId: vendor._id,
          role: "vendor",
          token,
        });
      } else {
        res.json({ success: false, message: "Invalid password" });
      }
    });
  } catch (error) {
    console.error("Error in /vendorlogin route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// route to admin login
router.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body;

  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  try {
    if (username === adminUsername && password === adminPassword) {
      const adminUser = await userModel.findOneAndUpdate(
        { username: adminUsername },
        { role: 'admin' },
        { new: true, upsert: true } 
      );
      const token = jwt.sign(
        { username: adminUser.username, userId: adminUser._id, role: 'admin' },
        secret
      );
      res.json({
        success: true,
        message: 'Admin login successful',
        token,
        role: 'admin',
        userId: adminUser._id,
      });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error in /adminlogin route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// route to list items
router.post('/listing', async (req, res) => {
  let { itemName, itemDescription, itemPerDayPrice, itemImage, itemCategory } = req.body;

  if (!itemName || !itemDescription || !itemPerDayPrice || !itemImage || !itemCategory) {
    return res.json({ success: false, message: 'All fields are required' });
  }
  try {
    let item = await itemModel.create({
      itemName,
      itemDescription,
      itemPerDayPrice, 
      itemImage,
      itemCategory,
    });
    return res.json({ success: true, message: 'Item is listed successfully', itemId: item._id });
  } 
  catch (error) {
    console.error("Error in /listing route:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// route to approve items
router.post('/approveitem', async (req, res) => {
  let { itemId, isApproved } = req.body;
  try {
    let item = await itemModel.findByIdAndUpdate(itemId, { isApproved }, { new: true });
    if (!item) {
      return res.json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, message: 'Item approved successfully', item });
  } catch (error) {
    console.error("Error in /approveitem route:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// route to decline items
router.post('/declineitem', async (req, res) => {
  let { itemId } = req.body;

  try {
    let item = await itemModel.findByIdAndDelete(itemId);
    if (!item) {
      return res.json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, message: 'Item declined and deleted successfully' });
  } catch (error) {
    console.error("Error in /declineitem route:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// route to show all items
router.get('/allitems', async (req, res) => {
  try {
    const items = await itemModel.find({isApproved: true}); 
    res.json({ success: true, items });
  } catch (error) {
    console.error("Error in /allitems route:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// route to show all items for admin
router.get('/allitemsadmin', async(req,res) =>{
  try {
    const items = await itemModel.find({}); 
    const orders = await orderModel.find({ status: "pending" }).populate("itemId");
    res.json({ success: true, orders, items });
  } catch (error) {
    console.error("Error in /allitemsadmin route:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

// route to create order
router.post('/createorder', async (req, res) => {
  const { deliveryAddress, contactNo, email, itemId, days } = req.body;
  if (contactNo.length !== 10) {
    return res.json({ success: false, message: 'Invalid contact number' });
  }
  if (!days || days <= 0) {
    return res.json({ success: false, message: 'Invalid number of days' });
  }
  try {
    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.json({ success: false, message: 'Item not found' });
    }
    if (!item.isAvailable) {
      return res.json({ success: false, message: 'Item is already rented' });
    }
    const order = await orderModel.create({
      itemId,
      deliveryAddress,
      contactNo,
      email,
      days,
      status: "pending", 
    });
    res.json({ success: true, message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error in /createorder route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

// route to logout user
router.post('/logout', async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid or missing userId" });
  }
  try {
    if (role === "vendor") {
      const vendor = await vendorModel.findById(userId);
      if (!vendor) {
        return res.json({ success: false, message: 'Invalid vendor' });
      }
      return res.json({ success: true, message: 'Vendor logged out successfully' });
    } else if (role === "user") {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: 'Invalid user' });
      }
      return res.json({ success: true, message: 'User logged out successfully' });
    } else if (role === "admin") {
      if (!role === "admin") {
        return res.json({ success: false, message: 'Invalid admin' });
      }
      return res.json({ success: true, message: 'Admin logged out successfully' });
    }
  } catch (error) {
    console.error("Error in /logout route:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

// middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ success: false, message: "No token provided or invalid format" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ success: false, message: "Failed to authenticate token" });
    }
    console.log("Token verified, decoded payload:", decoded);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
}

// route to approve a rent request
router.post("/approve-rent", async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    await orderModel.findByIdAndUpdate(orderId, { status: "approved" });
    await itemModel.findByIdAndUpdate(order.itemId, { isAvailable: false });
    res.json({ success: true, message: "Rent approved successfully" });
  } catch (error) {
    console.error("Error in /approve-rent route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// route to decline a rent request
router.post("/decline-rent", async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    await itemModel.findByIdAndUpdate(order.itemId, { isAvailable: true });
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Rent declined successfully" });
  } catch (error) {
    console.error("Error in /decline-rent route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// route to show all orders
router.get("/allorders", async (req, res) => {
  try {
    const orders = await orderModel.find().populate("itemId");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in /allorders route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// route to show approved orders for user
router.get("/myorders", async (req, res) => {
  const  userId  = req.query.user;
  try {
    const orders = await orderModel
      .find({ userId, status: "approved" })
      .populate("itemId");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in /myorders route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
