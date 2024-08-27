const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - mobile
 *               - role
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               mobile:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/signup', user.signup);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post('/login', user.login);

/**
 * @swagger
 * /api/v1/user/refresh:
 *   post:
 *     summary: Refresh user token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Refresh token is required
 *       403:
 *         description: Invalid refresh token
 */
router.post('/refresh', user.userTokenRefresh);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       400:
 *         description: Refresh token is required
 *       500:
 *         description: Unable to logout at the moment
 */
router.post('/logout', user.logout);


/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server error
 */
router.get('/', user.getUser);

module.exports = router;


// const user = require("../controllers/user");

// const routes = require("express").Router();

// routes.get("/test", async (req, res) => {
//     console.log("user");
//     res.send("user working");
// });

// routes.post("/login", user.login);
// routes.post("/signup", user.signup);
// routes.post("/refresh" , user.userTokenRefresh);
// routes.post("/logout" , user.logout);

// module.exports = routes;
