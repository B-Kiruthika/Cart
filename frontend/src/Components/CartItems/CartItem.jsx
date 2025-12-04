import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItem = () => {
  const { all_product, cartItems, removeFromCart,getTotalCartAmount} =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product
  .filter((e) => {
    // check any size of this product in cartItems
    return Object.keys(cartItems).some(k => k.startsWith(e.id + "_") && cartItems[k] > 0);
  })
  .map((e) => {
    // map through sizes
    return Object.keys(cartItems)
      .filter(k => k.startsWith(e.id + "_") && cartItems[k] > 0)
      .map((key) => {
        const size = key.split("_")[1];
        const quantity = cartItems[key];
        return (
          <div className="cartitems-format cartitems-format-main" key={key}>
            <img src={e.image} alt="" className="carticon-product-icon" />
            <p>{e.name} ({size})</p>
            <p>Rs.{e.new_price}</p>
            <button className="cartitems-quantity">{quantity}</button>
            <p>Rs.{e.new_price * quantity}</p>
            <img
              className="cartitems-remove-icon"
              src={remove_icon}
             onClick={() => removeFromCart(`${e.id}_${size}`)}

              alt=""
            />
          </div>
        );
      });
  })}

      <div className="cart_items-down">
        <div className="cart_items-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart_items-total_items">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_items-total_items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart_items-total_items">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
