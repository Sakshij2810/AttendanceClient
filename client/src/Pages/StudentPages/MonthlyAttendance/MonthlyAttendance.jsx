import "./MonthlyAttendance.css";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar.jsx";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { Line } from "react-chartjs-2";
import { clearErrors, getAllStudents } from "../../../actions/studentAction.js";
import {
  clearAttendanceError,
  fetchSingleStudentAttendance,
} from "../../../actions/attendanceAction.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const MonthlyAttendance = () => {
  const dispatch = useDispatch();

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

  const currentUser = useSelector((state) => state.currentUserReducer);
  const { students, loading, error } = useSelector((state) => state.students);
  const { singleStudentAttendance, attendanceLoading, attendanceError } =
    useSelector((state) => state.singleStudentAttendance);

  const currentStudent =
    students &&
    students.find((student) => student.email === currentUser?.result?.email);

  const studentId = currentStudent?._id;

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

  // Handle errors and dispatch getAllStudents
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
  }, [dispatch, error, attendanceError]);

  // Actual data for the graph
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const data = (monthlyData[currentYear] || []).map((value) => value || 0);
    setDataForMonth(data);
  }, [monthlyData]);

  return loading || attendanceLoading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <div className="monthlyAttendance-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={0} />
        </div>
        <div className="rightsidebar">
          <TopNavbar />
          <div className="monthly-main">
            <Line
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Attendance (%)",
                    data: dataForMonth,
                    backgroundColor: "rgb(132, 18, 132)",
                    borderColor: "rgb(198, 93, 198)",
                  },
                ],
              }}
              height={300}
              width={600}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MonthlyAttendance;
