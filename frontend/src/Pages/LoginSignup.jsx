import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CSS/LoginSignup.css";

const LoginSignup = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Decide initial state from prop or URL
  const initialState =
    mode === "signup" || location.pathname === "/signup" ? "Sign Up" : "Login";

  const [state, setState] = useState(initialState);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async () => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email.trim(),
        password: formData.password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem("auth-token", data.token);

      // ✅ IMMEDIATELY SYNC CART AFTER LOGIN
      setTimeout(() => {
        window.location.reload(); // Force refresh to sync cart
      }, 100);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert(data.errors || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed. Please try again.");
  }
};


  const signup = async () => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert("Signup successful. Please log in now.");
        setState("Login");
        setFormData({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        alert(data.errors || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };

  const handleToggle = () => {
    if (state === "Login") {
      setState("Sign Up");
      navigate("/signup");
    } else {
      setState("Login");
      navigate("/login");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={handleToggle}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={handleToggle}>Click here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
