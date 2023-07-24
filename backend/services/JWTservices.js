import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config";
import Refreshtoken from "../models/jwt.js";

class JWTServices {
  //sign Access Token
  signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: expiryTime });
  }
  //sign Refresh token
  signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: expiryTime });
  }
  //verify Access token
  verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN);
  }
  //verify Refresh token
  verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN);
  }
  //store refresh token
  async storeRefreshToken(token, userId) {
    try {
      const refreshToken = new Refreshtoken({
        token: token,
        userId: userId,
      });

      await refreshToken.save();
    } catch (error) {
      return console.log(error);
    }
  }
}

export default JWTServices;
