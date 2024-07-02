import "./Teacher.css";
import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
// import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";

import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar/TopNavbar.jsx";
import Card from "../../components/Card/Card.jsx";
import { teacherCardDataList } from "./TeacherCardList.js";

const Teacher = () => {
  return (
    <div className="student-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={2} />
      </div>

      <div className="rightsidebar">
        <TopNavbar />
        <div className="teacher-home-middle-content">
          <div className="card-container">
            <Link to="/Teacher-AllStudents" style={{ textDecoration: "none" }}>
              <Card
                videoLink={teacherCardDataList[0].videoLink}
                paragraph={teacherCardDataList[0].paragraph}
                title={teacherCardDataList[0].title}
              />
            </Link>

            <Link
              to="/Teacher-TakeAttendance"
              style={{ textDecoration: "none" }}
            >
              <Card
                videoLink={teacherCardDataList[1].videoLink}
                paragraph={teacherCardDataList[1].paragraph}
                title={teacherCardDataList[1].title}
              />
            </Link>

            <Link
              to="/Students-OverallReport"
              style={{ textDecoration: "none" }}
            >
              <Card
                videoLink={teacherCardDataList[2].videoLink}
                paragraph={teacherCardDataList[2].paragraph}
                title={teacherCardDataList[2].title}
              />
            </Link>

            <Link to="/Student-Report" style={{ textDecoration: "none" }}>
              <Card
                videoLink={teacherCardDataList[3].videoLink}
                paragraph={teacherCardDataList[3].paragraph}
                title={teacherCardDataList[3].title}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
