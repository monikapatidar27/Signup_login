const express = require('express');
const router = express.Router();
const category = require('../controllers/category');
const { verifyAccessToken, isAdminCheck } = require('../helper/utilies');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - material
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               material:
 *                 type: string
 *     responses:
 *       200:
 *         description: Create Category successfully
 *       301:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.post('/create',verifyAccessToken,isAdminCheck, category.createCategory);

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Server error
 */
router.get('/', category.getAllCategory);

/**
 * @swagger
 * /api/v1/category/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The catgory ID
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/:catgoryId', category.getCategoryById);

/**
 * @swagger
 * /api/v1/category/{categoryId}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category ID not found
 *       500:
 *         description: Server error
 */
router.delete('/:categoryId',verifyAccessToken,isAdminCheck, category.deleteCategoryById);

/**
 * @swagger
 * /api/v1/category/{categoryId}:
 *   put:
 *     summary: Update category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - material
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               material:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update the category successfully
 *       304:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.put('/:categoryId',verifyAccessToken,isAdminCheck, category.updateCategoryById);

module.exports = router;



// const category = require("../controllers/category");
// const product = require("../controllers/product");
// const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
// const routes = require("express").Router();

// routes.get("/cat", async (req, res) => {
//     console.log("user");
//     res.send("category working");
// });


// routes.get("/",category.getAllCategory);
// routes.get("/:categoryId",category.getCategoryById);


// // admin routes
// routes.post("/add",verifyAccessToken,isAdminCheck,category.createCategory);
// routes.delete("/delete/:categoryId" ,verifyAccessToken,isAdminCheck, category.deleteCategoryById);
// routes.put("/update/:categoryId" , verifyAccessToken,isAdminCheck,category.updateCategoryById);

// module.exports = routes;
