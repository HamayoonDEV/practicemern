import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../config/index.js";
import RefreshToken from "../models/jwt.js";
class JWTService {
  //signAccess token
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: expiryTime });
  }
  //signRefresh token
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: expiryTime });
  }

  //verifyAccess token
  static verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN);
  }
  //verifyRefresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN);
  }
  //store Refresh token into database
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshToken({
        token: token,
        userId: userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default JWTService;
