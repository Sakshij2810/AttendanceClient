import "./Card.css";
import React from "react";

const Card = ({ videoLink, paragraph, title }) => {
  return (
    <div className="card-main-container">
      <div className="card-content">
        <video src={videoLink} autoPlay loop muted></video>
        <p>{paragraph}</p>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Card;
