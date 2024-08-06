const category = require("../controllers/category");
const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
const routes = require("express").Router();

routes.get("/cat", async (req, res) => {
    console.log("user");
    res.send("category working");
});


routes.get("/",category.getAllCategory);
routes.get("/:categoryId",category.getCategoryById);

routes.post("/add",verifyAccessToken,isAdminCheck,category.createCategory);
routes.delete("/delete/:categoryId" ,verifyAccessToken,isAdminCheck, category.deleteCategoryById);
routes.put("/update/:categoryId" , verifyAccessToken,isAdminCheck,category.updateCategoryById);

module.exports = routes;
