import express from "express";

import { createUser, getAllUsers, getUserById, updateUserById } from "../controller/userController.js";

const router = express.Router();

// Route to create a new user
router.post("/create", createUser);

// Route to get all users
router.get("/users", getAllUsers);

// Route to get a user by ID
router.get("/user/:id", getUserById); // This should be replaced with a specific controller function if needed
// Route to update a user by ID
router.put("/user/:id", updateUserById); // This should be replaced with a specific controller function if needed

// Export the router to be used in the main application
export default router;
