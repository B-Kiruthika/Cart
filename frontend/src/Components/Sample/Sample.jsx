import React from "react";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png"; 
import "./Sample.css";

const Sample = () => {
   const scrollToNewCollections = () => {
    const section = document.getElementById("new-collections");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>           
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div onClick={scrollToNewCollections} className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Sample;
  