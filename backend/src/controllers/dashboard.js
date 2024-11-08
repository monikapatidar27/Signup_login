const express = require("express");
const Product = require("../models/Product"); // Adjust path as needed
const User = require("../models/User");       // Adjust path as needed
const Category = require("../models/Category"); // Adjust path as needed

const router = express.Router();

router.get("/stats", async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();

        return res.json({
            products: productCount,
            users: userCount,
            categories: categoryCount
        });
    } catch (error) {
        console.error("Error fetching counts:", error);
        return res.status(500).json({ message: "Error fetching counts" });
    }
});

module.exports = router;
