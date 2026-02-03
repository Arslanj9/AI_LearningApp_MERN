import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // to highlight active link

  const links = [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Edit Content", path: "/dashboard/edit" },
    { name: "User Management", path: "/dashboard/users" },
  ];

  return (
    <div
      className="md:fixed z-50 fixed md:left-0 md:w-64 md:h-[calc(100vh-64px)] w-full md:mt-0 bg-gray-900 text-gray-100 flex md:flex-col flex-row items-center md:items-start p-2 md:p-6 shadow-lg"
    >
      <h2 className="hidden md:block text-2xl font-semibold mb-10 text-gray-50">Admin Dashboard</h2>
      <div className="md:hidden text-lg font-semibold text-gray-50 px-3">Admin</div>

      <ul className="flex md:flex-col flex-row gap-3 md:gap-3 items-center md:items-start md:ml-0 ml-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`inline-block md:block px-3 md:px-4 py-2 rounded-lg transition-colors duration-200 text-center
                ${location.pathname === link.path
                  ? "bg-yellow-500 text-gray-900 font-medium"
                  : "hover:bg-gray-700 hover:text-yellow-400 text-gray-100"
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto md:mt-auto text-sm text-gray-400 hidden md:block">
        &copy; {new Date().getFullYear()} AI Learning Guide 
      </div>
    </div>
  );
};

export default Sidebar;
