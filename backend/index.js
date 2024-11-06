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
const stripe = require("stripe")("sk_test_51O4fQJSAKAhNi8NACJpBDp5lrMeEHLP6N1XE8mc96TpOyjJefxyKK6YS1IA7aCb6TwD2T82rZV4FfDnlQjw1CoLp00wnNGOa1K");
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




app.post("/payment", async (req, res) => {
  const { amount, id } = req.body;

  try {
    // Create a PaymentIntent with the token ID sent from the frontend
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: "usd",
      payment_method: id, // Token ID from frontend (can be a PaymentMethod ID as well)
      confirm: true,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Payment failed:", error);
    res.json({ success: false, message: error.message });
  }
});




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});