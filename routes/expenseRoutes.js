const express = require("express");
const dotenv=require('dotenv')
dotenv.config();
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenseController');

const jwt = require("jsonwebtoken");
const secretKey =process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken) {
      jwt.verify(accessToken, secretKey, (error, userDetails) => {
        if (error) {
          res.status(403).json({
            status: "forbidden",
            message: "access denied",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        status: "failure",
        message: "access denied",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      error: error,
    });
  }
}
// function authenticateToken(req,res,next){
//   next()
// }

router.post("/new/:userID", authenticateToken, addExpense);

router.get("/all/:userID", authenticateToken, getExpenses);

router.delete("/delete/:id", authenticateToken, deleteExpense);

router.patch("/update/:id", authenticateToken, updateExpense);

module.exports = router;
