/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/immutability */
import React, { useState, createContext, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    ["S", "M", "L", "XL", "XXL"].forEach((size) => {
      cart[`${index}_${size}`] = 0;
    });
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ✅ BULLETPROOF: Sync cart on EVERY mount + token change
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const token = localStorage.getItem("auth-token");
    console.log("🔍 Checking token:", token ? "YES" : "NO");
    
    if (token) {
      try {
        console.log("📡 Fetching cart from backend...");
        const response = await fetch("http://localhost:3000/getcart", {
          method: "POST",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        });

        console.log("📡 Response status:", response.status);
        const data = await response.json();
        console.log("📦 Backend cart data:", data);

        if (response.ok && data) {
          setCartItems(data);
          console.log("✅ Cart LOADED from backend!");
        } else {
          console.log("❌ Backend returned empty cart");
          setCartItems(getDefaultCart());
        }
      } catch (error) {
        console.error("💥 Cart fetch ERROR:", error);
        setCartItems(getDefaultCart());
      }
    } else {
      console.log("🚫 No token - empty cart");
      setCartItems(getDefaultCart());
    }
  };

  const addToCart = async (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:3000/addtocart", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: key }),
      });
    }
  };

  const removeFromCart = async (key) => {
    setCartItems((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 0) - 1, 0),
    }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:3000/removefromcart", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: key }),
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const [id] = key.split("_");
        const itemInfo = all_product.find((product) => product.id === Number(id));
        if (itemInfo) totalAmount += itemInfo.new_price * cartItems[key];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) totalItems += cartItems[key];
    }
    return totalItems;
  };

  return (
    <ShopContext.Provider value={{
      all_product,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getTotalCartItems,
    }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
