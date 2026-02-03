import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-6 pt-6 md:pt-16 ml-0 md:ml-64 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
