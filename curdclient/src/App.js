import AddUser from "./addUser/AddUser";
import "./App.css";
import User from "./getUser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./updateUser/UpdateUser";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/adduser",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    },
  ]);

  return (
    <div className="App">
      <h1 className="text-center">User Management System</h1>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
