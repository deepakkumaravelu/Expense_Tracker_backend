/**
 * git clone <link>
 *
 * git add .
 * git commit -m "message"
 * git push
 *
 * git config --global user.name '<github username>'
 * git config --global user.email <github emailID>
 */

/**
 * Functionalities of the application
 * End points
 * Express application
 * DB connection
 * Schema definition and creating a model
 */

/**
 * CRUD operations
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (patch)
 * deleting entries -> /delete-expense (delete)
 *
 * adding a new user
 * validating existing user
 *
 * monthly analysis
 */

/**
 * Database - Expense Tracker
 * Collections
 *      i) ExpenseDetails
 *          - amount (number)
 *          - category (string)
 *          - date (string)
 *      ii) UserDetails
 *          - username
 *          - emailID
 *          - password
 */

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");
const app=express();
const expenseRoutes=require('./routes/expenseRoutes.js')
const userRoutes=require('./routes/userRoutes.js')

dotenv.config();
app.use(bodyParser.json()); //middleware
app.use(cors()); //middleware


app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);

async function connectToDb() {
  try {
    await mongoose.connect(
      process.env.MONGO_CONNECT
    );
    console.log("DB connection established :)");

    const port = process.env.PORT||8000;
    app.listen(port, function () {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    console.log("Couldn't establish DB connection :(");
  }
}
connectToDb();


