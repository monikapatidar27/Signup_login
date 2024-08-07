const product = require("../controllers/product");
const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
const routes = require("express").Router();

routes.get("/pro", async (req, res) => {
    console.log("user");
    res.send("product route is working");
});

routes.get("/" , product.getAllProduct);
routes.get("/:productId" , product.getProductById);
routes.get("/search/categoryName" , product.searchProductByCategoryName);

// Admin route
routes.post("/add",verifyAccessToken,isAdminCheck,product.createProduct);
routes.put("/update/:productId",verifyAccessToken,isAdminCheck , product.updateProductById);
routes.delete("/delete/:productId",verifyAccessToken,isAdminCheck,product.deleteProductById);
module.exports = routes;
