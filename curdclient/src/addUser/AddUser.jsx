import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addUser.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    // Initial user data structure
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(users); // State to hold user data
  const navigate = useNavigate(); // Hook to navigate programmatically

  const inputHandler = (e) => {
    const { name, value } = e.target; // Destructuring name and value from the event target
    setUser({ ...user, [name]: value }); // Updating the user state with the
  };

  const submitForm = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    await axios.post("http://localhost:8000/api/create", user) // Sending POST request to the server
    .then((response)=> {
        console.log("User added successfully", response.data);
        toast.success(response.data.message, {position: "top-right"}); // Displaying success message
        navigate("/"); // Navigating back to the home page after successful submission
    })
    .catch((error) => {
        console.error("There was an error adding the user!", error);
    });
  };

  return (
    <div className="container mt-5 p-50">
      <div className="card mt-5 shadow p-3 mb-5 rounded">
        <Link to="/" type="button" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h1 className="addUser text-center mt-5 bg-dark">Add User</h1>
        <form className="container mt-5" onSubmit={submitForm}>
          <div className="form-group mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={inputHandler}
              id="name"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="form-group mb-3">
            <label for="Email">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={inputHandler}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              onChange={inputHandler}
              id="phone"
              name="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="form-group mb-3">
            <label for="Address">Address Number</label>
            <input
              type="text"
              className="form-control"
              onChange={inputHandler}
              id="Address"
              name="address"
              placeholder="Address Number"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
