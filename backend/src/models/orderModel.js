const mongoose = require("mongoose");
const userModel = require("./userModel")

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModel
    },
    orderStatus: {
        type: String,
        enum: ["Initiated", "Confirmed", "Shipped", "Completed", "Cancelled", "Exchanged"],
        default: "Initiated", 
    },
   

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "Order");