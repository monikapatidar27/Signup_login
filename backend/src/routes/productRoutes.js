const product = require("../controllers/product");
const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
// const routes = require("express").Router();
const router = require("express").Router();



/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - categoryId
 *               - images
 *               - options
 *               - available
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category to which the product belongs
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs for the product
 *               options:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 description: Key-value pairs of options for the product
 *               available:
 *                 type: boolean
 *                 description: Whether the product is available for sale
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.post('/create', verifyAccessToken, product.createProduct);

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */
router.get('/', product.getAllProduct);

/**
 * @swagger
 * /api/v1/product/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:productId', product.getProductById);

/**
 * @swagger
 * /api/v1/product/{productId}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:productId', verifyAccessToken, isAdminCheck, product.deleteProductById);

/**
 * @swagger
 * /api/v1/product/{productId}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - categoryId
 *               - images
 *               - options
 *               - available
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category to which the product belongs
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs for the product
 *               options:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 description: Key-value pairs of options for the product
 *               available:
 *                 type: boolean
 *                 description: Whether the product is available for sale
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.put('/:productId', verifyAccessToken, isAdminCheck, product.updateProductById);

/**
 * @swagger
 * /api/v1/product/search:
 *   get:
 *     summary: Search products by category name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *         required: true
 *         description: The category name to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved the products
 *       500:
 *         description: Server error
 */
router.get("/search/categoryName" , product.searchProductByCategoryName);
module.exports = router;

// routes.get("/pro", async (req, res) => {
//     console.log("user");
//     res.send("product route is working");
// });

// routes.get("/" , product.getAllProduct);
// routes.get("/:productId" , product.getProductById);
// routes.get("/search/categoryName" , product.searchProductByCategoryName);

// // Admin route
// routes.post("/add",verifyAccessToken,isAdminCheck,product.createProduct);
// routes.put("/update/:productId",verifyAccessToken,isAdminCheck , product.updateProductById);
// routes.delete("/delete/:productId",verifyAccessToken,isAdminCheck,product.deleteProductById);
// module.exports = routes;
