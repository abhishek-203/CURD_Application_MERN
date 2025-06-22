import React from "react";
import { useEffect, useState } from "react";
import "./user.css"; // importing CSS for styling
import axios from "axios"; // Importing axios for API calls
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div className="subHead">User Details</div>
      <div className="userTable">
        <div className="addUser">
          <Link to="/adduser" className="btn btn-primary" type="button">
            Add User <i className="fa-solid fa-user-plus"></i>
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td className="actionButtons">
                      <button type="button" className="btn btn-info">
                        {/* <i className="fa-solid fa-eye"></i> */}
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      |
                      <button type="button" className="btn btn-danger">
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
