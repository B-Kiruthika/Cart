import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Admin.css";
import Navbar from "../../Components/adminNavbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar"; 

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role'); 
    navigate('/login');
  };

  return (
    <div className="admin-panel">
      {/* NAVBAR + LOGOUT CONTAINER */}
      <div 
        style={{ 
        
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          justifyContent: 'space-between'
        }}
      >
        {/* Left - Navbar (logo aligned left inside) */}
        <Navbar />

        {/* Right - Logout Button */}
        <button 
          className="logout-button"
          onClick={handleLogout}
          style={{ 
            margin: '0',
            position: 'static',
            height: '58px'
          }}
        >
          Logout
        </button>
      </div>

      {/* SIDEBAR + MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
