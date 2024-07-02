import React, { Fragment, useEffect, useState, useMemo } from "react";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import TopNavbar from "../TopNavbar/TopNavbar";
import Table from "../Table/Table";
import "./Attendance.css";
import { clearErrors, getAllStudents } from "../../actions/studentAction";
import {
  clearAttendanceError,
  addAttendance,
} from "../../actions/attendanceAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdNotificationsOff } from "react-icons/io";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Attendance = ({ attendanceType }) => {
  const { students, loading, error } = useSelector((state) => state.students);
  const currentTeacher = useSelector((state) => state.currentUserReducer);
  const { attendanceLoading, success, attendancError } = useSelector(
    (state) => state.addAttendance
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todayDate = Date.now();
  const teacherSubject = currentTeacher?.result?.subject;
  const teacherDepartment = currentTeacher?.result?.department; //TY

  // Memoize the filtered students array
  const studentsBySubject = useMemo(
    () => students.filter((student) => student.year === teacherDepartment),
    [students, teacherDepartment]
  );

  const [value, setValue] = useState(dayjs(todayDate));
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const handleStatusChange = (studentId, statusType) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [studentId]: statusType,
    }));

    const attendanceData = {
      attendanceType,
      studentId,
      status: statusType,
      date: value.toISOString(),
      subject: teacherSubject,
    };

    dispatch(addAttendance(attendanceData));
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setAttendanceStatus({});
    dispatch(getAllStudents()); // Fetch students again on date change
  };

  const getIconColor = (studentId, statusType) => {
    if (attendanceStatus[studentId] === statusType) {
      switch (statusType) {
        case "present":
          return "green";
        case "absent":
          return "red";
        case "offLecture":
          return "orange";
        default:
          return "";
      }
    }
    return "";
  };

  const headersArray = [
    {
      Header: "SR NO",
      accessor: (row, i) => i + 1,
    },
    { Header: "Name", accessor: "name" },
    { Header: "Batch", accessor: "batch" },
    {
      Header: "Present",
      accessor: "",
      Cell: ({ row }) => (
        <div className="attendance-icons">
          <FaCheckCircle
            style={{
              color: getIconColor(row.original._id, "present"),
            }}
            className="present-icon"
            onClick={() => handleStatusChange(row.original._id, "present")}
          />
        </div>
      ),
    },
    {
      Header: "Absent",
      accessor: "",
      Cell: ({ row }) => (
        <div className="attendance-icons">
          <TiDelete
            style={{
              color: getIconColor(row.original._id, "absent"),
            }}
            className="absent-icon"
            onClick={() => handleStatusChange(row.original._id, "absent")}
          />
        </div>
      ),
    },
    {
      Header: "Off-Lecture",
      accessor: "",
      Cell: ({ row }) => (
        <div className="attendance-icons">
          <IoMdNotificationsOff
            style={{
              color: getIconColor(row.original._id, "offLecture"),
            }}
            className="off-icon"
            onClick={() => handleStatusChange(row.original._id, "offLecture")}
          />
        </div>
      ),
    },
    { Header: "Contact No", accessor: "contactNo" },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (attendancError) {
      toast.error(attendancError);
      dispatch(clearAttendanceError());
    }
    if (success) {
      toast.success(`Student attendance is marked `);
      dispatch({ type: "ADD_ATTENDANCE_RESET" });
    }

    dispatch(getAllStudents());
  }, [dispatch, error, attendancError, success]);

  return (
    <Fragment>
      {loading || attendanceLoading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <div className="teacher-container">
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
                <div className="allteacher-table-container">
                  <Table
                    key={value.toString()} // Add a key to force re-render on date change
                    pageSize={10}
                    dataArray={studentsBySubject} // This will now be an array
                    headersArray={headersArray}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Attendance;
