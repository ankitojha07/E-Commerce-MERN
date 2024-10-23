export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // otp validy to 10 min
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  console.log("generating otp");

  return { otp, otpExpiry };
};
