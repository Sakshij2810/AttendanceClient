import React from "react";
import "./HOD.css";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";

import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar/TopNavbar.jsx";

const HOD = () => {
  return (
    <div className="student-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={1} />
      </div>

      <div className="rightsidebar">
        <TopNavbar />
        <div className="middle-content">
          <h2>HOD Home</h2>
          <div className="card-container"></div>
        </div>
      </div>
    </div>
  );
};

export default HOD;
