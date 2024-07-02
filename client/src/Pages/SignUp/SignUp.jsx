import "./SignUp.css";
import React, { Fragment, useState } from "react";
import CartoonLogo from "../../assets/cartoon-logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../actions/authAction";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [batch, setBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log({ name, email, password, role });

    if (!email && !password && !name && !role) {
      alert("Please Enter Name, Email, Password and Role to continue!");
    } else {
      if (role === "Student") {
        if (!year && !batch) {
          alert("Please Enter Year and Batch to continue!");
        } else {
          dispatch(
            signup({ name, email, password, role, year, batch }, navigate)
          );
        }
      } else {
        dispatch(signup({ name, email, password, role }, navigate));
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-1">
        <p className="signup-top-para">Please SignUp First</p>
        <form onSubmit={handleSubmit}>
          <div className="top-signup">
            <div className="left-signup">
              <label htmlFor="name">
                <h3>Username:</h3>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

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
            </div>

            <div className="right-signup">
              <label className="select" htmlFor="role">
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

              {role === "Student" && (
                <Fragment>
                  <label className="select" htmlFor="year">
                    <h3>Year:</h3>
                    <select
                      id="year"
                      name="year"
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="TY">Third-Year</option>
                      <option value="SY">Second-Year</option>
                    </select>
                  </label>

                  {year === "TY" ? (
                    <label className="select" htmlFor="batch">
                      <h3>Year:</h3>
                      <select
                        id="batch"
                        name="batch"
                        onChange={(e) => setBatch(e.target.value)}
                      >
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                      </select>
                    </label>
                  ) : (
                    <label className="select" htmlFor="batch">
                      <h3>Year:</h3>
                      <select
                        id="batch"
                        name="batch"
                        onChange={(e) => setBatch(e.target.value)}
                      >
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                      </select>
                    </label>
                  )}
                </Fragment>
              )}

              <br />
            </div>
          </div>

          <div className="bottom-signup">
            <button className="signup-btn" type="submit">
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <Link
                to="/Login"
                style={{
                  color: "rgb(0, 140, 255)",
                  textDecoration: "none",
                }}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="signup-container-2">
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

export default SignUp;
