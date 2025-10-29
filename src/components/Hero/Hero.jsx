import React from "react";
import styles from "./Hero.module.css";
import img from "../../assets//vibrating-headphone 1.png";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className="hero-text">
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>
      <div>
    <img
      src={img}
      alt="Music Illustration"
      className={styles.heroImage}
    />
      </div>
    </div>
  );
}

export default Hero;
