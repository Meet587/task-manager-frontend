import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import NavHeader from "../components/Navbar";

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <NavHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
