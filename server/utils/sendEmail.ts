import nodemailer from "nodemailer";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Email",
      text: `Your OTP code for cart-app is: ${otp}`,
    };
    // debugging
    // console.log("Sending email");
    // console.log(process.env.EMAIL_USER);
    // console.log(process.env.EMAIL_PASS);

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending OTP", error);
    return false;
  }
};
