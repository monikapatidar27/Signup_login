const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express();

const dbConnection = require("./database/dbConnection.js");
const userRoutes = require("./src/routes/userRoutes.js");
const productRoutes = require("./src/routes/productRoutes.js");
const orderRoutes = require("./src/routes/orderRoutes.js");
const categoryRoutes = require("./src/routes/categoryRoutes.js")
const googleAuth = require("./src/controllers/googleAuth.js")
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnection();

// swagger connection
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/home', (req, res) => {
  res.send('Welcome to the server!');
});

app.use("/api/v1/user", userRoutes);
app.use("/", googleAuth);
app.use("/api/v1/category" , categoryRoutes);
app.use("/api/v1/product" , productRoutes);
app.use("/api/v1/order", orderRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});