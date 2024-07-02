import { Link } from "react-router-dom";
import "./Home.css";
import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Attendence Monitoring</h1>
      <p>Please Login or Sigup to access this portal...</p>
      <div className="auth-button">
        <Link className="auth-links" to="/Login">
          Login
        </Link>
        <Link className="auth-links" to="/SignUp">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
