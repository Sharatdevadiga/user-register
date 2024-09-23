import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import {
  unhandledRoutes,
  globalErrorHandler,
} from "./controller/errorController.js";
import connectDB from "./util/connectDB.js";
const app = express();
app.use(bodyParser.json());

import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
await connectDB();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://userRegister-app-sandy.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api", userRoutes);

// Unhandled routes and errors
app.use("*", unhandledRoutes);
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
