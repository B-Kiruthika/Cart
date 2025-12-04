import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("S"); // default size

  return (
    <div className="product_display">
      <div className="product_display-left">
        <div className="product_display_image-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="product_display_image">
          <img
            className="product_display_main-img"
            src={product.image}
            alt=""
          />
        </div>
      </div>

      <div className="product_display-right">
        <h1>{product.name}</h1>

        <div className="product_display_right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
        </div>

        <div className="product_display-right-prices">
          <div className="product_display-right-prices-old">
            Rs.{product.old_price}
          </div>
          <div className="product_display-right-prices-new">
            Rs.{product.new_price}
          </div>
        </div>

        <div className="product_display-right-description">
          Strong, lightweight, and ready for daily use. Made to be durable, comfortable, and practical for daily use.
        </div>

        <div className="product_display-right-size">
          <h1>Select Size</h1>
          <div className="product_display-right-size-list">
            {["S","M","L","XL","XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "size-selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => addToCart(product.id, selectedSize)}>
          ADD TO CART
        </button>

        <p className="product_display-right-category">
          <span>Category: </span> {product.category}, T-shirt, Crop Top
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
