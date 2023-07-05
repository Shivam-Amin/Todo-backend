import { User } from "../models/user.js";
import bcrypt from'bcrypt';
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "../middleware/err.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    // Here we need to add +password to get access to password property,
    // As it is defined as select to false means it is not accessible directly.

    if (!user) {
      return next(new ErrorHandler("Invalid email or password!", 404));
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password!", 404));
    }
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
}

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {expires: 
      new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: "Logout Successfully!",
  })
}

export const myProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    let user = await User.findOne({ email });
  
    if (user) {
      return next(new ErrorHandler("User already exist...", 404));
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword});
  
    sendCookie(user, res, "Registered Successfully!", 201);
  } catch (error) {
    next(error);
  }
}
