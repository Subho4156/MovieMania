import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailTrap/emails.js";
import { ENV_VARS } from "../config/envVars.js";
import crypto from 'crypto';

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters",
        });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    sendVerificationEmail(newUser.email, verificationToken);
    return res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function verifyEmail(req, res){
  const {code}= req.body;
  try {
    const user= await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    })
    if(!user){
      return res.status(400).json({success: false, message: "Invalid or expired verfication code"})
    }

    user.isVerified = true;
    user.verificationToken= undefined;
    user.verificationTokenExpiresAt= undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.username);
    return res.status(200).json({success: true, message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    console.log("error in verifyEmail", error);
    return res.status(500).json({success: false, message: "Server error"})
  }
}

export async function login(req, res) {
  try {
    const {email, password}= req.body;

    if(!email || !password){
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({success: false, message: "Invalid Credentials"});
    }
    const isPasswordCorrect= await bcryptjs.compare(password, user.password);

    if(!isPasswordCorrect){
      return res.status(400).json({success: false, message: "Invalid Credentials"});
    }

    generateTokenAndSetCookie(user._id, res);
    user.lastLogin = new Date();

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    })


  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({success: false, message: "Internal Server Error"});
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    return res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function forgotPassword(req, res){
  const {email}= req.body;
  try {
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken= crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt= Date.now()+ 1 * 60 * 60 * 1000; 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt= resetTokenExpiresAt;

    await user.save();
    await sendPasswordResetEmail(user.email, `${ENV_VARS.CLIENT_URL}/reset-password/${resetToken}`);
    return res.status(200).json({ success: true, message: "Password Reset link sent to your email" });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    return res.status(400).json({ success: false, message: error.message});
  }
}

export async function resetPassword(req,res){
  try {
    const {token}= req.params;
    const {password}= req.body;

    const user= await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()},
    });
    if(!user){
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword= await bcryptjs.hash(password,10);
    user.password= hashedPassword;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpiresAt= undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    return res.status(200).json({ success: true, message: "Password Reset successful" });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    return res.status(400).json({ success: false, message: error.message});
  }
}

export async function authCheck(req, res){
  try {
    res.status(200).json({success: true, user: req.user});
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}