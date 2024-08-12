const order = require("../controllers/order");
const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
const routes = require("express").Router();

routes.get("/ord", async (req, res) => {
    // console.log("order");
    res.send("order route is working");
});

routes.get("/" , order.getAllOrder);
routes.get("/:orderId" , order.getOrderById);
routes.post("/add",verifyAccessToken,order.createOrder);
routes.put("/update/:orderId",verifyAccessToken,isAdminCheck , order.updateOrderById);
routes.delete("/delete/:orderId",verifyAccessToken,order.deleteOrderById);
module.exports = routes;
