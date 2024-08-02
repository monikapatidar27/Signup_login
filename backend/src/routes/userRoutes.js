const user = require("../controllers/user");

const routes = require("express").Router();

routes.get("/test", async (req, res) => {
    console.log("user");
    res.send("user working");
});


routes.post("/login", user.login);
routes.post("/signup", user.signup);
routes.post("/refresh" , user.userTokenRefresh);
routes.post("/logout" , user.logout);

module.exports = routes;
