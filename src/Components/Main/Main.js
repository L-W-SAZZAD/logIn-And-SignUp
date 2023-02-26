import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav1 from "../Nav1/Nav1";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  return (
    <div className="main">
      <Nav1 />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
