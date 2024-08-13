const order = require("../controllers/order");
const {verifyAccessToken,isAdminCheck} = require("../helper/utilies")
// const routes = require("express").Router();
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - orderStatus
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Create Order successfully
 *       301:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.post('/create',verifyAccessToken, order.createOrder);

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *       500:
 *         description: Server error
 */
router.get('/', order.getAllOrder);

/**
 * @swagger
 * /api/v1/order/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/:orderId', order.getOrderById);

/**
 * @swagger
 * /api/v1/order/{orderId}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order ID not found
 *       500:
 *         description: Server error
 */
router.delete('/:orderId',verifyAccessToken,isAdminCheck, order.deleteOrderById);

/**
 * @swagger
 * /api/v1/order/{orderId}:
 *   put:
 *     summary: Update order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - orderStatus
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update the order successfully
 *       304:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.put('/:orderId',verifyAccessToken,isAdminCheck, order.updateOrderById);

module.exports = router;

// routes.get("/ord", async (req, res) => {
//     // console.log("order");
//     res.send("order route is working");
// });

// routes.get("/" , order.getAllOrder);
// routes.get("/:orderId" , order.getOrderById);
// routes.post("/add",verifyAccessToken,order.createOrder);
// routes.put("/update/:orderId",verifyAccessToken,isAdminCheck , order.updateOrderById);
// routes.delete("/delete/:orderId",verifyAccessToken,order.deleteOrderById);
// module.exports = routes;
