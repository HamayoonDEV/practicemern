import Joi from "joi";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import userDTO from "../DTO/userDTO.js";
const passwordPattren =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
const authController = {
  async register(req, res, next) {
    //1.validate the user input using joi module
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattren).required(),
      confirmpassword: Joi.ref("password"),
    });
    //validating data
    const { error } = userRegisterSchema.validate(req.body);
    //if error occurs handling it using middleware

    if (error) {
      return next(error);
    }
    //verifing email and username is already used?
    const { username, name, email, password } = req.body;
    let user;
    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "email is already in use please use another!",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "username is not available please  choose another!!!",
        };
        return next(error);
      }
      //password hashing
      const hashedPassword = await bcrypt.hash(password, 10);
      //store in database
      const userToRegister = new User({
        username,
        name,
        email,
        password: hashedPassword,
      });
      user = await userToRegister.save();
    } catch (error) {
      return next(error);
    }
    res.status(201).json(user);
  },

  //login method

  async login(req, res, next) {
    //validate data
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattren).required(),
    });

    //validate user data
    const { error } = userLoginSchema.validate(req.body);
    //handle error using middleware
    if (error) {
      return next(error);
    }
    //fetching username and password
    let user;
    const { username, password } = req.body;
    try {
      user = await User.findOne({ username });
      if (!user) {
        const error = {
          status: 401,
          message: "invalid username!",
        };
        return next(error);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = {
          status: 401,
          message: "invalid password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    //using DTO
    const userDto = new userDTO(user);
    res.status(200).json({ user: userDto });
  },
};

export default authController;
