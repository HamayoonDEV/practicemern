import Joi from "joi";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import UserDTO from "../DTO/userDTO.js";
const passwordPattren =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
const authController = {
  async register(req, res, next) {
    //validate user input

    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattren).required(),
      confirmpassword: Joi.ref("password"),
    });
    //validate the schema
    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { username, name, email, password } = req.body;
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    //verifiying email and username already exsists
    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "email already taken please use anOther email!!",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "userName is not available please choose anOther username!!",
        };
        return next(error);
      }
    } catch (error) {
      next(error);
    }
    //store in database
    let user;
    try {
      const userToRegister = new User({
        username,
        name,
        email,
        password: hashedPassword,
      });
      user = await userToRegister.save();
    } catch (error) {
      next(error);
    }
    //setting the data object transfer
    const userDto = new UserDTO(user);
    res.status(201).json({ user: userDto });
  },

  //login router

  async login(req, res, next) {
    //validate user input

    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattren).required(),
    });
    //validate the userLoginSchema
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    //checking if the username is registerd or not
    const { username, password } = req.body;
    let user;
    try {
      user = await User.findOne({ username });
      if (!user) {
        const error = {
          status: 401,
          messge: "invalid username!!",
        };
        return next(error);
      }
      //matching password

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
    //setting data object tranfer
    const userDto = new UserDTO(user);
    res.status(200).json({ user: userDto });
  },
};

export default authController;
