import "./AllStudents.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { allStudentCardDataList } from "./AllStudentCardData";
import Card from "../../../components/Card/Card.jsx";
import { clearErrors, getAllStudents } from "../../../actions/studentAction.js";

const AllStudents = () => {
  return (
    <Fragment>
      <div className="allStudents-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={1} />
        </div>
        <div className="rightsidebar">
          <TopNavbar />
          <div className="middle-content">
            <div className="card-container">
              <Link to="/SY-S1" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[3].videoLink}
                  paragraph={allStudentCardDataList[3].paragraph}
                  title={allStudentCardDataList[3].title}
                />
              </Link>

              <Link to="/SY-S2" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[4].videoLink}
                  paragraph={allStudentCardDataList[4].paragraph}
                  title={allStudentCardDataList[4].title}
                />
              </Link>

              <Link to="/SY-S3" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[5].videoLink}
                  paragraph={allStudentCardDataList[5].paragraph}
                  title={allStudentCardDataList[5].title}
                />
              </Link>

              <Link to="/TY-T1" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[6].videoLink}
                  paragraph={allStudentCardDataList[6].paragraph}
                  title={allStudentCardDataList[6].title}
                />
              </Link>

              <Link to="/TY-T2" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[7].videoLink}
                  paragraph={allStudentCardDataList[7].paragraph}
                  title={allStudentCardDataList[7].title}
                />
              </Link>

              <Link to="/TY-T3" style={{ textDecoration: "none" }}>
                <Card
                  videoLink={allStudentCardDataList[8].videoLink}
                  paragraph={allStudentCardDataList[8].paragraph}
                  title={allStudentCardDataList[8].title}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllStudents;
