
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar'; 
import Navbar from '../..Components/Navbar/Navbar';

const AdminPanel = () => {
    return (
        <div >
           
            <Navbar /> 
            <Sidebar /> 
            <div >
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminPanel;