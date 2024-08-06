const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { message } = require("./userValidationSchema");

const generateAccessToken = async(user) =>{
  const payload = {
    id : user._id,
    email: user.email
  };
  return jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: "24h" });
}

const generateRefreshToken = (user)=>{
    const payload = {
        id : user._id,
        email: user.email
    }

    const refreshToken = jwt.sign({...payload}, process.env.REFRESH_TOKEN_SECRETKEY);

    return refreshToken;
}

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers.authorization;
//   const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async function (err, user) {
      if (err) {
        return res.status(401).json({
          sucess: false,
          result: { message: "Access Token Not Valid" },
        });
      }
      const loggedInUser = await userModel.findById(user.id);
      req.user = loggedInUser;

      next();
    });
  } else {
    return res.status(401).json({
      sucess: false,
      result: { message: "Access Token is not set in request header" },
    });
  }
};

const isAdminCheck = (req,res,next) => {
    try {
        if(req?.user?.role == "Admin") {
            next();
        }
        else {
            return res.status(401).json({sucess:false,message:"You are not allowed to perform this operation."})
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({sucess:false,message:"Server error"});
    }
}
// const isAdminCheck = (req, res, next) => {
//     try {
//         if (req?.user?.role === "Admin") {
//             next();
//         }
//         else {
//             return res.status(401).json({
//                 success: false,
//                 message: "You are not allowed to perform this operation."
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })
//     }
// }


module.exports = {verifyAccessToken,generateRefreshToken,generateAccessToken,isAdminCheck};
