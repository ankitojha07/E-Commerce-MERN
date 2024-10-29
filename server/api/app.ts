import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoute from "../routes/router";
import cartRouter from "../routes/cartRouter";
import profileRouter from "../routes/profileRouter";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    // origin: "https://e-commerce-ankit.vercel.app",
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies (only if needed)
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/auth", authRoute);
app.use("/product", cartRouter);
app.use("/profile", profileRouter);

export default app;
