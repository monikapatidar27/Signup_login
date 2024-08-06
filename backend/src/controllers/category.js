
const { message } = require("../helper/userValidationSchema");
const categoryModel = require("../models/categoryModel");


class CategoryController {
    constructor() {}

//   admin can add category
    async createCategory(req, res) {
        try {
            const {name , description , material} = req.body;
            if(!name || !description || !material) {
                return res.status(301).json({success:false,message:"All fields are required"});
            }
            const createdCategory = await categoryModel.create({
                name,
                description,
                material
            })
            // console.log(createdCategory)
            return res.status(200).json({success:true,message:"Create category successfully"})
        }
        catch(err) {
            // console.log(err);
            return res.status(500).json({success:false,message:"Server Error"})
        }
    }
// show all categories
    async getAllCategory(req,res) {
        try {
            const categories = await categoryModel.find();
            return res.status(200).json({success:true,categories});

        } catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"})
        }
    }
// show category details by id
    async getCategoryById (req,res) {
        try {
            const categoryId = req.params.categoryId;

            if(!categoryId) {
                return res.status(404).json({success:false, message:"Category Id is reqired."})
            }

            const requiredCategory = await categoryModel.findById(categoryId);

            if(!requiredCategory) {
                return res.status(404).json({success:false,message:"Category not found"})
            }

            return res.status(200).json({success:true,requiredCategory});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"});
        }
    }
// delete category by id
    async deleteCategoryById (req,res) {
        try {
            const categoryId = req.params.categoryId;
            if(!categoryId) {
                return res.status(404).json({success:false,message:"Category Id is required"});
            }

            const requiredCategory = await categoryModel.findById(categoryId);
            if(requiredCategory) {
                const deleteRequiredCategory = await categoryModel.findByIdAndDelete(categoryId);
                console.log(deleteRequiredCategory);
                return res.status(200).json({success:true,message:"Category deleted successfully"})
            }
            else{
                return res.status(404).json({success:false,message:"Category Id is not found"})
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:true,message:"Server error"})
        }
    }
// update category details  
    async updateCategoryById (req,res) {
        try {
            const categoryId = req.params.categoryId;
            const { name,description,material } = req.body;
            if(!name || !description || !material) {
                return res.status(304).json({sucess:false,message:"All fileds are required"});
            }
            const updateCategory = await categoryModel.findByIdAndUpdate(categoryId , {
                name,
                description,
                material
            });
            console.log(updateCategory);
            return res.status(200).json({success:true,message:"Update the category successfully"})

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({sucess:false,message:"Server error"});
        }
    }
}

module.exports = new CategoryController();