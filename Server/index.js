import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js"; // Import user routes
import cors from "cors"; // Import CORS middleware for handling cross-origin requests

const app = express(); // Create an Express application
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors()) // Middleware to enable CORS (Cross-Origin Resource Sharing)
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 7000; // Set the port from environment variables or default to 7000
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string from environment variables

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB"); // Log success message on successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Log server start message
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error)); // Log error if connection fails

// Use user routes for handling user-related requests
app.use("/api", userRoutes);
