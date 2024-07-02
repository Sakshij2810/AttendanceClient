import "./Login.css";
import React, { useState } from "react";
import CartoonLogo from "../../assets/cartoon-logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password && !role) {
      alert("Please Enter Email, Password and Role to continue!");
    } else {
      const existingUserData = JSON.parse(localStorage.getItem("Profile"));
      dispatch(login({ email, password, role, ...existingUserData }, navigate));
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-1">
        <p className="para">Please Login First</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h3>Email:</h3>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            <h3>Password:</h3>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="role-select" htmlFor="role">
            <h3>Role:</h3>
            <select
              id="role"
              name="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="HOD">HOD</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </label>

          <p>forgot password?</p>
          <button className="login-btn" type="submit">
            Log In
          </button>

          <p>
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              style={{ color: "rgb(0, 140, 255)", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <div className="login-container-2">
        <div className="data">
          <img width="40%" src={CartoonLogo} alt="cartoon-logo" />
          <h3>
            Attendance Monitoring <br /> System
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
