import cors from "cors";
import dotenv from "dotenv";
import express, { type Application } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import "./cron/attendanceCron.js"
import "./cron/markAbsent.js"
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", userRoutes);
app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.error(err));

app.listen(3000, () => { console.log("Server running on port 3000"); });
