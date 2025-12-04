import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'; 
import Footer from './Components/Footer/Footer'; 

// User Pages
import Shop from './Pages/Shop'; 
import ShopCategory from './Pages/ShopCategory'; 
import Product from './Pages/Product'; 
import Cart from './Pages/Cart'; 
import LoginSignup from './Pages/LoginSignup'; 

// Admin Pages
import Admin from './Pages/Admin/Admin'; 
import Addproduct from './Components/Addproduct/Addproduct'; 
import Listproduct from './Components/Listproduct/Listproduct'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Main Shop and User Routes (Wrapped with Navbar and Footer) */}
          <Route path="/" element={<NavbarWrapper />}>
            <Route index element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="mens" element={<ShopCategory category="men" />} />
            <Route path="womens" element={<ShopCategory category="women" />} />
            <Route path="product">
              <Route path=":productId" element={<Product />} />
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginSignup mode="login" />} />
          <Route path="/signup" element={<LoginSignup mode="signup" />} />

          {/* ADMIN PANEL - NESTED ROUTES */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="listproduct" replace />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="listproduct" element={<Listproduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Helper component for user pages
const NavbarWrapper = () => (
  <>
    <Navbar />
    <div className="main-content-wrapper" style={{ minHeight: '80vh' }}>
      <Outlet />
    </div>
    <Footer />
  </>
);

export default App;
