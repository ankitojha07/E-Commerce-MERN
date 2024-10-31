import { Request, Response, NextFunction } from "express";
import User, { Iuser } from "../models/userModel";

interface ProfileRequest extends Request {
  user?: Iuser;
  email?: Iuser;
}

export const fetchUserProfile = async (req: ProfileRequest, res: Response) => {
  console.log("started");

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { id, email } = req.user;

    console.log("ye aya");

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("ye aya 2");

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching profile", next: "profile", error });
  }
};
