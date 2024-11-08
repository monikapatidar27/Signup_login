const express = require("express")
const Product = require('../models/productModel');
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const router = express.Router();

router.get("/stats" , async(req,res) => {
    try{
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();

        return res.status(200).json({products:productCount,users:userCount,categories:categoryCount})
    }
    catch(err){
        return res.staatus(500).json({message:"Server Error"})
    }
})



module.exports = router;
