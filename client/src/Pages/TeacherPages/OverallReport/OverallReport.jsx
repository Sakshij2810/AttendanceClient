import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import Table from "../../../components/Table/Table";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import {
  clearAttendanceError,
  getAllAttendance,
} from "../../../actions/attendanceAction";
import { clearErrors, getAllStudents } from "../../../actions/studentAction";
import "./OverallReport.css";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";

const OverallReport = () => {
  const { allAttendance, attendanceLoading, attendanceError } = useSelector(
    (state) => state.allAttendance
  );

  const { students, loading, error } = useSelector((state) => state.students);

  const currentTeacher = useSelector((state) => state.currentUserReducer);

  const dispatch = useDispatch();

  const todayDate = Date.now();
  const teacherSubject = currentTeacher?.result?.subject;
  const teacherDepartment = currentTeacher?.result?.department; //TY

  const [value, setValue] = useState(dayjs(todayDate));
  const [totalTheoryLectures, setTotalTheoryLectures] = useState(0);
  const [totalPracticalLectures, setTotalPracticalLectures] = useState(0);
  const [id, setId] = useState("");

  // Memoize the filtered students array
  const studentsBySubject = useMemo(
    () =>
      students &&
      students.filter((student) => student.year === teacherDepartment),
    [students, teacherDepartment]
  );
  const attendanceBySubject = useMemo(
    () =>
      allAttendance &&
      allAttendance.filter(
        (attendance) => attendance.subject === teacherSubject
      ),
    [allAttendance, teacherSubject]
  );

  const handleDateChange = (newValue) => {
    setValue(newValue);

    dispatch(getAllStudents()); // Fetch students again on date change
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (attendanceError) {
      toast.error(attendanceError);
      dispatch(clearAttendanceError());
    }

    dispatch(getAllAttendance());
    dispatch(getAllStudents());
  }, [dispatch, attendanceError, error]);

  useEffect(() => {
    // Filter and calculate totals for theory and practical lectures
    if (allAttendance && allAttendance.length > 0) {
      const theoryDates = new Set();
      const practicalDates = new Set();

      allAttendance.forEach((attendance) => {
        if (
          attendance.attendanceType === "theory" &&
          attendance.subject === teacherSubject
        ) {
          // const date = dayjs(attendance.date)
          theoryDates.add(attendance.date);
        } else if (
          attendance.attendanceType === "practical" &&
          attendance.subject === teacherSubject
        ) {
          practicalDates.add(attendance.date);
        }
      });

      setTotalTheoryLectures(theoryDates.size);

      setTotalPracticalLectures(practicalDates.size);
    } else {
      // If there's no attendance data, reset totals
      setTotalTheoryLectures(0);
      setTotalPracticalLectures(0);
    }
  }, [allAttendance, teacherSubject]);

  const handleTheoryPercentage = (id, totalTheoryLectures) => {
    // Filter and calculate totals for theory and practical lectures
    setId(id);

    const currentStudentAttendance =
      attendanceBySubject &&
      attendanceBySubject.filter((attendance) => attendance.student === id);

    const theoryAttendanceCount =
      currentStudentAttendance &&
      currentStudentAttendance.filter(
        (attendance) =>
          attendance.attendanceType === "theory" &&
          attendance.status === "present"
      ).length;

    const theoryPercentage = (
      (theoryAttendanceCount / totalTheoryLectures) *
      100
    ).toFixed(2);
    return theoryPercentage;
  };

  const handlePracticalPercentage = (id, totalPracticalLectures) => {
    const currentStudentAttendance =
      attendanceBySubject &&
      attendanceBySubject.filter((attendance) => attendance.student === id);

    const practicalAttendanceCount =
      currentStudentAttendance &&
      currentStudentAttendance.filter(
        (attendance) =>
          attendance.attendanceType === "practical" &&
          attendance.status === "present"
      ).length;
    // console.log(practicalAttendanceCount);

    const practicalPercentage = (
      (practicalAttendanceCount / totalPracticalLectures) *
      100
    ).toFixed(2);
    return practicalPercentage;
  };

  const headersArray = [
    {
      Header: "SR NO",
      accessor: (row, i) => i + 1,
    },

    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Batch", accessor: "batch" },
    {
      Header: "Theory",
      accessor: "",
      Cell: ({ row }) => (
        <p>{handleTheoryPercentage(row.original._id, totalTheoryLectures)}%</p>
      ),
    },
    {
      Header: "Practical",
      accessor: "",
      Cell: ({ row }) => (
        <p>
          {handlePracticalPercentage(row.original._id, totalPracticalLectures)}%
        </p>
      ),
    },
    { Header: "Contact No", accessor: "contactNo" },
  ];

  return loading || attendanceLoading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <div className="overallReport-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={2} />
        </div>

        <div className="rightsidebar">
          <TopNavbar />
          <div className="middle-content">
            <div className="date-picker-attendance">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div>
              <h3>Total Theory Lectures: {totalTheoryLectures}</h3>
              <h3>Total Practical Lectures: {totalPracticalLectures}</h3>
              <Table
                pageSize={10}
                dataArray={studentsBySubject}
                headersArray={headersArray}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OverallReport;
