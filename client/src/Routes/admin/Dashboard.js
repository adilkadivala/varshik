import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../Pages/admin/pages/AdminDashboard";
import '../../Assets/Css/admin/style.css'

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route exact path="/admin" element={<>
        <AdminDashboard />

        </>}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
