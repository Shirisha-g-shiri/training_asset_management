import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/css/admin_module_style.css";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;