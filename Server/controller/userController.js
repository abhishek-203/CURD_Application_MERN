import User from "../model/userModel.js";

// Function to get all users
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body); // Create a new user instance from the request body
    const { email } = newUser;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "User already exists" }); // Respond with an error if the user already exists
    }
    // Save the new user to the database
    const savedUser = await newUser.save(); // Save the user document to the database
    // res.status(200).json(savedUser); // Respond with the saved user data
    res.status(200).json({message : "User created Successfully"}); // Respond with the saved user data
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error("Error creating user:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

// Function to get all users

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find(); // Fetch all users from the database
    if (!userData || userData.length === 0) {
      return res.status(404).json({ errorMessage: "No users data found" }); // Respond with an error if no users are found
    }
    res.status(200).json(userData); // Respond with the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

// Function to get a user by ID

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const userExist = await User.findById(userId); // Check if the user exists in the database
    if (!userExist) {
      return res.status(404).json({ errorMessage: "User not found" }); // Respond with an error if the user does not exist
    }
    res.status(200).json(userExist); // Respond with the user data if found
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

// Function to update a user by ID

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const updatedData = await User.findById(id); // Find the user by ID
    if (!updatedData) {
      return res.status(404).json({ errorMessage: "User not found" }); // Respond with an error if the user does not exist
    }
    await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    // Update the user with the new data from the request body
    res.status(200).json(updatedData); // Respond with the updated user data
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

//  Function to delete a user by ID

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const userExist = await User.findById(userId); // Check if the user exists in the database
    if (!userExist) {
      return res.status(404).json({ errorMessage: "User not found" }); // Respond with an error if the user does not exist
    }
    await User.findByIdAndDelete(userId); // Delete the user by ID
    res.status(200).json({ message: "User deleted successfully" }); // Respond with a success message
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};
