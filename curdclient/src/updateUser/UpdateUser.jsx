import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Importing axios for making HTTP requests
import toast from "react-hot-toast";

const UpdateUser = () => {
  const users = {
    // Initial user data structure
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(users); // State to hold user data
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { id } = useParams(); // Extracting the user ID from the URL parameters

  const inputHandler = (e) => {
    const { name, value } = e.target; // Destructuring name and value from the event target
    setUser({ ...user, [name]: value }); // Updating the user state with the
  };

  useEffect
  (() => {
    // Fetching user data when the component mounts
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setUser(response.data); // Setting the user state with the fetched data
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
        toast.error("Failed to fetch user data", { position: "top-right" }); // Displaying error message
      });
  },[id]); // Dependency array to re-run effect when id changes

  const submitForm = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    await axios
      .put(`http://localhost:8000/api/update/users/${id}`, user) // Sending PUT request to update the user
      .then((response) => {
        console.log("User updated successfully", response.data);
        toast.success(response.data.message, { position: "top-right" }); // Displaying success message
        navigate("/"); // Navigating back to the home page after successful submission
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
        toast.error("Failed to update user", { position: "top-right" });
      });
  };

  return (
    <div className="container mt-5 p-50">
      <div className="card mt-5 shadow p-3 mb-5 rounded">
        <Link to="/" type="button" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h1 className="addUser text-center mt-5 bg-dark">Update User</h1>
        <form className="container mt-5" onSubmit={submitForm}>
          <div className="form-group mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              value={user.name} // Binding the input value to user.name
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
              value={user.email} // Binding the input value to user.email
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
              value={user.phone} // Binding the input value to user.phone
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
              value={user.address} // Binding the input value to user.address
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

export default UpdateUser;
