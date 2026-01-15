import bcrypt from "bcryptjs"

import genToken from "../config/token.js";
import User from "../models/user.model.js";


export const signup = async (req, res) => {
  try {
    console.log(req.body); // 👈 DEBUG (must see data)

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userNameExist = await User.findOne({ userName });
    if (userNameExist) {
      return res.status(400).json({ message: "Username already taken" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
     maxAge: 7 * 24 * 60 * 60 * 1000
      sameSite: "None",
      secure: true,
     
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Signup server error",
      error: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist, please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
       sameSite: "None",
      secure: true,
   // ✅ localhost safe
     
    });

    // ✅ REMOVE PASSWORD BEFORE SENDING
    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json(userData);

  } catch (error) {
    return res.status(500).json({ message: "Login error", error });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false
    });

    return res.status(200).json({ message: "Logout successfully" });

  } catch (error) {
    return res.status(500).json({
      message: `Logout error: ${error.message}`
    });
  }
};
