const dotenv=require('dotenv')
dotenv.config()
const {User} =require('../models/User.js')
const jwt=require('jsonwebtoken');
const secretKey =process.env.SECRET_KEY;
function generateToken(userDetails) {
  return jwt.sign(userDetails, secretKey);
}
const addUser=async (req, res) => {
    try {
      const user = await User.find({ emailID: req.body.emailID });
      if (user.length === 0) {
        const user = await User.create({
          emailID: req.body.emailID,
          password: req.body.password,
          user_name: req.body.user_name
        });
        const userDetails = {
          userName: user.user_name,
          emailID: user.emailID,
          userID: user._id.toString()
        };
        const accessToken = generateToken(userDetails);
        res.status(201).json({
          status: "success",
          message: "new user created",
          accessToken: accessToken,
          userDetails: userDetails
        });
      } else {
        res.status(403).json({
          status: "failure",
          message: "user user created"
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "failure",
        message: "user user created",
        error: error,
      });
    }
  }

  const validateUser=async (req, res) => {
    try {
      const user = await User.find({
        emailID: req.body.emailID,
        password: req.body.password,
      });
      if (user.length === 0) {
        res.status(401).json({
          status: "failure",
          message: "user does not exist",
        });
      } else {
        const userDetails = {
          userName: user[0].user_name,
          emailID: user[0].emailID,
          userID: user[0]._id.toString(),
        };
        const accessToken = generateToken(userDetails);
        res.status(200).json({
          status: "success",
          message: "user valid",
          accessToken: accessToken,
          userDetails: userDetails,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "authentication failed",
        error: error,
      });
    }
  }

  module.exports={addUser,validateUser}