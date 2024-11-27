import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
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
