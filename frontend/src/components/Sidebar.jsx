import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-yellow-400">Dashboard Home</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/edit" className="hover:text-yellow-400">Edit Content</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/users" className="hover:text-yellow-400">User Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
