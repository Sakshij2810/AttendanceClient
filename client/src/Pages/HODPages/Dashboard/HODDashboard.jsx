import "./HODDashboard.css";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { getAllStudents, clearErrors } from "../../../actions/studentAction";
import { getAllTeachers } from "../../../actions/teacherAction";
import { Link } from "react-router-dom";
import {
  clearAttendanceError,
  getAllAttendance,
} from "../../../actions/attendanceAction";

const HODDashboard = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const { allAttendance, attendanceError, attendanceLoading } = useSelector(
    (state) => state.allAttendance
  );

  const [totalPresent, setTotalPresent] = useState([]);
  const [totalAbsent, setTotalAbsent] = useState([]);
  const [presentTotal, setPresentTotal] = useState([]);
  const [absentTotal, setAbsentTotal] = useState([]);

  const totalStudent = students && students.length;
  const totalTeachers = teachers && teachers.length;

  useEffect(() => {
    const presentTotalData = totalPresent && totalPresent.length;
    const absentTotalData = totalAbsent && totalAbsent.length;

    setAbsentTotal(absentTotalData);
    setPresentTotal(presentTotalData);
  }, [totalAbsent, totalPresent]);

  useEffect(() => {
    if (allAttendance) {
      const presentData = allAttendance.filter(
        (attendance) => attendance.status === "present"
      );
      const absentData = allAttendance.filter(
        (attendance) => attendance.status === "absent"
      );

      setTotalPresent(presentData);
      setTotalAbsent(absentData);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (attendanceError) {
      toast.error(attendanceError);

      dispatch(clearAttendanceError());
    }
    dispatch(getAllStudents());
    dispatch(getAllTeachers());
    dispatch(getAllAttendance());
  }, [dispatch, error, attendanceError]);

  return loading || attendanceLoading ? (
    <p>loading...</p>
  ) : (
    <Fragment>
      <div className="student-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={1} />
        </div>

        <div className="rightsidebar">
          <TopNavbar />
          <div className="hod-middle-content">
            <div className="top-hod-container">
              <div className="hod-card-container">
                <div>
                  <h1>{totalStudent}</h1>
                  <h4>Total Students</h4>
                </div>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/AllStudents"
                >
                  {" "}
                  <p>Click here to see all Students</p>
                </Link>
              </div>

              <div className="hod-card-container">
                <div>
                  <h1>{totalTeachers}</h1>
                  <h4>Total Teachers</h4>
                </div>

                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/AllTeachers"
                >
                  <p>Click here to see all Teachers</p>
                </Link>
              </div>

              <div className="hod-card-container">
                <div>
                  <h1>2</h1>
                  <h4>Total Departments</h4>
                </div>

                <p>Click here to see all Departments</p>
              </div>
            </div>
            <div className="bottom-hod-container">
              <div className="hod-doughnut-div">
                <h2>Total Attendance Percentange </h2>
                <Doughnut
                  data={{
                    labels: ["Total-Present", "Total-Absent"],
                    datasets: [
                      {
                        data: [presentTotal, absentTotal],
                        backgroundColor: [
                          " rgb(204, 0, 204)",
                          " rgb(83, 0, 83)",
                        ],
                        borderColor: [" rgb(204, 0, 204)", " rgb(83, 0, 83)"],
                      },
                    ],
                  }}
                  height={400}
                  width={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HODDashboard;
