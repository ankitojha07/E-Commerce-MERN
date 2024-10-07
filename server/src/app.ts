import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/router";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies (only if needed)
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/auth", authRoute);

export default app;
