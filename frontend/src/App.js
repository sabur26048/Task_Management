import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Form } from "./Form";
import { UpdateForm } from "./UpdateForm";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <Form />,
    },
    {
      path: "/update",
      element: <UpdateForm />,
    },
  ]);
  return (
    <>
      <h1 className="welcome">Welcome To Task Management App</h1>

      <RouterProvider router={router} />
    </>
  );
};
