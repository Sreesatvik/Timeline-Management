import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login/Login.jsx";
import Registration from "./pages/auth/Registration/Registration.jsx";
import Page1 from "./pages/dashboard/Dashboard.jsx";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;