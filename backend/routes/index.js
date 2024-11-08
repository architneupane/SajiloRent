var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var docModel = require('../models/docModel')
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const secret = "secret";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// route for signup
router.post("/signup", async (req, res) => {
  let { username, name, email, phoneno, password } = req.body;
  let emailCon = await userModel.findOne({ email });
  let phonenoCon = await userModel.findOne({ phoneno });
  if (emailCon) {
    return res.json({ success: false, message: "Email already exist" });
  } else if (phonenoCon) {
    return res.json({ success: false, message: "Phone number already exists" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        let user = await userModel.create({
          username,
          name,
          email,
          phoneno,
          password: hash,
        });
        res.json({
          success: true,
          message: "User created successfully",
          userId: user._id,
        });
      });
    });
  }
});

// route for login page
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email: user.email, userId: user._id }, secret);
        res.json({
          success: true,
          message: "Login successful",
          userId: user._id,
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

// route to create new document
router.post('/createDocs', async (req,res)=>{
  let {userId, docName} = req.body
  let user = await userModel.findOne({_id: userId})
  if (user){
    let docs = await docModel.create({
      uploadedBy: userId,
      title: docName,
    })
    // route handler function
    return res.json({success: true, message:'Document created successfully ', docId:docs._id})
  }
  else{
    return res.json({success: false, message:'Invalid User'})
  }
})

// route to update content on document
router.post('/updateDoc', async(req,res)=>{
  let{userId,docId,content} = req.body
  let user = await userModel.findOne({_id:userId})
  // if user true then doc find by id and updates
  if(user){
    let doc = await docModel.findOneAndUpdate({docId},{content})
    console.log(docId);
    return res.json({success:true, message:'Document uploaded successfully'})
  }
  // if user false then user was not formed or invalid
  else{
    return res.json({success:false, message:'Invalid user'})
  }
})

// route to get new created document
router.post('/getDoc', async (req,res)=>{
  let{userId,docId} = req.body
  let user = await userModel.findOne({_id:userId})
  if(user){
    let doc = await docModel.findOne({_id:docId})
    if(doc){
      return res.json({sucess:true, message:'Document fetched successfully',doc:doc})
    }
    else{
      return res.json({success:false, message:'Invalid document'})
    }
  }
  else{
    return res.json({success:false, message:'Invalid user'})
  }
})

// route to get user
router.post('/getUser',async(req,res)=>{
  let{userId} = req.body
  let user = await userModel.findOne({_id:userId})
  if(user){
    return res.json({success:true,message:'User fetched successfully'})
  }
  else{
    return res.json({success:false, message:'Invalid user'})
  }
})

//route to get all documents created by that user
router.post('/getAllDocs', async(req,res)=>{
  let {userId} = req.body
  let user = await userModel.findOne({_id:userId})
  if(user){
    let docs = await docModel.find({uploadedBy:userId})
    return res.json({success:true, message:"Document fetched successfully",docs:docs})
  }
  else{
    return res.json({success:false, message:'Invalid user'})
  }
})

// route to delete document by user
router.post('/deleteDoc', async(req,res)=>{
  let{userId,docId} = req.body
  let user = await userModel.findOne({_id:userId})
  if(user){
    let doc = await docModel.findOneAndDelete({_id:docId})
    return res.json({success: true, message: 'Document deleted successfully'})
  }
  else{
   return res.json({success: false, message: 'Invalid user'})
  }
})

// route to logout user
router.post('/logout', async(req,res)=>{
  let{userId} = req.body
  let user = await userModel.findOne({_id:userId})
  if(user){
    return res.json({success:true , message:'User logged out successfully'})
  }
  else{
    return res.json({success:false, message: 'Invalid user'})
  }
})



module.exports = router;
