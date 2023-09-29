import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Pages/HomePage.tsx";
import LoginPage from "./components/Pages/LoginPage.tsx";
import RegisterPage from "./components/Pages/RegisterPage.tsx";
import CreatePage from "./components/Pages/CreatePage.tsx";
import PostPage from "./components/Pages/PostPage.tsx";
import EditPage from "./components/Pages/EditPage.tsx";

//Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
