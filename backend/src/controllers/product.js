
const { message, messages } = require("../helper/userValidationSchema");
const productModel = require("../models/productModel");


class ProductController {
    constructor() {}


    async createProduct(req, res) {
        try {
            const { name,description, categoryId, images,options,available } = req.body;


        if (name == "" || categoryId === "" ) {
            return res.status(301).json({
                success: false,
                message: "All fields are required"
            })
        }

        const createdProduct = await productModel.create({
            name,
            description,
            categoryId,
            images,
            options,
            available
        });
        console.log(createdProduct);
        return res.status(200).json({success:true,message:"Add Product successfully."})
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"})
        }
    }
    

    async getAllProduct (req,res) {
        try {
            const allProduct = await productModel.find().populate({ path: "categoryId", select: ["name"] })
            console.log(allProduct);
            return res.status(200).json({success:true,allProduct})
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"});
        }
    }

    async getProductById (req,res) {
        try {
            const productId = req.params.productId;
            const requiredProduct = await productModel.findById(productId).populate({
                path:"categoryId" ,
                select:["name"]
            });
            if(!requiredProduct) {
                return res.status(304).json({success:false,message:"Product not found"})
            }
            // console.log(requiredProduct);
            return res.status(200).json({success:true,message:requiredProduct})

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false ,message:"Server error" })
        }
    }

    async updateProductById (req,res) {
        try {
            const productId = req.params.productId;
            const { name,description, categoryId, images,options,available } = req.body;
            if (name == "" || categoryId === "" ) {
                return res.status(301).json({
                    success: false,
                    message: "All fields are required"
                })
            }
            const updateProductDetails = await productModel.findByIdAndUpdate(productId,{
                name,
                description, 
                categoryId, 
                images,
                options,
                available
            });
            console.log(updateProductDetails);
            return res.status(200).json({success:true,messages:"Product details are updated successfully"})

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:"false" ,message:"Server error"});
        }
    }

    async deleteProductById (req,res) {
        try {
            const productId = req.params.productId;
            if(!productId) {
                return res.status(304).josn({success:false,message:"Product Id is required"});
            }
            const requiredProduct = await productModel.findByIdAndDelete(productId);
            if(!requiredProduct) {
                return res.status(404).json({success:false,message:"Product not found"});
            }
            return res.status(200).json({success:true,message:"Product deleted successfully"})

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"})
        }
    }

    async searchProductByCategoryName (req,res) {
        try {
            const searchValue = req.query.categoryName;
            const requiredProduct = await productModel.find()
            .populate({
                path: 'categoryId',
                match: { 'name': { $regex: new RegExp(searchValue, 'i') } }
            })
            .exec();

            const filteredProduct = requiredProduct.filter(product => product.categoryId !== null);
            return res.status(200).json({success:true,message:filteredProduct});

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"})
        }
    }
}

module.exports = new ProductController();
