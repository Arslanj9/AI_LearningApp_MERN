import React from "react";
import { Routes, Route } from "react-router-dom";

// Dashboard imports
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Home from "../pages/Dashboard/Home";
import EditContent from "../pages/Dashboard/EditContent";
import UserManagement from "../pages/Dashboard/UserManagement";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Dashboard routes */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="edit" element={<EditContent />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
