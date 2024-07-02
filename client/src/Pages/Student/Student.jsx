import "./Student.css";
import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
// import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import Card from "../../components/Card/Card.jsx";
import { studentCardDataList } from "./StudentCardData.js";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar/TopNavbar.jsx";

const Student = () => {
  return (
    <div className="student-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={0} />
      </div>

      <div className="rightsidebar">
        <TopNavbar />
        <div className="middle-content">
          <h2>Student Home</h2>
          <div className="card-container">
            <Link to="/Student-Subjects" style={{ textDecoration: "none" }}>
              <Card
                videoLink={studentCardDataList[0].videoLink}
                paragraph={studentCardDataList[0].paragraph}
                title={studentCardDataList[0].title}
              />
            </Link>

            <Link
              to="/Student-MonthlyAttendance"
              style={{ textDecoration: "none" }}
            >
              <Card
                videoLink={studentCardDataList[1].videoLink}
                paragraph={studentCardDataList[1].paragraph}
                title={studentCardDataList[1].title}
              />
            </Link>

            <Link
              to="/Student-OverallAttendance"
              style={{ textDecoration: "none" }}
            >
              <Card
                videoLink={studentCardDataList[2].videoLink}
                paragraph={studentCardDataList[2].paragraph}
                title={studentCardDataList[2].title}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
