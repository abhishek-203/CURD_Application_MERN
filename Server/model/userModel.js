import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {     // Define the name field as a string and make it required
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  address: {    // Define the address field as an object with nested fields
    type: String,
    required: true,
  },
  phone: {     // Define the phone field as an object with nested fields
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema); // Export the User model based on the schema
