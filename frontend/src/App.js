import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Form } from "./Form";
import { UpdateForm } from "./UpdateForm";
import { Login } from "./login";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      error : <p>error</p>
    },
    {
      path: "/form",
      element: <Form />,
      error : <p>error</p>
    },
    {
      path: "/update",
      element: <UpdateForm />,
      error : <p>error</p>
    },
    {
      path: "/login",
      element: <Login />,
      error : <p>error</p>
    },
    {
      path: "/*",
      element: <p>wildcart route</p>,
      error : <p>error</p>
    },
  ]);
  return (
    <>
      <h1 className="welcome">Welcome To Task Management App</h1>

      <RouterProvider router={router} />
    </>
  );
};
