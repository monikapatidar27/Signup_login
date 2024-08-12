
const { message } = require("../helper/userValidationSchema");
const orderModel = require("../models/orderModel");


class OrderController {
    constructor() {}


    async createOrder(req, res) {
        try {
            const {userId,productId,orderStatus} = req.body;
            if(!userId || !productId ) {
                return res.status(301).json({success:false,message:"All fields are required"});
            }
            const createdOrder = await orderModel.create({
                userId,
                productId,
                orderStatus
            })
            console.log(createdOrder)
            return res.status(200).json({success:true,message:"Create order successfully"})
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server Error"})
        }
    }

    async getAllOrder(req,res) {
        try {
            const orders = await orderModel.find();
            return res.status(200).json({success:true,orders});

        } catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"})
        }
    }

    async getOrderById (req,res) {
        try {
            const orderId = req.params.orderId;

            if(!orderId) {
                return res.status(404).json({success:false, message:"Order Id is reqired."})
            }

            const requiredOrder = await categoryModel.findById(orderId);

            if(!requiredOrder) {
                return res.status(404).json({success:false,message:"Order not found"})
            }

            return res.status(200).json({success:true,requiredOrder});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:false,message:"Server error"});
        }
    }

    async deleteOrderById (req,res) {
        try {
            const orderId = req.params.orderId;
            if(!orderId) {
                return res.status(404).json({success:false,message:"Order Id is required"});
            }

            const requiredOrder = await orderModel.findById(orderId);
            if(requiredOrder) {
                const deleteRequiredOrder = await orderModel.findByIdAndDelete(orderId);
                console.log(deleteRequiredOrder);
                return res.status(200).json({success:true,message:"Order deleted successfully"})
            }
            else{
                return res.status(404).json({success:false,message:"Order Id is not found"})
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({success:true,message:"Server error"})
        }
    }

    async updateOrderById (req,res) {
        try {
            const orderId = req.params.orderId;
            const { userId,productId,orderStatus } = req.body;
            if(!userId || !productId || !orderStatus) {
                return res.status(304).json({sucess:false,message:"All fileds are required"});
            }
            const updateOrder = await orderModel.findByIdAndUpdate(orderId , {
                orderStatus
            });
            console.log(updateOrder);
            return res.status(200).json({success:true,message:"Update the order successfully"})

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({sucess:false,message:"Server error"});
        }
    }
}

module.exports = new OrderController();
