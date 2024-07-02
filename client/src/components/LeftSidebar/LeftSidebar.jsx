import "./LeftSidebar.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { NavlinkArrayList } from "./LeftSidebarList";

const LeftSidebar = ({ indexNumber }) => {
  var User = useSelector((state) => state.currentUserReducer);
  // console.log(navlinkArray);
  // console.log(navlinkArray.map((link) => link.icon));

  return (
    <div className="leftsidebar-container">
      <nav className="leftsidebar-nav">
        <div className="name-link">
          <Link className="left-links" to="/Profile"></Link>

          <div className="leftsidebar-user-data">
            <p>{User?.result?.name}</p>
            <p>{User?.result?.email}</p>
            {User?.result?.subject ? <p>{User?.result?.subject}</p> : <></>}

            {User?.result?.year ? (
              <p>
                {User?.result?.year} - {User?.result?.batch}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="sidenav-navlinks">
          {NavlinkArrayList[indexNumber].info.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              // className="side-nav-links"
              // activeClassName="active"
              className={({ isActive }) =>
                isActive ? "side-nav-links active" : "side-nav-links"
              }
            >
              {link.icon}
              <p>{link.title}</p>
            </NavLink>
          ))}

          {/* <NavLink
            to="/Student-Home"
            className="side-nav-links"
            activeClassName="active"
          >
            <MdHome />
            <p>Home</p>
          </NavLink>

          <NavLink
            to="/Student-Dashboard"
            className="side-nav-links"
            activeClassName="active"
          >
            <MdDashboard />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/Student-Subjects"
            className="side-nav-links"
            activeClassName="active"
          >
            <FaBook />
            <p>Subjects</p>
          </NavLink>
          <NavLink
            to="/Student-MonthlyAttendance"
            className="side-nav-links"
            activeClassName="active"
          >
            <MdCalendarMonth />
            <p>Monthly Attendance</p>
          </NavLink>
          <NavLink
            to="/Student-OverallAttendance"
            className="side-nav-links"
            activeClassName="active"
          >
            <BsPersonFillCheck />
            <p>Overall Attendance</p>
          </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

LeftSidebar.propTypes = {
  indexNumber: PropTypes.number.isRequired,
};

export default LeftSidebar;
