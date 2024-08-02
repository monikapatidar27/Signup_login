const jwt = require("jsonwebtoken");

const generateRefreshToken = (user)=>{
    const payload = {
        id : user._id,
        email: user.email
    }

    const refreshToken = jwt.sign({...payload}, process.env.REFRESH_TOKEN_SECRETKEY);

    return refreshToken;
}

module.exports = generateRefreshToken;