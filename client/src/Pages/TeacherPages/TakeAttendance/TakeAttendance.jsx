import "./TakeAttendance.css";
import React from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { Link } from "react-router-dom";
import Card from "../../../components/Card/Card";
import week from "../../../assets/week.webm";

import overall from "../../../assets/overall.webm";

const TakeAttendance = () => {
  const attendanceCardDataList = [
    {
      id: 1,
      videoLink: overall,
      paragraph: "Click here for Theory Attendance",
      title: "Theory Attendance",
    },
    {
      id: 2,
      videoLink: week,
      paragraph: "Click here for Practical Attendance",
      title: "Practical Attendance",
    },
  ];
  return (
    <div className="takeAttendance-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={2} />
      </div>

      <div className="rightsidebar">
        <TopNavbar />
        <div className="middle-content">
          <Link to="/Theory-Attendance">
            <Card
              videoLink={attendanceCardDataList[0].videoLink}
              paragraph={attendanceCardDataList[0].paragraph}
              title={attendanceCardDataList[0].title}
            />
          </Link>
          <Link to="/Practical-Attendance">
            <Card
              videoLink={attendanceCardDataList[1].videoLink}
              paragraph={attendanceCardDataList[1].paragraph}
              title={attendanceCardDataList[1].title}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
