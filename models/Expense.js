const mongoose = require('mongoose')

// Defining schema
const expenseDetailsSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String 
    },
    date: {
        type: String
    },
    userID:{
        type: String
    }
}, {versionKey: false})

// creating a model
const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema)

module.exports = {Expense}