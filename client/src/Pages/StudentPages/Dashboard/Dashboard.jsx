import "./Dashboard.css";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import Calendar from "../../../components/Calendar/Calendar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { clearErrors, getAllStudents } from "../../../actions/studentAction";
import {
  clearAttendanceError,
  fetchAttendanceByDate,
  fetchSingleStudentAttendance,
  fetchStudentSubjectDatewiseAttendance,
  fetchStudentSubjectwiseAttendance,
  getDailyAttendance,
} from "../../../actions/attendanceAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  //selectors
  var User = useSelector((state) => state.currentUserReducer);

  const { attendanceByDateValue } = useSelector(
    (state) => state.attendanceByDate
  );
  const currentUser = useSelector((state) => state.currentUserReducer);
  const { students, loading, error } = useSelector((state) => state.students);
  const { singleStudentAttendance, attendanceLoading, attendanceError } =
    useSelector((state) => state.singleStudentAttendance);
  const { subjectwiseAttendance, attendanceSError, attendanceSLoading } =
    useSelector((state) => state.subjectwiseAttendance);

  const { subjectDatewiseAttendance } = useSelector(
    (state) => state.subjectDatewiseAttendance
  );

  //variables
  const currentStudent =
    students &&
    students.filter((student) => student.email === currentUser?.result?.email);
  const studentId = currentStudent[0]?._id;
  const currentStudentDatewiseAttendance =
    attendanceByDateValue &&
    attendanceByDateValue.filter(
      (attendance) => attendance.student === studentId
    );

  //useStates
  const [studentYear, setStudentYear] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceTheoryData, setAttendanceTheoryData] = useState([]);
  const [attendancePracticalData, setAttendancePracticalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    dispatch(fetchAttendanceByDate(dayjs(selectedDate).format("YYYY-MM-DD")));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (studentId && subjectArray.length > 0) {
      subjectArray.forEach((subject) => {
        dispatch(
          fetchStudentSubjectDatewiseAttendance(
            studentId,
            subject,
            dayjs(selectedDate).format("YYYY-MM-DD")
          )
        );
      });
    }
  }, [dispatch, studentId, subjectArray, selectedDate]);

  useEffect(() => {
    if (attendanceSError) {
      toast.error(attendanceSError);
    }
  }, [attendanceSError]);

  // Set year of student
  useEffect(() => {
    const year = currentStudent[0]?.year;
    setStudentYear(year);
  }, [currentStudent]);

  useEffect(() => {
    if (studentYear === "SY") {
      setSubjectArray([
        "SubjectSY1",
        "SubjectSY2",
        "SubjectSY3",
        "SubjectSY4",
        "SubjectSY5",
      ]);
    } else if (studentYear === "TY") {
      setSubjectArray([
        "SubjectTY1",
        "SubjectTY2",
        "SubjectTY3",
        "SubjectTY4",
        "SubjectTY5",
      ]);
    }
  }, [studentYear]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllStudents());
  }, [dispatch, error]);

  //    dispatch getDailyAttendance()
  useEffect(() => {
    dispatch(getDailyAttendance());
  }, [dispatch]);

  // Dispatch fetchSingleStudentAttendance
  useEffect(() => {
    if (studentId) {
      dispatch(fetchSingleStudentAttendance(studentId));
    }
  }, [dispatch, studentId]);

  // Dispatch fetchStudentSubjectwiseAttendance
  useEffect(() => {
    if (studentId && subjectArray.length) {
      subjectArray.forEach((subject) => {
        dispatch(fetchStudentSubjectwiseAttendance(studentId, subject));
        dispatch(
          fetchStudentSubjectDatewiseAttendance(
            studentId,
            subject,
            selectedDate
          )
        );
      });
    }
  }, [dispatch, studentId, subjectArray]);

  // Calculate percentage for each subject
  useEffect(() => {
    if (subjectwiseAttendance && subjectArray.length) {
      const data = subjectArray.map((subject) => {
        const attendance = subjectwiseAttendance[subject] || [];
        const totalClasses = attendance.length;
        const totalPresent = attendance.filter(
          (att) => att.status === "present"
        ).length;
        return totalClasses ? (totalPresent / totalClasses) * 100 : 0;
      });
      setAttendanceData(data);
    }
  }, [subjectwiseAttendance, subjectArray]);

  useEffect(() => {
    const theoryData = subjectArray.map((subject) => {
      const attendance = subjectDatewiseAttendance[subject] || [];
      const theoryClasses = attendance.filter(
        (att) => att.attendanceType === "theory"
      );
      const presentTheoryClasses = theoryClasses.filter(
        (att) => att.status === "present"
      ).length;
      return theoryClasses.length > 0
        ? (presentTheoryClasses / theoryClasses.length) * 100
        : 0;
    });
    setAttendanceTheoryData(theoryData);
  }, [subjectArray, subjectDatewiseAttendance]);

  useEffect(() => {
    const practicalData = subjectArray.map((subject) => {
      const attendance = subjectDatewiseAttendance[subject] || [];
      const practicalClasses = attendance.filter(
        (att) => att.attendanceType === "practical"
      );
      const presentPracticalClasses = practicalClasses.filter(
        (att) => att.status === "present"
      ).length;
      return practicalClasses.length > 0
        ? (presentPracticalClasses / practicalClasses.length) * 100
        : 0;
    });
    setAttendancePracticalData(practicalData);
  }, [subjectArray, subjectDatewiseAttendance]);

  //monthly

  const monthArray = useMemo(
    () => [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    []
  );

  const [monthlyData, setMonthlyData] = useState({});
  const [dataForMonth, setDataForMonth] = useState([]);

  // Fetch single student attendance
  useEffect(() => {
    if (studentId) {
      dispatch(fetchSingleStudentAttendance(studentId));
    }
  }, [dispatch, studentId]);

  // Calculate monthly attendance percentage
  useEffect(() => {
    const calculateMonthlyAttendancePercentage = () => {
      const updatedMonthlyData = {};
      singleStudentAttendance?.forEach((lecture) => {
        const date = new Date(lecture.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");

        if (!updatedMonthlyData[year]) {
          updatedMonthlyData[year] = {};
        }

        if (!updatedMonthlyData[year][month]) {
          updatedMonthlyData[year][month] = { total: 0, present: 0 };
        }

        updatedMonthlyData[year][month].total += 1;
        if (lecture.status === "present") {
          updatedMonthlyData[year][month].present += 1;
        }
      });

      const finalMonthlyData = {};
      Object.keys(updatedMonthlyData).forEach((year) => {
        finalMonthlyData[year] = monthArray.map((month) => {
          const data = updatedMonthlyData[year][month] || {
            total: 0,
            present: 0,
          };
          return data.total
            ? ((data.present / data.total) * 100).toFixed(2)
            : 0;
        });
      });

      setMonthlyData(finalMonthlyData);
    };

    if (singleStudentAttendance && singleStudentAttendance.length > 0) {
      calculateMonthlyAttendancePercentage();
    }
  }, [singleStudentAttendance, monthArray]);

  // Actual data for the graph
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const data = (monthlyData[currentYear] || []).map((value) => value || 0);
    setDataForMonth(data);
  }, [monthlyData]);

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div className="dashboard-name-link">
          <Link className="dashboard-left-links" to="/Profile"></Link>

          <div className="dashboard-leftsidebar-user-data">
            <p>{currentUser?.result?.name}</p>
            <p>{currentUser?.result?.email}</p>

            <p>
              {currentUser?.result?.year} - {currentUser?.result?.batch}
            </p>
          </div>
        </div>
        <div className="dashboard-topnavbar">
          <TopNavbar />
        </div>
      </div>

      <div className="bottombar">
        <div className="dashboard-middle-content">
          <div className="dashboard-middle-left">
            <div className="dashboard-mlt">
              <div className="dashboard-mlt-content">
                <h2>Subject-wise Daily Attendance</h2>
                <Bar
                  data={{
                    labels: subjectArray,
                    datasets: [
                      {
                        label: "Theory",
                        data: attendanceTheoryData,
                        backgroundColor: " rgb(132, 18, 132)",
                      },
                      {
                        label: "Practical",
                        data: attendancePracticalData,
                        backgroundColor: " rgb(198, 93, 198)",
                      },
                    ],
                  }}
                  height={40}
                  width={140}
                />
              </div>
            </div>

            <div className="dashboard-mlb">
              <div className="dashboard-mlb-content">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/Student-MonthlyAttendance"
                >
                  <h2>Monthly Attendance</h2>
                </Link>
                <div>
                  <Line
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      datasets: [
                        {
                          label: "Attendance",
                          data: dataForMonth,
                          backgroundColor: " rgb(132, 18, 132)",
                          borderColor: "rgb(198, 93, 198)",
                        },
                      ],
                    }}
                    height={40}
                    width={140}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-middle-right">
            <div className="dashboard-mrt">
              <div className="dashboard-calendar">
                <Calendar
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>
            </div>

            <div className="dashboard-mrb">
              <Link
                style={{ textDecoration: "none" }}
                to="/Student-OverallAttendance"
              >
                <h2>Overall Attendance</h2>
              </Link>
              <div className="doughnut-div">
                <Doughnut
                  data={{
                    labels: subjectArray,
                    datasets: [
                      {
                        data: attendanceData,
                        backgroundColor: [
                          " rgb(204, 0, 204)",
                          " rgb(83, 0, 83)",

                          " rgb(163, 0, 163)",
                          " rgb(109, 0, 109)",
                          " rgb(255, 0, 255)",
                        ],
                        borderColor: [
                          " rgb(204, 0, 204)",
                          " rgb(83, 0, 83)",

                          " rgb(163, 0, 163)",
                          " rgb(109, 0, 109)",
                          " rgb(255, 0, 255)",
                        ],
                      },
                    ],
                  }}
                  height={400}
                  width={1}
                />
              </div>
            </div>
          </div>

          <Link to="/Student-OverallAttendance"></Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
