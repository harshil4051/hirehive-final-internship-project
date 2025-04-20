import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendingMail } from "../utils/MailUtil.js"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET; 

// Register User

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form !"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered !"));
  }
  const user = await User.create({ name, email, phone, password, role });
  sendToken(user, 201, res, "User Registered Sucessfully !");
});

// Login User

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role!"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  // Block login if user is inactive
  if (user.status === "inactive") {
    return next(new ErrorHandler("Your account has been deactivated. Please contact support.", 403));
  }

  //  login notification email
  try {
    await sendingMail(
      user.email,
      "Login Successful",
      `Hello ${user.name},\n\nYou have successfully logged into your account.\n\nIf this wasn't you, please contact support immediately.\n\nBest regards,\nHireHive Team`
    );
  } catch (mailError) {
    console.error("Email send failed:", mailError.message);
  }

  
  sendToken(user, 201, res, "User Logged In Successfully!");
});


// Logout User

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully !",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// FORGOT PASSWORD
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email }); 

    if (!foundUser) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const token = jwt.sign({ _id: foundUser._id }, secret, { expiresIn: "1h" });

    const resetUrl = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `
      <html>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      </html>`;

    await sendingMail(foundUser.email, "Password Reset Request", mailContent);

    return res.status(200).json({ message: "Reset password link sent to your email." });
  } catch (error) {
    return res.status(500).json({ message: "Error processing request.", error: error.message });
  }
};

// RESET PASSWORD
export const resetpassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, secret);
    if (!decoded._id) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded._id, { password: hashedPassword }); 

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error updating password.", error: error.message });
  }
};
