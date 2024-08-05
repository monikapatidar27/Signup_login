const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    images: {
        type: Array,
        required: true,
    },
    options: [{
        size: String, 
        price: Number, 
        stock: Number 
    }],
    available: {
        type: Boolean,
    },
  
}, { timestamps: true })




module.exports = mongoose.model('Product', productSchema, 'Product');








