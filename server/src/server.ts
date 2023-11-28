import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import credentials from "./middlewares/credentials";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/corsOptions";
import { connectDb } from "./config/dbConfig";
import adminRouter from "./routes/admin";

const PORT = process.env.PORT || 3500;
const app = express();

// Connect to MongoDB
connectDb();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/", adminRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
