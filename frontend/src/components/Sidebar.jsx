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
      className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-gray-900 text-gray-100 flex flex-col p-6 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-10 text-gray-50">Admin Dashboard</h2>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200
                ${location.pathname === link.path
                  ? "bg-yellow-500 text-gray-900 font-medium"
                  : "hover:bg-gray-700 hover:text-yellow-400"
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Company Name
      </div>
    </div>
  );
};

export default Sidebar;
