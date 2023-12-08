import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

const ADD_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
    });

    const response = await user.save();

    return res
      .status(201)
      .json({ message: "User was added", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something happened" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Bad email or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Bad email or password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something happened" });
  }
};

export { ADD_USER, LOGIN };
