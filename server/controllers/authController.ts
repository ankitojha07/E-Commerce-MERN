import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendOtpEmail } from "../utils/sendEmail";
import { generateOtp } from "../utils/generateOtp";
import User, { Iuser } from "../models/userModel";

// below is the code for registering the user with name, email, pass
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Can not create duplicate user!",
        next: "home",
      });
    }

    async function hashPassword(myPlaintextPassword: string) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(myPlaintextPassword, salt);
      return hash;
    }

    const { otp, otpExpiry } = generateOtp();
    const isOtpSent = await sendOtpEmail(email, otp);

    if (!isOtpSent) {
      console.log("1");

      return res.status(500).json({
        message: "Failed to send OTP. User not registered.",
      });
    }

    console.log("OTP sent successfully");

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      otp,
      otpExpiry,
    });

    await user.save();

    console.log("User saved to database:", user);
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      `${process.env.JWT_SECRET as string}`,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ message: "OTP sent to email.", token, next: "verify-otp" });
  } catch (error) {
    return res.status(400).json({ message: "Server error" });
  }
};

// verify email using otp
export const verifyEmailOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({
      otp,
    });
    if (!user) {
      return res.status(400).json({ message: "invalid or expired otp " });
    }
    if (!user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    const isOtpExpired =
      (user.otpExpiry ? user.otpExpiry.getTime() : 0) < Date.now();
    if (isOtpExpired) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    user.otp = "0";
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Otp verified successfuly", next: "home" });
  } catch (error) {
    console.error("Verification failed", error);
    res.status(400).json({ message: "Server error" });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = (await User.findOne({ email })) as Iuser;
    if (!user) {
      return res.status(400).json({
        message: "Email not found pls register yourself!",
        next: "signup",
      });
    }
    const { otp, otpExpiry } = generateOtp();

    const isOtpSent = sendOtpEmail(email, otp);

    if (!isOtpSent) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.save();

    return res.status(200).json("Resent OTP on your mail");
  } catch (error) {
    console.error("Error registering user", error);
    return res.status(400).json({ message: "Server error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = (await User.findOne({ email })) as Iuser;

    // check if user exist but he is not verified
    if (!user) {
      res.status(400).json({ message: "Email or Password is incorrect." });
    }

    // check if user exist but he is not verified
    if (!user.isVerified) {
      const { otp, otpExpiry } = generateOtp();
      const isOtpSent = sendOtpEmail(email, otp);
      if (!isOtpSent) {
        res.status(400).json("Something went wrong!");
      }
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.save();

      res.status(400).json({
        message: "Please verify your email first to login!",
        next: "verify-otp",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          `${process.env.JWT_SECRET}`,
          {
            expiresIn: "1h",
          }
        );
        res
          .status(200)
          .json({ message: "Logged In Successfully", token, next: "home" });
      } else {
        console.error(err);
        res.status(400).json({ message: "Username or Password is incorrect!" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "An error occured!" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const otpFromHeader = req.headers["x-otp"];

  try {
    const updateUser = (await User.findOne({ email })) as Iuser;
    if (!updateUser) {
      return res.status(404).json({
        message: "User not found! Please register yourself",
        next: "signup",
      });
    }

    if (updateUser.otp !== otpFromHeader || otpFromHeader == "0") {
      return res.status(401).json({
        message: "Please enter the correct OTP!",
        next: "reset-password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    updateUser.password = hash;
    await updateUser.save();
    return res.status(201).json({
      message: "Password updated successfully! Login to continue",
      next: "login",
    });
  } catch (error) {
    console.error(error); // Log the error
    return res
      .status(500)
      .json({ message: "An error occurred!", next: "reset-password" });
  }
};
