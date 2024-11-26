import React from "react";
import { Outlet } from "react-router-dom";
import NavHeader from "./Navbar";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
