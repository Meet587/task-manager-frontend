import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
// import Home from "../pages/Home";
// import About from "../pages/About";
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import NotFound from "../pages/NotFound";

// Components
// import Layout from "../components/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Register from "../pages/Register";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
