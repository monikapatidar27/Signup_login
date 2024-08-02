// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const UserModel = require("../models/userModel");
// const refreshTokenModel = require("../models/refreshTokenSchema");
// const generateAccessToken = require("../helper/generateAccessToken");
// const generateRefreshToken = require("../helper/generateRefreshToken");





// router.get("/auth/google", (req, res) => {
//   // console.log(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
//   res.redirect(url);
// });

// router.get("/auth/google/callback", async (req, res) => {
//   const { code } = req.query;

//   try {
//     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       code,
//       redirect_uri: process.env.REDIRECT_URI,
//       grant_type: "authorization_code",
//     });

//     const { access_token, id_token } = data;

//     const { data: profile } = await axios.get(
//       "https://www.googleapis.com/oauth2/v1/userinfo",
//       {
//         headers: { Authorization: `Bearer ${access_token}` },
//       }
//     );
//     let user = await UserModel.findOne({ email: profile.email });
//     if (!user) {
//       user = new UserModel({
//         userName: profile.name,
//         firstName: profile.given_name,
//         lastName: profile.family_name,
//         email: profile.email,
//         password: "",
//         mobile: "",
//       });
//       await user.save();
//     }
//     console.log(user);
//     const token = await generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);
//     const resultRefreshToken = await refreshTokenModel.create({
//       token: newRefreshToken,
//     });
//     console.log(user, token, resultRefreshToken);
//     console.log(data);

//     res.redirect("/home");
//   } catch (err) {
//     console.error("Error:", err);
//     res.redirect("/login");
//   }
// });

// module.exports = router;
