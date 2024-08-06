const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const dbConnection = require("./database/dbConnection.js");
const userRoutes = require("./src/routes/userRoutes.js");
const categoryRoutes = require("./src/routes/categoryRoutes.js")
const googleAuth = require("./src/controllers/googleAuth.js")
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnection();


app.get('/home', (req, res) => {
  res.send('Welcome to the server!');
});

app.use("/api/v1/user", userRoutes);
app.use("/", googleAuth);
app.use("/api/v1/category" , categoryRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});