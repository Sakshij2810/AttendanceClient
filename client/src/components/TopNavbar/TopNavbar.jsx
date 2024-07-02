import "./TopNavbar.css";
import React, { useCallback, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { setCurrentUser } from "../../actions/setCurrentUserAction";

const TopNavbar = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var User = useSelector((state) => state.currentUserReducer);

  const handleLogout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");

    dispatch(setCurrentUser(null));
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = User?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log("logout");
        handleLogout();
      }

      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }
  }, [dispatch, handleLogout, User?.token]);
  return (
    <div className="topnavbar-container">
      <div className="topnavbar-content">
        <div className="icon">
          <IoMenu />
        </div>

        <h3>Attendance Monitoring System | {location.pathname.slice(1)}</h3>
        <button className="logout-icon" onClick={handleLogout}>
          <MdLogout />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
