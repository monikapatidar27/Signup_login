const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const refreshTokenModel = require("../models/refreshTokenSchema");
const generateAccessToken = require("../helper/generateAccessToken");
const generateRefreshToken = require("../helper/generateRefreshToken");
const userValidationSchema = require("../helper/userValidationSchema");
const { isValidEmail, isValidMobileNumber } = require("../helper/vaild");

class UserController {
  constructor() {}

  async signup(req, res) {
    try {
      const { error, value } = userValidationSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { userName, firstName, lastName, email, password, mobile } = value;

      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email address" });
      }
      if (!isValidMobileNumber(mobile)) {
        return res
          .status(400)
          .json({ success: false, message: "Invaild mobile number." });
      }
      const existingUserEmail = await UserModel.findOne({ email });
      if (existingUserEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobile,
      });

      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User registered successfully.",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email address" });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "No such user found" });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Password does not match" });
      }

      const token = await generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      const resultRefreshToken = await refreshTokenModel.create({
        token: newRefreshToken,
      });
      return res.status(200).json({ resultRefreshToken, token, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }

  
  async userTokenRefresh(req, res) {
    const token = req.body.refreshToken;
    if (!token) {
      return res.status(401).json({
        success: "fail",
        result: { message: "Refresh token is required" }
      });
    }
    try {
      const storedToken = await refreshTokenModel.findOne({ token });
      if (!storedToken) {
        return res.status(403).json({
          success: "fail",
          result: { message: "Invalid refresh token" }
        });
      }

      jwt.verify(token, process.env.REFRESH_TOKEN_SECRETKEY, async (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: "fail",
            result: { message: "Invalid refresh token" }
          });
        }
        const user = await UserModel.findById(decoded.id);
        if (!user) {
          return res.status(404).json({
            success: "fail",
            result: { message: "User not found" }
          });
        }
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        await refreshTokenModel.deleteOne({ token });
        await refreshTokenModel.create({ token: newRefreshToken });
  
        return res.status(200).json({
          success: "ok",
          result: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          }
        });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: "fail",
        result: { message: "Unable to refresh the token at the moment." }
      });
    }
  }

  async logout(req,res) {
    // console.log(req.body.refreshToken);
    const token = req.body.refreshToken;
    if(!token) {
      // console.log("hello")
      return res.status(400).json({succcess:"fail" , result:{message:"Refresh token is required"}});
    }
    try {
      // console.log("hello1")
      await refreshTokenModel.deleteOne({token});
      // console.log("hello2")
      return res.status(200).json({
        success:"ok",result:{message:"Loggout out successfully"}
      })

    } catch (err) {
      console.log(err);
      return res.status(500).json({success:"fail" ,result:{message:"Unable to logout at that moment."}})
    }
  }

  
  
  
}

module.exports = new UserController();

