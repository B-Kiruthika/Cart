import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_cart.svg' 
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* FIXED: Added /admin/ prefix */}
      <Link to={'/admin/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt=''/>
          <p>Add Product</p>
        </div>
      </Link>
      
      <Link to={'/admin/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt=''/>
          <p>List Product</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
