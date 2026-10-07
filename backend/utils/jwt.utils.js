const jsonwebtoken=require("jsonwebtoken")
// const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} =require("../config/jwt.config")
const generateAccessToken=function(userId){
    return jsonwebtoken.sign({userId:userId,},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m",})
}

// Generate Refresh Token
const generateRefreshToken = (userId) => {
    return jsonwebtoken.sign(
      {
        userId: userId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
  };

  module.exports={generateAccessToken,generateRefreshToken}