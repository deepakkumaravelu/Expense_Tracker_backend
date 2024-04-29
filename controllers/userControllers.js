const dotenv=require('dotenv')
const bcrypt = require('bcrypt');
dotenv.config()
const {User} =require('../models/User.js')
const jwt=require('jsonwebtoken');
const secretKey =process.env.SECRET_KEY;
const saltRounds = 10;

function generateToken(userDetails) {
  return jwt.sign(userDetails, secretKey);
}

const addUser = async (req, res) => {
  try {
    const user = await User.find({ emailID: req.body.emailID });
    if (user.length === 0) {
      bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: "failure",
            message: "Error hashing password",
            error: err
          });
        }
        
        try {
          const newUser = await User.create({
            emailID: req.body.emailID,
            password: hash, 
            user_name: req.body.userName
          });
          
          const userDetails = {
            userName: newUser.user_name,
            emailID: newUser.emailID,
            userID: newUser._id.toString()
          };

          const accessToken = generateToken(userDetails);

          return res.status(201).json({
            status: "success",
            message: "New user created",
            accessToken: accessToken,
            userDetails: userDetails
          });
          console.log("Completed creating user");
        } catch (error) {
          return res.status(500).json({
            status: "failure",
            message: "Error creating user",
            error: error
          });
        }
      });
    } else {
      return res.status(403).json({
        status: "failure",
        message: "User already exists"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Error finding user",
      error: error
    });
  }
}


  const validateUser = async (req, res) => {
    try {
      const user = await User.findOne({ emailID: req.body.emailID });
      if (!user) {
        return res.status(401).json({
          status: "failure",
          message: "User does not exist",
        });
      }
  
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: "error",
            message: "Authentication failed",
            error: err,
          });
        }
  
        if (!result) {
          return res.status(401).json({
            status: "failure",
            message: "Invalid password",
          });
        }
  
        const userDetails = {
          userName: user.user_name,
          emailID: user.emailID,
          userID: user._id.toString(),
        };
        const accessToken = generateToken(userDetails);
        return res.status(200).json({
          status: "success",
          message: "User valid",
          accessToken: accessToken,
          userDetails: userDetails,
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Authentication failed",
        error: error,
      });
    }
  }
  
  module.exports={addUser,validateUser}