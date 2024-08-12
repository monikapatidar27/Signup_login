const mongoose = require("mongoose");
const userModel = require("./userModel");
const productModel = require("./productModel");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModel
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: productModel
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Completed"],
        default: "Pending", 
    },
   

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "Order");