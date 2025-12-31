import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 pt-12 pl-12 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
