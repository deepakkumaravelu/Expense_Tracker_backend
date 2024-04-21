const express=require('express')
const {addUser,validateUser}=require('../controllers/userControllers.js')
const router=express.Router()


router.post("/new",addUser );
router.post("/login",validateUser );
  module.exports=router