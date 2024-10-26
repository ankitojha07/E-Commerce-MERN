import { Router, Request, Response } from "express";
import { fetchUserProfile } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

const profileRouter = Router();

profileRouter.get(
  "/userProfile",
  authMiddleware,
  (req: Request, res: Response) => {
    fetchUserProfile(req, res);
  }
);

export default profileRouter;
